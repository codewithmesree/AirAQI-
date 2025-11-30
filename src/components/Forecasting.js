import React from 'react';
import Sidebar from './Sidebar';
import './Forecasting.css';

const Forecasting = () => {
  return (
    <div className="dashboard">
      <Sidebar />

      {/* Main Content */}
      <main className="main-content">
        <div className="content-container">
          {/* Header */}
          <header className="content-header">
            <h1 className="page-title">Forecasting</h1>
            <p className="page-subtitle">Future AQI predictions for Delhi NCR.</p>
          </header>

          {/* Main Grid: Graph and Prediction Side-by-Side */}
          <div className="forecasting-grid">
            {/* Left Section - AQI Trend */}
            <div className="aqi-trend-section">
              <div className="card">
                <h2 className="section-title">AQI Trend Forecast</h2>
                <p className="section-subtitle">Next 7 Days</p>
                <div className="chart-container">
                  <div className="chart-placeholder">
                    <svg className="chart-svg" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                      {/* Chart background */}
                      <rect width="400" height="200" fill="#f8fafc" rx="8" />

                      {/* Grid lines */}
                      <line x1="50" y1="40" x2="350" y2="40" stroke="#e2e8f0" strokeWidth="1" />
                      <line x1="50" y1="80" x2="350" y2="80" stroke="#e2e8f0" strokeWidth="1" />
                      <line x1="50" y1="120" x2="350" y2="120" stroke="#e2e8f0" strokeWidth="1" />
                      <line x1="50" y1="160" x2="350" y2="160" stroke="#e2e8f0" strokeWidth="1" />

                      {/* Y-axis labels */}
                      <text x="30" y="45" fontSize="12" fill="#64748b">300</text>
                      <text x="30" y="85" fontSize="12" fill="#64748b">200</text>
                      <text x="30" y="125" fontSize="12" fill="#64748b">100</text>
                      <text x="30" y="165" fontSize="12" fill="#64748b">0</text>

                      {/* X-axis labels */}
                      <text x="70" y="190" fontSize="12" fill="#64748b">Mon</text>
                      <text x="120" y="190" fontSize="12" fill="#64748b">Tue</text>
                      <text x="170" y="190" fontSize="12" fill="#64748b">Wed</text>
                      <text x="220" y="190" fontSize="12" fill="#64748b">Thu</text>
                      <text x="270" y="190" fontSize="12" fill="#64748b">Fri</text>
                      <text x="320" y="190" fontSize="12" fill="#64748b">Sat</text>
                      <text x="370" y="190" fontSize="12" fill="#64748b">Sun</text>

                      {/* Chart line */}
                      <path d="M 70 140 Q 120 120 170 100 Q 220 80 270 90 Q 320 110 370 130"
                        stroke="#607afb" strokeWidth="3" fill="none" />

                      {/* Area fill */}
                      <path d="M 70 140 Q 120 120 170 100 Q 220 80 270 90 Q 320 110 370 130 L 370 200 L 70 200 Z"
                        fill="url(#gradient)" opacity="0.3" />

                      {/* Gradient definition */}
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#607afb" />
                          <stop offset="100%" stopColor="#607afb" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Updated AQI Prediction */}
            <div className="aqi-prediction-section">
              <div className="card">
                <h2 className="section-title">Updated AQI Prediction</h2>
                <p className="prediction-text">
                  Clear skies tomorrow may increase surface-level ozone, worsening the AQI.
                  Anticipated rain the day after will likely wash pollutants from the air,
                  leading to a significant improvement in air quality.
                </p>
              </div>
            </div>
          </div>

          {/* New Section: 3-Day Weather Forecast (Full Width below grid) */}
          <div className="full-width-section">
            <div className="card">
              <h2 className="section-title">3-Day Weather Forecast</h2>
              <p className="section-subtitle">Weather's Impact on AQI</p>

              <div className="weather-forecast">
                <div className="weather-day">
                  <div className="weather-icon">☁️</div>
                  <div className="weather-info">
                    <h3 className="day-name">Today</h3>
                    <p className="weather-details">28°C, 10 km/h wind, 65% humidity</p>
                    <p className="aqi-value orange">AQI: 158</p>
                  </div>
                </div>

                <div className="weather-day">
                  <div className="weather-icon">☀️</div>
                  <div className="weather-info">
                    <h3 className="day-name">Tomorrow</h3>
                    <p className="weather-details">32°C, 5 km/h wind, 50% humidity</p>
                    <p className="aqi-value red">AQI: 210</p>
                  </div>
                </div>

                <div className="weather-day">
                  <div className="weather-icon">🌧️</div>
                  <div className="weather-info">
                    <h3 className="day-name">Day after</h3>
                    <p className="weather-details">25°C, 15 km/h wind, 80% humidity</p>
                    <p className="aqi-value green">AQI: 85</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Section (Full Width below forecast) */}
          <div className="summary-section">
            <div className="card">
              <h2 className="section-title">Summary</h2>
              <p className="summary-text">
                Over the next week, Delhi NCR's air quality is expected to fluctuate significantly.
                The AQI is predicted to rise to "Unhealthy for Sensitive Groups" by midweek due to
                clear weather conditions and reduced wind dispersion. However, a weather system
                approaching from the west is expected to bring precipitation by the weekend,
                which should help clear pollutants and improve air quality. Sensitive individuals
                are advised to limit outdoor activities during peak pollution hours and consider
                using air purifiers indoors.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Forecasting;