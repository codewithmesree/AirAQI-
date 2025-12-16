# AirAQI - Delhi-NCR Air Quality App

A React application for monitoring air quality in Delhi-NCR region, featuring real-time data visualization, forecasting, and detailed source analysis.

## Features

- **Secure Authentication**: 
  - Email/Password Login & Signup
  - Google Sign-In integration
  - Powered by Firebase Authentication
- **Interactive Dashboard**: Real-time AQI monitoring and key metrics.
- **Forecasting**: 7-day AQI trend predictions and weather impact analysis.
- **Source Analysis**: Detailed breakdown of pollution sources (Vehicular, Industrial, etc.).
- **AI Insights**: Personalized health advisories and safe route suggestions.
- **Reports**: Generate and download daily, weekly, or monthly air quality reports.
- **Consistent Navigation**: Collapsible sidebar for easy access to all modules.
- **Responsive Design**: Optimized for desktop and mobile devices.

## Tech Stack

- **Frontend**: React.js, CSS3
- **Authentication**: Firebase Auth
- **Routing**: React Router v6
- **Icons**: Heroicons / SVG
- **State Management**: React Context API (AuthContext)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A Firebase project (for authentication)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd AirAQI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the root directory and add your Firebase configuration keys. You can find these in your Firebase Console under Project Settings.

   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

   > **Note**: The `.env` file is ignored by git to keep your keys secure.

4. Start the development server:
   ```bash
   npm start
   ```

   The app will be available at `http://localhost:3000`.

## Project Structure

```
AirAQI/
├── src/
│   ├── components/
│   │   ├── LoginSignup.js    # Auth page
│   │   ├── Dashboard.js      # Main dashboard
│   │   ├── Sidebar.js        # Navigation sidebar
│   │   ├── Forecasting.js    # AQI predictions
│   │   ├── SourceAnalysis.js # Pollution source breakdown
│   │   ├── AIInsights.js     # Health advisories
│   │   ├── Reports.js        # Report generation
│   │   └── ...
│   ├── context/
│   │   └── AuthContext.js    # Authentication state management
│   ├── firebaseConfig.js     # Firebase initialization
│   ├── App.js                # Main routing
│   └── index.js              # Entry point
├── .env                      # Environment variables (not committed)
├── .gitignore                # Git ignore rules
└── package.json              # Dependencies
```

## Usage

1. **Sign Up/Login**: Create an account using email/password or sign in with Google.
2. **Dashboard**: View current AQI status.
3. **Navigation**: Use the sidebar to switch between Forecasting, Source Analysis, AI Insights, and Reports.
4. **Logout**: Securely log out using the button in the sidebar.

## Backend (Optional)

The project includes a `backend/` directory for a Flask API. If you intend to use it:

1. Navigate to `backend/`
2. Create a virtual environment: `python -m venv venv`
3. Install requirements: `pip install -r requirements.txt`
4. Run the server: `python app.py`

*Note: The current authentication flow is handled entirely on the frontend via Firebase.*