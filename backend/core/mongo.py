
import logging
from pymongo import MongoClient, ASCENDING, DESCENDING
from pymongo.errors import ConnectionFailure
from django.conf import settings

logger = logging.getLogger(__name__)

class MongoConnection:
    _client = None

    @classmethod
    def get_client(cls):
        if cls._client is None:
            try:
                # Production Tuning:
                # - maxPoolSize: Allow more concurrent connections (default is 100)
                # - minPoolSize: Keep some connections open (default is 0)
                # - socketTimeoutMS: Fail operations if DB is slow/unresponsive
                cls._client = MongoClient(
                    settings.MONGO_URI, 
                    serverSelectionTimeoutMS=5000,
                    maxPoolSize=100,
                    minPoolSize=10,
                    socketTimeoutMS=30000 
                )
                cls._client.admin.command('ismaster')
                logger.info("Successfully connected to MongoDB with production settings.")
            except ConnectionFailure as e:
                logger.error(f"MongoDB Connection Failed: {e}")
                raise e
        return cls._client

    @classmethod
    def get_db(cls):
        client = cls.get_client()
        try:
             return client.get_database()
        except:
             return client.devpulse
             
    @classmethod
    def create_indexes(cls):
        """
        Ensure critical indexes exist for performance.
        Should be run on startup or deployment.
        """
        db = cls.get_db()
        try:
            # Stats: Query by date range often
            db.productivity_stats.create_index([("date", DESCENDING)])
            
            # Projects: Query by status or name
            db.projects.create_index([("status", ASCENDING)])
            
            # Notes: Sort by creation date
            db.collaboration_notes.create_index([("created_at", DESCENDING)])
            
            # Goals: Query by status
            db.goals.create_index([("status", ASCENDING)])
            
            logger.info("MongoDB indexes verified.")
        except Exception as e:
            logger.error(f"Failed to create indexes: {e}")

# Helper to access database easily in views
def get_db_handle():
    return MongoConnection.get_db()
