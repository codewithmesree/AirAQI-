from app import app, db
from models import *

def create_tables():
    print("Creating database tables...")
    with app.app_context():
        try:
            db.create_all()
            print("Successfully created all tables.")
        except Exception as e:
            print(f"Error creating tables: {e}")

if __name__ == "__main__":
    create_tables()
