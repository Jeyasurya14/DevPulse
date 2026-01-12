
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from core.mongo import get_db_handle
from bson import ObjectId
import datetime

class GoalList(APIView):
    def get(self, request):
        db = get_db_handle()
        goals = list(db.goals.find({}, {'_id': 0})) # In prod, convert ObjectId dynamically
        return Response(goals)

    def post(self, request):
        db = get_db_handle()
        data = request.data
        goal = {
            "title": data.get('title'),
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

