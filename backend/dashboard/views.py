
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from core.mongo import get_db_handle
from bson import ObjectId
import datetime

class GoalList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        db = get_db_handle()
        username = request.user.username
        # Filter by username
        goals = list(db.goals.find({"username": username}, {'_id': 0}))
        return Response(goals)

    def post(self, request):
        db = get_db_handle()
        username = request.user.username
        data = request.data
        
        title = data.get('title')
        if not title:
            return Response({"error": "Title is required"}, status=status.HTTP_400_BAD_REQUEST)
            
        # Check for duplicates
        if db.goals.find_one({"username": username, "title": title}):
             return Response({"error": "Project with this name already exists"}, status=status.HTTP_400_BAD_REQUEST)

        goal = {
            "username": username,
            "title": title,
            "target_date": data.get('target_date'),
            "metric": data.get('metric', 'Tasks Completed'),
            "target_value": int(data.get('target_value', 10)),
            "current_value": 0,
            "status": "in_progress",
            "created_at": datetime.datetime.utcnow()
        }
        db.goals.insert_one(goal)
        del goal['_id']
        return Response(goal, status=status.HTTP_201_CREATED)

class GoalDetail(APIView):
    def patch(self, request, title):
        db = get_db_handle()
        # Using title as ID for simplicity in this demo, ideally use ObjectId
        update_data = {}
        if 'current_value' in request.data:
            update_data['current_value'] = int(request.data['current_value'])
        
        if update_data:
            db.goals.update_one({"title": title}, {"$set": update_data})
            return Response({"status": "updated"})
        return Response({"status": "no change"})

class NoteList(APIView):
    def get(self, request):
        db = get_db_handle()
        notes = list(db.collaboration_notes.find({}, {'_id': 0}).sort("created_at", -1))
        return Response(notes)

    def post(self, request):
        db = get_db_handle()
        data = request.data
        note = {
            "content": data.get('content'),
            "author": data.get('author', 'Anonymous'), # In prod, request.user
            "tags": data.get('tags', []),
            "created_at": datetime.datetime.utcnow().isoformat()
        }
        db.collaboration_notes.insert_one(note)
        del note['_id']
        return Response(note, status=status.HTTP_201_CREATED)

class StatsView(APIView):
    def get(self, request):
        db = get_db_handle()
        
        # Real Backend Logic
        total_goals = db.goals.count_documents({}) # Proxy for "Projects" for now
        total_notes = db.collaboration_notes.count_documents({})
        
        # Calculate Velocity based on completed goals
        completed_goals = db.goals.count_documents({"status": "completed"})
        velocity = completed_goals * 10
        
        # Mock Active Members (Future: Count distinct authors in notes)
        active_members = len(db.collaboration_notes.distinct("author")) or 1
        
        stats = {
            "projects": total_goals,
            "scans": 0, # Placeholder for future Scans collection
            "issues": 0, # Placeholder for future Issues collection
            "apiUsage": 0, # Placeholder for future API Usage tracking
            "team_velocity": f"{velocity} pts",
            "active_members": active_members,
            "dora_metrics": {
                "deployment_frequency": {"value": "0.0", "unit": "/day", "change": "0%", "trend": "neutral"},
                "lead_time": {"value": "0", "unit": "min", "change": "0%", "trend": "neutral"},
                "change_failure_rate": {"value": "0", "unit": "%", "change": "0%", "trend": "neutral"},
                "mttr": {"value": "0", "unit": "min", "change": "0%", "trend": "neutral"}
            },
            "deployment_trends": [0, 0, 0, 0, 0, 0, 0], # Placeholder for last 7 days deploys
            "recent_activity": [] 
        }
        
        # If we have real notes, use them as activity
        recent_notes = list(db.collaboration_notes.find({}, {'_id': 0}).sort("created_at", -1).limit(3))
        if recent_notes:
            stats['recent_activity'] = []
            for note in recent_notes:
                stats['recent_activity'].append({
                    "title": f"New note by {note.get('author')}",
                    "time": "Recently", # Ideally parse timestamp
                    "type": "success"
                })

        return Response(stats)

class TeamMemberList(APIView):
    def get(self, request):
        db = get_db_handle()
        members = list(db.team_members.find({}, {'_id': 0}))
        return Response(members)

    def post(self, request):
        db = get_db_handle()
        data = request.data
        
        # Basic Validation
        if not data.get('email') or not data.get('name'):
            return Response({"error": "Name and Email are required"}, status=status.HTTP_400_BAD_REQUEST)

        # Check for duplicate email
        if db.team_members.find_one({"email": data['email']}):
             return Response({"error": "Member with this email already exists"}, status=status.HTTP_400_BAD_REQUEST)

        member = {
            "name": data['name'],
            "email": data['email'],
            "role": data.get('role', 'Viewer'),
            "status": "active", # Auto-active for demo
            "activity": "medium", # Default activity
            "avatar": f"https://ui-avatars.com/api/?name={data['name'].replace(' ', '+')}&background=random",
            "joined_at": datetime.datetime.utcnow().isoformat()
        }
        
        db.team_members.insert_one(member)
        del member['_id']
        
        return Response(member, status=status.HTTP_201_CREATED)

# Catalog of supported integrations
INTEGRATION_CATALOG = [
    {"name": "GitHub", "provider": "github", "description": "Sync code repositories and track PRs."},
    {"name": "Slack", "provider": "slack", "description": "Get real-time alerts and notifications."},
    {"name": "Jira", "provider": "jira", "description": "Track issues and project progress."},
    {"name": "GitLab", "provider": "gitlab", "description": "CI/CD pipelines and source control."},
    {"name": "Trello", "provider": "trello", "description": "Kanban boards for task management."},
]

class IntegrationList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        db = get_db_handle()
        username = request.user.username
        
        # Fetch user's connected integrations
        user_integrations = list(db.integrations.find({"username": username}, {'_id': 0}))
        connected_map = {i['provider']: i for i in user_integrations}

        # Merge catalog with user status
        response_data = []
        for item in INTEGRATION_CATALOG:
            provider = item['provider']
            is_connected = provider in connected_map
            
            data = item.copy()
            data['connected'] = is_connected
            
            if is_connected:
                data['last_synced'] = connected_map[provider].get('last_synced', 'Never')
                data['config'] = connected_map[provider].get('config', {})
            else:
                data['last_synced'] = None
            
            response_data.append(data)

        return Response(response_data)

class IntegrationConnect(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        db = get_db_handle()
        username = request.user.username
        data = request.data
        
        provider = data.get('provider')
        api_key = data.get('api_key')
        config = data.get('config', {})
        
        if not provider or not api_key:
             return Response({"error": "Provider and API Key are required"}, status=status.HTTP_400_BAD_REQUEST)

        # Upsert integration
        integration = {
            "username": username,
            "provider": provider,
            "api_key_masked": f"****{api_key[-4:]}", # Store masked for display (Real app should encrypt key)
            "config": config,
            "connected_at": datetime.datetime.utcnow(),
            "last_synced": datetime.datetime.utcnow().isoformat()
        }
        
        db.integrations.update_one(
            {"username": username, "provider": provider},
            {"$set": integration},
            upsert=True
        )
        
        return Response({"status": "connected", "provider": provider})

class IntegrationDisconnect(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        db = get_db_handle()
        username = request.user.username
        provider = request.data.get('provider')
        
        if not provider:
            return Response({"error": "Provider is required"}, status=status.HTTP_400_BAD_REQUEST)

        result = db.integrations.delete_one({"username": username, "provider": provider})
        
        if result.deleted_count > 0:
            return Response({"status": "disconnected"})
        return Response({"error": "Integration not found"}, status=status.HTTP_404_NOT_FOUND)

class BenchmarkList(APIView):
    def get(self, request):
        # Seeded DORA Benchmarks
        benchmarks = {
            "deploymentFrequency": {"value": 12.4, "industryAvg": 8.2, "elite": 15, "label": "Deployment Frequency"},
            "leadTime": {"value": 2.3, "industryAvg": 4.5, "elite": 1, "label": "Lead Time (hours)"},
            "changeFailureRate": {"value": 4.2, "industryAvg": 15, "elite": 5, "label": "Change Failure Rate (%)"},
            "mttr": {"value": 23, "industryAvg": 60, "elite": 15, "label": "MTTR (minutes)"},
        }
        return Response(benchmarks)

class AlertList(APIView):
    def get(self, request):
        # Seeded Alerts Data
        alerts = [
            {"id": 1, "name": "Deployment Failure", "type": "deployment", "enabled": True, "channels": ["slack", "email"], "threshold": "any failure"},
            {"id": 2, "name": "High Error Rate", "type": "performance", "enabled": True, "channels": ["slack"], "threshold": "> 5%"},
            {"id": 3, "name": "Security Vulnerability", "type": "security", "enabled": True, "channels": ["email", "slack"], "threshold": "critical/high"},
            {"id": 4, "name": "PR Review Stale", "type": "workflow", "enabled": False, "channels": ["slack"], "threshold": "> 48 hours"},
            {"id": 5, "name": "Low Test Coverage", "type": "quality", "enabled": True, "channels": ["email"], "threshold": "< 80%"},
        ]
        return Response(alerts)
