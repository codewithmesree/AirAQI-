from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Simple in-memory storage for demo purposes
# In production, you would use a proper database
users = {
    'abc@gmail.com': {
        'password': 'abc123',
        'name': 'Demo User'
    }
}

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400
        
        if email in users and users[email]['password'] == password:
            return jsonify({
                'message': 'Login successful',
                'user': {
                    'email': email,
                    'name': users[email]['name']
                }
            }), 200
        else:
            return jsonify({'error': 'Invalid email or password'}), 401
            
    except Exception as e:
        return jsonify({'error': 'Server error'}), 500

@app.route('/api/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        name = data.get('name')
        
        if not email or not password or not name:
            return jsonify({'error': 'All fields are required'}), 400
        
        if email in users:
            return jsonify({'error': 'User already exists'}), 409
        
        users[email] = {
            'password': password,
            'name': name
        }
        
        return jsonify({
            'message': 'Signup successful',
            'user': {
                'email': email,
                'name': name
            }
        }), 201
        
    except Exception as e:
        return jsonify({'error': 'Server error'}), 500

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
