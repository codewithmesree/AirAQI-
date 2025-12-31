import os
import requests
from dotenv import load_dotenv

load_dotenv()

def test_key():
    api_key = os.getenv('OPENWEATHER_API_KEY')
    print(f"DEBUG: Key finding test...")
    if not api_key:
        print("ERROR: OPENWEATHER_API_KEY not found in environment variables.")
        print("Did you save the .env file?")
        return

    masked_key = api_key[:4] + "..." + api_key[-4:] if len(api_key) > 8 else "INVALID_LENGTH"
    print(f"INFO: Key found: {masked_key}")

    # Test request
    url = f"https://api.openweathermap.org/data/2.5/forecast"
    params = {
        'lat': 28.6139, # Delhi
        'lon': 77.2090, 
        'appid': api_key,
        'units': 'metric'
    }
    
    try:
        print("INFO: Sending request to OpenWeatherMap...")
        response = requests.get(url, params=params)
        print(f"INFO: Response Status: {response.status_code}")
        
        if response.status_code == 200:
            print("SUCCESS: API Key is working!")
            data = response.json()
            print(f"Sample Reading: {data['list'][0]['main']['temp']}°C")
        else:
            print(f"FAILURE: API returned error: {response.text}")
            
    except Exception as e:
        print(f"EXCEPTION: {e}")

if __name__ == "__main__":
    test_key()
