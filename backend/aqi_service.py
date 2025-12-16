import requests
import os
from extensions import db
from models import Location, AirQualityReading

def fetch_and_store_aqi():
    """
    Fetches real-time AQI data from WAQI API for all stored locations
    and saves the readings to the database.
    """
    token = os.getenv('WAQI_TOKEN')
    if not token:
        return {'error': 'WAQI_TOKEN not configured'}, 500

    locations = Location.query.all()
    results = {
        'total': len(locations),
        'success': 0,
        'failed': 0,
        'details': []
    }

    for loc in locations:
        try:
            # WAQI API endpoint for geo-localized feed
            url = f"https://api.waqi.info/feed/geo:{loc.latitude};{loc.longitude}/?token={token}"
            response = requests.get(url)
            data = response.json()

            if data.get('status') == 'ok':
                iaqi = data['data'].get('iaqi', {})
                
                # Extract values safely (some might be missing)
                pm2_5 = iaqi.get('pm25', {}).get('v')
                pm10 = iaqi.get('pm10', {}).get('v')
                co = iaqi.get('co', {}).get('v')
                no2 = iaqi.get('no2', {}).get('v')
                o3 = iaqi.get('o3', {}).get('v')
                so2 = iaqi.get('so2', {}).get('v')
                # The main AQI is usually in data['data']['aqi']
                aqi = data['data'].get('aqi')

                # Create new reading record
                reading = AirQualityReading(
                    location_id=loc.id,
                    pm2_5=pm2_5,
                    pm10=pm10,
                    co=co,
                    no2=no2,
                    o3=o3,
                    so2=so2,
                    aqi=aqi
                )
                db.session.add(reading)
                results['success'] += 1
                results['details'].append({'location': loc.name, 'status': 'success', 'aqi': aqi})
            else:
                results['failed'] += 1
                results['details'].append({'location': loc.name, 'status': 'error', 'message': data.get('data')})

        except Exception as e:
            results['failed'] += 1
            results['details'].append({'location': loc.name, 'status': 'exception', 'error': str(e)})

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return {'error': f'Database commit failed: {str(e)}'}, 500

    return results, 200
