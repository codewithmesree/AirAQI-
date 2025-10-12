# AirAQI - Delhi-NCR Air Quality App

A React and Flask application for monitoring air quality in Delhi-NCR region.

## Features

- **Login/Signup System**: Secure authentication with email and password
- **Modern UI**: Clean, responsive design matching the provided mockup
- **Real-time Validation**: Form validation and error handling
- **Google OAuth Ready**: Prepared for Google authentication integration

## Demo Credentials

- **Email**: abc@gmail.com
- **Password**: abc123

## Project Structure

```
AirAQI/
├── src/                    # React frontend
│   ├── components/         # React components
│   │   ├── LoginSignup.js  # Main login/signup component
│   │   └── LoginSignup.css # Styling for login/signup
│   ├── App.js             # Main App component
│   ├── App.css            # App styling
│   ├── index.js           # React entry point
│   └── index.css          # Global styles
├── backend/               # Flask backend
│   ├── app.py            # Main Flask application
│   └── requirements.txt  # Python dependencies
└── package.json          # Node.js dependencies
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- Python (v3.7 or higher)
- npm or yarn

### Frontend Setup (React)

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The React app will be available at `http://localhost:3000`

### Backend Setup (Flask)

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start the Flask server:
```bash
python app.py
```

The Flask API will be available at `http://localhost:5000`

## API Endpoints

- `POST /api/login` - User login
- `POST /api/signup` - User registration
- `GET /api/health` - Health check

## Usage

1. Start both the React frontend and Flask backend
2. Open `http://localhost:3000` in your browser
3. Use the demo credentials to login or create a new account
4. The app will validate credentials and show success/error messages

## Design Features

- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, minimalist design with proper spacing
- **Accessibility**: Proper form labels and keyboard navigation
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during API calls

## Next Steps

- Add dashboard for air quality data
- Implement real-time air quality monitoring
- Add location-based services
- Integrate with air quality APIs
- Add user profile management
- Implement password reset functionality
