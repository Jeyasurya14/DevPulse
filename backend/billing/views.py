
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
import razorpay
from core.mongo import get_db_handle
import datetime

class CreateOrderView(APIView):
    def post(self, request):
        plan_id = request.data.get('plan_id')
        currency = "USD" # Foreign clients preference
        # Mapping simple plan IDs to amounts (in cents/paise)
        plans = {
            "pro": 1900,      # $19.00
            "business": 4900  # $49.00
        }
        
        amount = plans.get(plan_id)
        if not amount:
            return Response({"error": "Invalid plan ID"}, status=status.HTTP_400_BAD_REQUEST)

        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
        data = { "amount": amount, "currency": currency, "receipt": f"receipt_{plan_id}" }
        payment = client.order.create(data=data)
        
        return Response(payment)

class VerifyPaymentView(APIView):
    def post(self, request):
        data = request.data
        try:
            client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
            
            # Verify signature
            params_dict = {
                'razorpay_order_id': data.get('razorpay_order_id'),
                'razorpay_payment_id': data.get('razorpay_payment_id'),
                'razorpay_signature': data.get('razorpay_signature')
            }
            client.utility.verify_payment_signature(params_dict)
            
            # If verification successful, update user subscription in DB
            db = get_db_handle()
            username = data.get('username') # In prod, get from request.user
            plan_id = data.get('plan_id')
            
            db.profiles.update_one(
                {"username": username}, 
                {"$set": {
                    "subscription_tier": plan_id, 
                    "subscription_active": True,
                    "subscription_updated_at": datetime.datetime.utcnow()
                }},
                upsert=True
            )
            
            return Response({"status": "Subscription activated"})
            
        except razorpay.errors.SignatureVerificationError:
            return Response({"error": "Payment verification failed"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UsageStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        username = request.user.username
        db = get_db_handle()
        
        # Get Plan
        profile = db.profiles.find_one({"username": username})
        plan = profile.get("subscription_tier", "starter") if profile else "starter"
        
        # Define Limits
        # Define Limits & Feature Flags
        limits = {
            "starter": { "projects": 2, "analytics": "basic", "ai_recommendations": False, "team_size": 1, "exclusive_content": False },
            "pro": { "projects": 9999, "analytics": "advanced", "ai_recommendations": True, "team_size": 1, "exclusive_content": True },
            "business": { "projects": 9999, "analytics": "advanced", "ai_recommendations": True, "team_size": 10, "exclusive_content": True }
        }
        
        plan_limits = limits.get(plan, limits["starter"])
        
        # Get Current Usage
        project_count = db.projects.count_documents({}) # Simplified: In prod filter by owner
        
        return Response({
            "plan": plan,
            "usage": {
                "projects_used": project_count,
            },
            "limits": plan_limits,
            "upgrade_needed": project_count >= plan_limits["projects"] and plan == "starter"
        })
