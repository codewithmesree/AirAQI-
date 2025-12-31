from app import app
from aqi_service import fetch_and_store_aqi

with app.app_context():
    print("Fetching initial AQI data for new locations...")
    result, status = fetch_and_store_aqi()
    print(f"Status: {status}")
    print(f"Result: {result}")
