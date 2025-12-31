from app import app, db
from models import AirQualityReading

with app.app_context():
    readings = AirQualityReading.query.order_by(AirQualityReading.recorded_at.desc()).limit(5).all()
    print(f"Found {len(readings)} recent readings:")
    for r in readings:
        print(f"LocID: {r.location_id}, AQI: {r.aqi}, Time: {r.recorded_at}")
