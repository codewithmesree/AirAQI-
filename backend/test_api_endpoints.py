import requests
import json
import time

BASE_URL = 'http://localhost:5000/api'

def test_workflow():
    print("Waiting for server to start...")
    time.sleep(3)

    # 1. Health Check
    try:
        resp = requests.get(f'{BASE_URL}/health')
        print(f"Health Check: {resp.status_code} - {resp.json()}")
    except Exception as e:
        print(f"Server not up yet? {e}")
        return

    # 2. Create User
    user_data = {
        'firebase_uid': 'test_uid_123',
        'email': 'test@example.com'
    }
    resp = requests.post(f'{BASE_URL}/users', json=user_data)
    print(f"Create User: {resp.status_code} - {resp.json()}")
    
    # 3. Create Report
    report_data = {
        'firebase_uid': 'test_uid_123',
        'name': 'Test Report',
        'type': 'PDF',
        'file_url': 'http://example.com/report.pdf'
    }
    resp = requests.post(f'{BASE_URL}/reports', json=report_data)
    print(f"Create Report: {resp.status_code} - {resp.json()}")

    # 4. Get Reports
    resp = requests.get(f'{BASE_URL}/reports?firebase_uid=test_uid_123')
    print(f"Get Reports: {resp.status_code} - {len(resp.json())} reports found")

    # 4.5 Create Location
    location_data = {
        'name': 'Test Station 1',
        'latitude': 37.7749,
        'longitude': -122.4194
    }
    resp = requests.post(f'{BASE_URL}/locations', json=location_data)
    print(f"Create Location: {resp.status_code} - {resp.json()}")
    if resp.status_code == 201:
        loc_id = resp.json()['id']
    else:
        # Fallback if existing/error
        loc_id = 1

    # 5. Create Reading 
    reading_data = {
        'location_id': loc_id,
        'pm2_5': 12.5,
        'aqi': 50
    }
    resp = requests.post(f'{BASE_URL}/readings', json=reading_data)
    print(f"Create Reading: {resp.status_code} - {resp.text}")

if __name__ == "__main__":
    test_workflow()
