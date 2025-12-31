from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from extensions import db
from models import User, Location, AirQualityReading, Report, WeatherForecast, PollutionSource, Alert

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)



# Import models after db initialization to avoid circular imports if they were in this file,
# but since they are in a separate file, we import them here.
# However, models.py imports 'db' from 'app', so we need to be careful with circular imports.
# Common pattern: app.py initializes db, models.py imports db.
# app.py imports models.
from models import User, Location, AirQualityReading, Report, WeatherForecast, PollutionSource, Alert
from aqi_service import fetch_and_store_aqi

@app.route('/api/health', methods=['GET'])
def health():
    try:
        # Check database connection
        db.session.execute(db.text('SELECT 1'))
        return jsonify({'status': 'healthy', 'database': 'connected'}), 200
    except Exception as e:
        return jsonify({'status': 'unhealthy', 'database': 'disconnected', 'error': str(e)}), 500

# --- USER ROUTES ---
@app.route('/api/users', methods=['POST'])
def create_or_get_user():
    data = request.json
    firebase_uid = data.get('firebase_uid')
    email = data.get('email')

    if not firebase_uid or not email:
        return jsonify({'error': 'Missing firebase_uid or email'}), 400

    user = User.query.filter_by(firebase_uid=firebase_uid).first()
    if not user:
        user = User(firebase_uid=firebase_uid, email=email)
        db.session.add(user)
        db.session.commit()
        return jsonify(user.to_dict()), 201
    
    return jsonify(user.to_dict()), 200

# --- REPORT ROUTES ---
@app.route('/api/reports', methods=['GET'])
def get_reports():
    firebase_uid = request.args.get('firebase_uid')
    if not firebase_uid:
        return jsonify({'error': 'Missing firebase_uid'}), 400
    
    user = User.query.filter_by(firebase_uid=firebase_uid).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    reports = Report.query.filter_by(user_id=user.id).order_by(Report.generated_date.desc()).all()
    return jsonify([r.to_dict() for r in reports]), 200

@app.route('/api/reports', methods=['POST'])
def create_report():
    data = request.json
    firebase_uid = data.get('firebase_uid')
    if not firebase_uid:
        return jsonify({'error': 'Missing firebase_uid'}), 400

    user = User.query.filter_by(firebase_uid=firebase_uid).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    new_report = Report(
        user_id=user.id,
        name=data.get('name'),
        type=data.get('type'),
        status=data.get('status', 'Ready'),
        file_url=data.get('file_url')
    )
    db.session.add(new_report)
    db.session.commit()
    return jsonify(new_report.to_dict()), 201

# --- AIR QUALITY ROUTES ---
@app.route('/api/locations', methods=['GET'])
def get_locations():
    locations = Location.query.all()
    return jsonify([loc.to_dict() for loc in locations]), 200

# --- AIR QUALITY ROUTES ---
@app.route('/api/readings', methods=['POST'])
def add_reading():
    data = request.json
    location_id = data.get('location_id')
    
    if not location_id:
        return jsonify({'error': 'Missing location_id'}), 400

    reading = AirQualityReading(
        location_id=location_id,
        pm2_5=data.get('pm2_5'),
        pm10=data.get('pm10'),
        co=data.get('co'),
        no2=data.get('no2'),
        o3=data.get('o3'),
        so2=data.get('so2'),
        aqi=data.get('aqi')
    )
    db.session.add(reading)
    db.session.commit()
    return jsonify(reading.to_dict()), 201

@app.route('/api/readings', methods=['GET'])
def get_readings():
    location_id = request.args.get('location_id')
    limit = request.args.get('limit', 100, type=int)

    query = AirQualityReading.query
    if location_id:
        query = query.filter_by(location_id=location_id)
    
    readings = query.order_by(AirQualityReading.recorded_at.desc()).limit(limit).all()
    return jsonify([r.to_dict() for r in readings]), 200

@app.route('/api/aqi/fetch-external', methods=['POST'])
def trigger_aqi_fetch():
    result, status_code = fetch_and_store_aqi()
    return jsonify(result), status_code

# --- LOCATION ROUTES ---
@app.route('/api/locations', methods=['POST'])
def create_location():
    data = request.json
    name = data.get('name')
    lat = data.get('latitude')
    lon = data.get('longitude')
    
    if not name:
        return jsonify({'error': 'Missing name'}), 400

    new_location = Location(name=name, latitude=lat, longitude=lon)
    db.session.add(new_location)
    db.session.commit()
    return jsonify(new_location.to_dict()), 201

# --- WEATHER ROUTES ---
# --- WEATHER ROUTES ---
@app.route('/api/weather', methods=['GET'])
def get_weather():
    location_id = request.args.get('location_id')
    request_type = request.args.get('type') # 'extended' for Forecasting page
    
    if not location_id:
        return jsonify({'error': 'Missing location_id'}), 400
    
    # Try fetching from API first
    from weather_service import get_weather_forecast
    location = Location.query.get(location_id)
    if location:
        api_data = get_weather_forecast(location.latitude, location.longitude)
        if api_data:
             if request_type == 'extended':
                 return jsonify(api_data), 200
             else:
                 # Default behavior for Dashboard (returns list)
                 return jsonify(api_data['dashboard_forecast']), 200

    # Fallback to DB (Mock Data) - Only simple supported
    forecasts = WeatherForecast.query.filter_by(location_id=location_id).all()
    # If extended requested but API failed, we should probably construct a mock extended structure
    # or let frontend handle nulls. For now, return simple list to avoid crash, frontend check needed.
    mock_data = [f.to_dict() for f in forecasts]
    
    if request_type == 'extended':
         # Wrap simple data in extended structure for graceful fallback
         return jsonify({
             'dashboard_forecast': mock_data,
             'daily_forecast': [], # Empty indicates no extended data
             'summary': "Weather data unavailable. Using cached snapshot.",
             'prediction': "No prediction available."
         }), 200
         
    return jsonify(mock_data), 200

# --- POLLUTION SOURCE ROUTES ---
@app.route('/api/pollution-sources', methods=['GET'])
def get_pollution_sources():
    location_id = request.args.get('location_id')
    if not location_id:
        return jsonify({'error': 'Missing location_id'}), 400

    sources = PollutionSource.query.filter_by(location_id=location_id).order_by(PollutionSource.percentage.desc()).all()
    return jsonify([s.to_dict() for s in sources]), 200

# --- ALERT ROUTES ---
@app.route('/api/alerts', methods=['GET'])
def get_alerts():
    location_id = request.args.get('location_id')
    if not location_id:
        return jsonify({'error': 'Missing location_id'}), 400

    alerts = Alert.query.filter_by(location_id=location_id, active=True).all()
    return jsonify([a.to_dict() for a in alerts]), 200

# --- REPORT ROUTES ---
@app.route('/api/reports', methods=['GET', 'POST'])
def handle_reports():
    if request.method == 'GET':
        firebase_uid = request.args.get('firebase_uid')
        if not firebase_uid:
            return jsonify({'error': 'Missing firebase_uid'}), 400
            
        user = User.query.filter_by(firebase_uid=firebase_uid).first()
        if not user:
            return jsonify([]), 200 
            
        reports = Report.query.filter_by(user_id=user.id).order_by(Report.generated_date.desc()).all()
        return jsonify([r.to_dict() for r in reports]), 200

    elif request.method == 'POST':
        data = request.json
        firebase_uid = data.get('firebase_uid')
        
        if not firebase_uid:
            return jsonify({'error': 'Missing firebase_uid'}), 400
            
        # Find or Create User
        user = User.query.filter_by(firebase_uid=firebase_uid).first()
        if not user:
            user = User(firebase_uid=firebase_uid, email=data.get('email', ''))
            db.session.add(user)
            db.session.commit()
        
        # GENERATE REAL REPORT
        from report_generator import generate_report
        
        report_name = data.get('name', 'Custom Report')
        report_type = data.get('type', 'PDF') # PDF, CSV, DOCX
        
        # This function creates the file in backend/static/reports/ and returns filename
        generated_filename = generate_report(report_name, report_type, firebase_uid)
        
        if generated_filename:
            # Construct accessible URL. Assuming Flask serves static from /static
            # Default Flask static folder is 'static'
            # URL will be http://domain/static/reports/filename
            file_url_path = f"http://127.0.0.1:5000/static/reports/{generated_filename}"
        else:
            file_url_path = "#" # Error fallback
            
        new_report = Report(
            user_id=user.id,
            name=report_name,
            type=report_type,
            status='Completed' if generated_filename else 'Failed',
            file_url=file_url_path
        )
        
        db.session.add(new_report)
        db.session.commit()
        
        return jsonify(new_report.to_dict()), 201

if __name__ == '__main__':
    app.run(debug=True, port=5000)
