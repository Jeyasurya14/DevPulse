
from django.core.management.base import BaseCommand
from core.mongo import get_db_handle
from pymongo.errors import ConnectionFailure, OperationFailure

class Command(BaseCommand):
    help = 'Verify connection to MongoDB'

    def handle(self, *args, **kwargs):
        self.stdout.write("Attempting to connect to MongoDB...")
        try:
            db = get_db_handle()
            # Try a simple command
            status = db.command("serverStatus")
            version = status.get('version')
            self.stdout.write(self.style.SUCCESS(f"Successfully connected to MongoDB! Version: {version}"))
            
            # Verify Read/Write
            collection = db.test_collection
            collection.insert_one({"status": "working"})
            doc = collection.find_one({"status": "working"})
            if doc:
                self.stdout.write(self.style.SUCCESS("Read/Write test passed."))
                collection.delete_one({"status": "working"})
            else:
                self.stdout.write(self.style.ERROR("Write success but Read failed."))
                
        except ConnectionFailure:
            self.stdout.write(self.style.ERROR("Failed to connect to MongoDB server. Is it running?"))
        except OperationFailure as e:
            self.stdout.write(self.style.ERROR(f"Authentication or Permission error: {e}"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"An error occurred: {e}"))
