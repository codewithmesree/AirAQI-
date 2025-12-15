from extensions import db
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    firebase_uid = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    reports = db.relationship('Report', backref='user', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'firebase_uid': self.firebase_uid,
            'email': self.email,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Location(db.Model):
    __tablename__ = 'locations'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    latitude = db.Column(db.Numeric(9, 6))
    longitude = db.Column(db.Numeric(9, 6))

    readings = db.relationship('AirQualityReading', backref='location', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'latitude': float(self.latitude) if self.latitude else None,
            'longitude': float(self.longitude) if self.longitude else None
        }

class AirQualityReading(db.Model):
    __tablename__ = 'air_quality_readings'

    id = db.Column(db.BigInteger, primary_key=True)
    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'), nullable=False)
    recorded_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    pm2_5 = db.Column(db.Numeric)
    pm10 = db.Column(db.Numeric)
    co = db.Column(db.Numeric)
    no2 = db.Column(db.Numeric)
    o3 = db.Column(db.Numeric)
    so2 = db.Column(db.Numeric)
    aqi = db.Column(db.Integer)

    def to_dict(self):
        return {
            'id': self.id,
            'location_id': self.location_id,
            'recorded_at': self.recorded_at.isoformat() if self.recorded_at else None,
            'pm2_5': float(self.pm2_5) if self.pm2_5 is not None else None,
            'pm10': float(self.pm10) if self.pm10 is not None else None,
            'co': float(self.co) if self.co is not None else None,
            'no2': float(self.no2) if self.no2 is not None else None,
            'o3': float(self.o3) if self.o3 is not None else None,
            'so2': float(self.so2) if self.so2 is not None else None,
            'aqi': self.aqi
        }

class Report(db.Model):
    __tablename__ = 'reports'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String(255))
    generated_date = db.Column(db.DateTime, default=datetime.utcnow)
    type = db.Column(db.String(50))
    status = db.Column(db.String(50))
    file_url = db.Column(db.String(512))

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'generated_date': self.generated_date.isoformat() if self.generated_date else None,
            'type': self.type,
            'status': self.status,
            'file_url': self.file_url
        }
