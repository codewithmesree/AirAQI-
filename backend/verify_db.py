from app import app, db
from sqlalchemy import text
import sys

def verify_connection():
    try:
        with app.app_context():
            result = db.session.execute(text('SELECT 1'))
            print("Successfully connected to the database!")
            print(f"Test query result: {result.scalar()}")
            return True
    except Exception as e:
        print(f"Failed to connect to the database: {e}")
        return False

if __name__ == "__main__":
    if verify_connection():
        sys.exit(0)
    else:
        sys.exit(1)
