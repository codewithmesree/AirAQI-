from app import app, db
from models import Location

with app.app_context():
    locations = Location.query.all()
    print(f"Found {len(locations)} locations:")
    for loc in locations:
        print(f"ID: {loc.id}, Name: {loc.name}, Lat: {loc.latitude}, Lon: {loc.longitude}")
