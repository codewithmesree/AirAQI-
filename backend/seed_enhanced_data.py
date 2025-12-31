from app import app, db
from models import Location, WeatherForecast, PollutionSource, Alert
import random

def seed_enhanced_data():
    """
    Seeds mock Weather, Pollution Source, and Alert data for all existing locations.
    """
    with app.app_context():
        locations = Location.query.all()
        print(f"Seeding enhanced data for {len(locations)} locations...")

        # Clear existing data
        try:
            db.session.query(WeatherForecast).delete()
            db.session.query(PollutionSource).delete()
            db.session.query(Alert).delete()
            db.session.commit()
            print("Cleared existing enhanced data.")
        except Exception as e:
            db.session.rollback()
            print(f"Error clearing data: {e}")
            return

        # Seed new data
        cities_weather = [
            {"time": "10:00 AM", "temp": "28°C", "wind": "15 km/h", "humidity": "60%"},
            {"time": "12:00 PM", "temp": "31°C", "wind": "18 km/h", "humidity": "55%"},
            {"time": "2:00 PM", "temp": "33°C", "wind": "20 km/h", "humidity": "50%"}
        ]

        pollution_sources_template = [
            {"name": "Vehicular Traffic", "percentage": 40},
            {"name": "Industrial Emissions", "percentage": 30},
            {"name": "Construction Dust", "percentage": 20},
            {"name": "Waste Burning", "percentage": 10}
        ]

        alerts_template = [
             {"title": "High Pollution Alert", "message": "AQI exceeds safe limits. Wear a mask outdoors.", "severity": "High"},
             {"title": "Moderate Air Quality", "message": "Sensitive groups should limit outdoor exertion.", "severity": "Medium"},
             {"title": "Good Air Quality", "message": "Air quality is satisfactory.", "severity": "Low"}
        ]

        for loc in locations:
            # 1. Weather
            for w in cities_weather:
                # Add some random variation
                temp_val = int(w["temp"][:-2]) + random.randint(-2, 2)
                wf = WeatherForecast(
                    location_id=loc.id,
                    time=w["time"],
                    temp=f"{temp_val}°C",
                    wind=w["wind"],
                    humidity=w["humidity"]
                )
                db.session.add(wf)

            # 2. Pollution Sources
            # Shuffle and pick 3
            sources = random.sample(pollution_sources_template, 3)
            # Adjust percentages slightly to sum to 100 roughly (mock data doesn't need to be perfect)
            for s in sources:
                ps = PollutionSource(
                    location_id=loc.id,
                    name=s["name"],
                    percentage=s["percentage"] + random.randint(-5, 5)
                )
                db.session.add(ps)

            # 3. Alerts (Random based on AQI logic simulation)
            # For simplicity, just assign a random alert active
            alert_data = random.choice(alerts_template)
            if alert_data["severity"] != "Low": # Only create alert if not low for demo
                 alert = Alert(
                     location_id=loc.id,
                     title=alert_data["title"],
                     message=f"{loc.name}: {alert_data['message']}",
                     severity=alert_data["severity"],
                     active=True
                 )
                 db.session.add(alert)

        try:
            db.session.commit()
            print("Successfully seeded enhanced data.")
        except Exception as e:
            db.session.rollback()
            print(f"Error seeding enhanced data: {e}")

if __name__ == "__main__":
    seed_enhanced_data()
