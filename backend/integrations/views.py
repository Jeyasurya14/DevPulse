
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from core.mongo import get_db_handle
from bson.json_util import dumps
import json
import datetime

class IntegrationList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        db = get_db_handle()
        username = request.user.username
        
        # User's connected integrations
        user_integrations = list(db.integrations.find({"username": username}, {'_id': 0}))
        connected_map = {i['provider']: i for i in user_integrations}
        
        # Defined Providers & Metadata
        providers = [
            {"name": "GitHub", "provider": "github", "icon": "github", "description": "Sync repositories and issues."},
            {"name": "Slack", "provider": "slack", "icon": "slack", "description": "Receive alerts in your channels."},
            {"name": "Jira", "provider": "jira", "icon": "trello", "description": "Sync tasks and sprints."}
        ]
        
        # Merge State
        response_data = []
        for p in providers:
            connected_data = connected_map.get(p['provider'])
            if connected_data:
                # Merged connected data
                p.update({
                    "connected": True,
                    "connected_at": connected_data.get('connected_at'),
                    "config": connected_data.get('config', {}),
                    "last_synced": connected_data.get('last_synced')
                })
            else:
                p.update({
                    "connected": False,
                    "config": {}
                })
            response_data.append(p)
            
        return Response(response_data)

class IntegrationConnect(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        db = get_db_handle()
        data = request.data
        username = request.user.username
        
        provider = data.get('provider')
        api_key = data.get('api_key') # Mock token
        config = data.get('config', {}) # e.g. {"repo": "my-app", "channel": "#general"}
        
        if not provider:
            return Response({"error": "Missing provider"}, status=status.HTTP_400_BAD_REQUEST)

        # Upsert integration for THIS user
        update_data = {
            "username": username,
            "provider": provider,
            "connected": True,
            "connected_at": datetime.datetime.utcnow(),
            "last_synced": datetime.datetime.utcnow(),
            "config": config
        }
        
        # Only update api_key if provided (might be just updating config)
        if api_key:
             update_data["api_key_masked"] = f"xxxx-{api_key[-4:]}" if len(api_key) > 4 else "xxxx"

        db.integrations.update_one(
            {"username": username, "provider": provider},
            {"$set": update_data},
            upsert=True
        )
        
        return Response({"status": "connected", "provider": provider, "config": config})

class IntegrationDisconnect(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        db = get_db_handle()
        username = request.user.username
        provider = request.data.get('provider')
        
        if not provider:
            return Response({"error": "Missing provider"}, status=status.HTTP_400_BAD_REQUEST)
            
        result = db.integrations.delete_one({"username": username, "provider": provider})
        
        if result.deleted_count > 0:
            return Response({"status": "disconnected", "provider": provider})
        else:
            return Response({"error": "Integration not found"}, status=status.HTTP_404_NOT_FOUND)
