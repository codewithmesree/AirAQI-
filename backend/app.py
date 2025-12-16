from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from extensions import db
from models import User, Location, AirQualityReading, Report

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
from models import User, Location, AirQualityReading, Report
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

if __name__ == '__main__':
    app.run(debug=True, port=5000)
