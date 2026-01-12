
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from core.mongo import get_db_handle
from bson.json_util import dumps
import json
import datetime

class IntegrationList(APIView):
    def get(self, request):
        db = get_db_handle()
        # In a real app, filter by request.user
        integrations = list(db.integrations.find({}, {'_id': 0}))
        
        # If empty, return available options
        if not integrations:
            return Response([
                {"name": "GitHub", "connected": False, "icon": "github"},
                {"name": "Jira", "connected": False, "icon": "trello"}, # using trello icon as proxy for jira if needed or custom
                {"name": "Slack", "connected": False, "icon": "slack"}
            ])
            
        return Response(integrations)

class IntegrationConnect(APIView):
    def post(self, request):
        db = get_db_handle()
        data = request.data
        provider = data.get('provider')
        api_key = data.get('api_key')
        
        if not provider or not api_key:
            return Response({"error": "Missing provider or api_key"}, status=status.HTTP_400_BAD_REQUEST)

        # Upsert integration
        db.integrations.update_one(
            {"provider": provider},
            {"$set": {
                "provider": provider,
                "connected": True,
                "connected_at": datetime.datetime.utcnow(),
                # In prod, encrypt this!
                "api_key_masked": f"xxxx-{api_key[-4:]}" 
            }},
            upsert=True
        )
        
        return Response({"status": "connected", "provider": provider})
