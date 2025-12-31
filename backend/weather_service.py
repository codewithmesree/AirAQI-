import requests
import os
from datetime import datetime, timedelta
from collections import defaultdict

def get_weather_forecast(latitude, longitude):
    """
    Fetches 5-day weather forecast from OpenWeatherMap API.
    Aggregates data to provide Daily Summaries and Smart Text Generation.
    """
    api_key = os.getenv('OPENWEATHER_API_KEY')
    if not api_key:
        return None

    url = "https://api.openweathermap.org/data/2.5/forecast"
    params = {
        'lat': latitude,
        'lon': longitude,
        'appid': api_key,
        'units': 'metric'
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        
        # --- Process Data: Aggregate by Day ---
        daily_data = defaultdict(list)
        now = datetime.now()
        
        for item in data.get('list', []):
            dt = datetime.fromtimestamp(item['dt'])
            date_str = dt.strftime('%Y-%m-%d')
            daily_data[date_str].append(item)
            
        forecast_days = []
        sorted_dates = sorted(daily_data.keys())
        
        # Take up to next 3 days
        target_dates = sorted_dates[:3]
        
        for date_str in target_dates:
            items = daily_data[date_str]
            
            # Find closest to Noon for representative conditions
            noon_item = min(items, key=lambda x: abs(12 - datetime.fromtimestamp(x['dt']).hour))
            max_temp = max(item['main']['temp'] for item in items)
            
            # Analyze Conditions
            conditions = [item['weather'][0]['main'] for item in items]
            conditions_desc = [item['weather'][0]['description'] for item in items]
            
            is_rainy = 'Rain' in conditions
            is_cloudy = 'Clouds' in conditions
            
            icon = "☀️"
            if is_rainy: icon = "🌧️"
            elif is_cloudy: icon = "☁️"
            
            # Determine Day Name
            day_dt = datetime.strptime(date_str, '%Y-%m-%d')
            day_name = day_dt.strftime('%A')
            if date_str == now.strftime('%Y-%m-%d'):
                day_name = "Today"
            elif date_str == (now + timedelta(days=1)).strftime('%Y-%m-%d'):
                day_name = "Tomorrow"
            
            # --- Mock AQI Logic (Weather Impact) ---
            # Rain = Good, Wind > 15 = Good, Hot+Clear = Bad (Ozone), Cold+Calm = Very Bad (PM2.5)
            # This is a heuristic for demo purposes
            mock_aqi = 180 # Default Moderate/Unhealthy
            wind_speed = noon_item['wind']['speed']
            
            if is_rainy:
                mock_aqi = 70 # Good/Moderate
            elif wind_speed > 15:
                mock_aqi = 120 # Moderate (Dispersion)
            elif wind_speed < 5 and max_temp < 15:
                mock_aqi = 350 # Hazardous (Winter Inversion)
            else:
                mock_aqi = 210 # Ongoing bad air
                
            aqi_color = 'red'
            if mock_aqi <= 50: aqi_color = 'green'
            elif mock_aqi <= 100: aqi_color = 'yellow'
            elif mock_aqi <= 150: aqi_color = 'orange'
            
            forecast_days.append({
                'day_name': day_name,
                'temp': f"{int(max_temp)}°C",
                'wind': f"{int(wind_speed)} km/h wind",
                'humidity': f"{noon_item['main']['humidity']}% humidity",
                'icon': icon,
                'aqi': mock_aqi,
                'aqi_color': aqi_color,
                'condition': 'Rain' if is_rainy else conditions[0]
            })

        # --- Generate Custom Summary Text ---
        rainy_days = [d['day_name'] for d in forecast_days if d['condition'] == 'Rain']
        avg_aqi = sum(d['aqi'] for d in forecast_days) / len(forecast_days)
        
        summary = f"Over the next 3 days, AQI is expected to average around {int(avg_aqi)}."
        
        if rainy_days:
            summary += f" Relief is expected on {', '.join(rainy_days)} as precipitation will help wash away particulate matter."
        else:
             summary += " Dry conditions will likely sustain high pollution levels. It is advisable to limit outdoor exposure."
             
        if any(d['aqi'] > 300 for d in forecast_days):
            summary += " ALERT: Hazardous conditions predicted. Use masks."
            
        prediction_text = "Standard atmospheric patterns observed."
        if rainy_days:
            prediction_text = "Incoming rain front will significantly reduce surface PM2.5 levels."
        elif avg_aqi > 200:
             prediction_text = "Stagnant winds and poor dispersion are contributing to accumulation of pollutants."

        # Simplify structure for Dashboard (keep backwards compatibility if needed, but we are fixing Forecasting page)
        # Dashboard uses format: [{'time', 'temp', ...}]. This function now returns a dict wrapper.
        # Check if caller expects array or dict.
        # We will make this function dual-purpose or create a specific one.
        # Let's keep strict return for Forecasting Page, and app.py can handle Dashboard legacy needs if separate.
        # Oh, app.py calls this for Dashboard too. Dashboard expects list of objects with 'time', 'temp' etc.
        # The Dashboard only looked at the FIRST few items (3-hourly).
        # We should preserve that for Dashboard, OR update Dashboard to use this new rich data?
        # User said "Forecasting page", implies Dashboard is effectively "done".
        # But let's verify if I break Dashboard.
        # Dashboard.js: `setWeather(weatherRes.data)` -> `weather.map(w => w.time)`
        # If I change return type to Dict, Dashboard breaks.
        
        # SOLUTION: Return Dict with 'dashboard_data' key for backward compatibility, or just different endpoints?
        # Let's stick to returning the dict and I will update app.py to handle it for Dashboard vs Forecasting.
        
        # Creating dashboard-compatiable list (3-hour intervals)
        dashboard_list = []
        for item in data.get('list', [])[:3]:
            dt_txt = item.get('dt_txt')
            dt_obj = datetime.strptime(dt_txt, '%Y-%m-%d %H:%M:%S')
            dashboard_list.append({
                'time': dt_obj.strftime('%I:%M %p'),
                'temp': f"{int(item['main']['temp'])}°C",
                'wind': f"{item['wind']['speed']} km/h",
                'humidity': f"{item['main']['humidity']}%"
            })
            
        return {
            'dashboard_forecast': dashboard_list,
            'daily_forecast': forecast_days,
            'summary': summary,
            'prediction': prediction_text
        }

    except Exception as e:
        print(f"Error fetching weather: {e}")
        return None
