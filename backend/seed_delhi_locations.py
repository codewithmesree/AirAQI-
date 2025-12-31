from app import app, db
from models import Location, AirQualityReading

def seed_delhi_locations():
    """
    Clears existing location and reading data and seeds
    the database with specific Delhi locations.
    """
    with app.app_context():
        print("Clearing existing data...")
        # Delete readings first due to foreign key constraint
        try:
            num_readings = db.session.query(AirQualityReading).delete()
            num_locations = db.session.query(Location).delete()
            db.session.commit()
            print(f"Deleted {num_readings} readings and {num_locations} locations.")
        except Exception as e:
            db.session.rollback()
            print(f"Error clearing data: {e}")
            return

        print("Seeding new Delhi locations...")
        delhi_locations = [
            {"name": "Connaught Place, Delhi", "latitude": 28.627, "longitude": 77.215},
            {"name": "Anand Vihar, Delhi", "latitude": 28.646, "longitude": 77.316},
            {"name": "Punjabi Bagh, Delhi", "latitude": 28.668, "longitude": 77.133},
            {"name": "R K Puram, Delhi", "latitude": 28.566, "longitude": 77.172},
            {"name": "Dwarka Sector 8, Delhi", "latitude": 28.592, "longitude": 77.046},
            {"name": "Okhla Phase 2, Delhi", "latitude": 28.536, "longitude": 77.269},
            {"name": "Rohini, Delhi", "latitude": 28.704, "longitude": 77.119},
            {"name": "Jahangirpuri, Delhi", "latitude": 28.725, "longitude": 77.168},
            {"name": "Wazirpur, Delhi", "latitude": 28.700, "longitude": 77.165},
            {"name": "Ashok Vihar, Delhi", "latitude": 28.694, "longitude": 77.172},
            {"name": "Bawana, Delhi", "latitude": 28.799, "longitude": 77.062},
            {"name": "Mundka, Delhi", "latitude": 28.683, "longitude": 77.026},
            {"name": "Najafgarh, Delhi", "latitude": 28.614, "longitude": 76.985},
            {"name": "Narela, Delhi", "latitude": 28.854, "longitude": 77.104},
            {"name": "Nehru Nagar, Delhi", "latitude": 28.566, "longitude": 77.252},
            {"name": "Patparganj, Delhi", "latitude": 28.623, "longitude": 77.287},
            {"name": "Sonia Vihar, Delhi", "latitude": 28.711, "longitude": 77.259},
            {"name": "Sri Aurobindo Marg, Delhi", "latitude": 28.544, "longitude": 77.206},
            {"name": "Alipur, Delhi", "latitude": 28.815, "longitude": 77.153},
            {"name": "ITO, Delhi", "latitude": 28.628, "longitude": 77.243}
        ]

        for loc_data in delhi_locations:
            loc = Location(
                name=loc_data["name"],
                latitude=loc_data["latitude"],
                longitude=loc_data["longitude"]
            )
            db.session.add(loc)
        
        try:
            db.session.commit()
            print(f"Successfully added {len(delhi_locations)} locations.")
        except Exception as e:
            db.session.rollback()
            print(f"Error seeding locations: {e}")

if __name__ == "__main__":
    seed_delhi_locations()
