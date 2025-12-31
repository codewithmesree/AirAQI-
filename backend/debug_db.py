from app import app, db
from models import PollutionSource, Alert, Location
import sys

def check_db():
    with open('debug_output.txt', 'w') as f:
        f.write("Checking database connection and schema...\n")
        with app.app_context():
            try:
                # Check Locations
                loc_count = Location.query.count()
                f.write(f"Locations count: {loc_count}\n")
                
                # Check PollutionSource
                f.write("Querying PollutionSource...\n")
                try:
                    sources = PollutionSource.query.first()
                    f.write(f"PollutionSource query successful. Result: {sources}\n")
                except Exception as e:
                     f.write(f"PollutionSource Error: {e}\n")

                # Check Alert
                f.write("Querying Alert...\n")
                try:
                    alerts = Alert.query.first()
                    f.write(f"Alert query successful. Result: {alerts}\n")
                except Exception as e:
                     f.write(f"Alert Error: {e}\n")

            except Exception as e:
                f.write(f"GENERAL ERROR: {e}\n")
                import traceback
                traceback.print_exc(file=f)

if __name__ == "__main__":
    check_db()
