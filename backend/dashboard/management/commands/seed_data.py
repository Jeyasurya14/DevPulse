
from django.core.management.base import BaseCommand
from core.mongo import get_db_handle, MongoConnection
import datetime
import random

class Command(BaseCommand):
    help = 'Seed database with REALISTIC production-like data'

    def handle(self, *args, **kwargs):
        # 0. Ensure indexes
        MongoConnection.create_indexes()
        
        db = get_db_handle()
        self.stdout.write("Cleaning old data...")
        # Clear everything for a fresh production-like start
        db.projects.delete_many({})
        db.productivity_stats.delete_many({})
        db.goals.delete_many({})
        db.collaboration_notes.delete_many({})
        db.integrations.delete_many({})

        self.stdout.write("Seeding realistic data...")
        
        # 1. Real World Projects
        projects = [
            {
                "name": "E-Commerce Microservices", 
                "status": "Active", 
                "tech": ["Node.js", "Docker", "Kubernetes", "Redis"], 
                "progress": 78,
                "description": "Replatforming the legacy monolith to microservices architecture."
            },
            {
                "name": "Customer Analytics Dashboard", 
                "status": "In Progress", 
                "tech": ["Python", "Pandas", "React", "D3.js"], 
                "progress": 45,
                "description": "Visualizing customer churn and retention metrics for the marketing team."
            },
            {
                "name": "Mobile Wallet App (iOS)", 
                "status": "Testing", 
                "tech": ["Swift", "Firebase", "Stripe"], 
                "progress": 92,
                "description": "Final QA phase before App Store submission."
            },
            {
                "name": "Internal Auth Service", 
                "status": "Maintenance", 
                "tech": ["Go", "PostgreSQL", "OAuth2"], 
                "progress": 100,
                "description": "Centralized authentication service for all internal tools."
            },
               {
                "name": "AI Chatbot Integration", 
                "status": "Planning", 
                "tech": ["OpenAI API", "LangChain", "Next.js"], 
                "progress": 15,
                "description": "Customer support automation using LLMs."
            },
        ]
        
        for p in projects:
            p['created_at'] = datetime.datetime.utcnow()
            db.projects.insert_one(p)
            
        # 2. Detailed Productivity Stats (Last 30 days)
        stats = []
        base_date = datetime.datetime.utcnow() - datetime.timedelta(days=30)
        for i in range(30):
            day = base_date + datetime.timedelta(days=i)
            # Create a realistic "work week" pattern
            is_weekend = day.weekday() >= 5
            
            if is_weekend:
                commits = random.randint(0, 5)
                hours = random.uniform(0, 2)
            else:
                commits = random.randint(5, 45)
                hours = random.uniform(5, 10)
                
            stats.append({
                "date": day.strftime("%Y-%m-%d"),
                "commits": commits,
                "tasks_completed": random.randint(1, 12) if not is_weekend else 0,
                "hours_coded": round(hours, 2),
                "efficiency_score": random.randint(80, 98) if not is_weekend else 0,
                "bugs_fixed": random.randint(0, 3)
            })
        db.productivity_stats.insert_many(stats)

        # 3. Collaborative Goals
        goals = [
             {"title": "Improve Test Coverage", "target_value": 90, "current_value": 72, "metric": "%", "status": "in_progress", "target_date": "2026-03-31"},
             {"title": "Reduce API Latency", "target_value": 100, "current_value": 145, "metric": "ms", "status": "in_progress", "target_date": "2026-02-15"},
             {"title": "Release v2.0", "target_value": 100, "current_value": 45, "metric": "%", "status": "in_progress", "target_date": "2026-05-01"},
             {"title": "Migrate to TypeScript", "target_value": 500, "current_value": 500, "metric": "Files", "status": "completed", "target_date": "2025-12-31"},
        ]
        for g in goals:
             db.goals.insert_one(g)

        # 4. Team Notes
        notes = [
            {
                "content": "Make sure to run the migration script `migrate_users_v2.py` before deploying the auth service changes!", 
                "author": "Sarah Jenkins", 
                "tags": ["deployment", "critical"], 
                "created_at": datetime.datetime.utcnow().isoformat()
            },
            {
                "content": "I found a memory leak in the image processing worker. Fix is in PR #405.", 
                "author": "David Lo", 
                "tags": ["bugfix", "backend"], 
                "created_at": (datetime.datetime.utcnow() - datetime.timedelta(hours=2)).isoformat()
            },
             {
                "content": "The new Figma designs for the dashboard are ready for review. @FrontendTeam", 
                "author": "Emily Blunt", 
                "tags": ["design", "ui"], 
                "created_at": (datetime.datetime.utcnow() - datetime.timedelta(days=1)).isoformat()
            },
        ]
        db.collaboration_notes.insert_many(notes)
        
        # 5. Integrations (mocked)
        db.integrations.insert_one({"provider": "Github", "connected": True, "api_key_masked": "ghp_xxxx-8f2a", "name": "GitHub"})
        db.integrations.insert_one({"provider": "Jira", "connected": True, "api_key_masked": "jira_xxxx-m92k", "name": "Jira"})


        self.stdout.write(self.style.SUCCESS("Successfully populated REALISTIC production data."))
