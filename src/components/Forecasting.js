import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './Forecasting.css';

const Forecasting = () => {
  /* State for Forecast Data */
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Forecast Data on Mount
  useEffect(() => {
    // Default location ID 7 (Delhi/Connaught Place) for now, or fetch user's preference
    // In a real app, this would come from context or url params.
    // Using hardcoded ID 7 for consistency with Dashboard investigation.
    const locationId = 7;

    const fetchForecast = async () => {
      try {
        const response = await axios.get(`/api/weather?location_id=${locationId}&type=extended`);
        setForecastData(response.data);
      } catch (error) {
        console.error("Error fetching forecast:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, []);

  const daily = forecastData?.daily_forecast || [];
  const summary = forecastData?.summary || "Loading summary...";
  const prediction = forecastData?.prediction || "Loading prediction...";

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
                <p className="section-subtitle">Next 3 Days</p>
                <div className="chart-container">
                  <div className="chart-placeholder">
                    {/* Simplified Placeholder or Real Chart if lib installed. Keeping SVG for now but could be dynamic */}
                    <svg className="chart-svg" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                      <rect width="400" height="200" fill="#f8fafc" rx="8" />
                      {/* Dynamic Mock Line based on data if available, else static */}
                      <path d="M 50 150 Q 150 100 250 120 Q 350 80 400 110" stroke="#607afb" strokeWidth="3" fill="none" />
                      <text x="20" y="190" fontSize="12" fill="#64748b">Now</text>
                      <text x="350" y="190" fontSize="12" fill="#64748b">+3 Days</text>
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
                  {loading ? "Analyzing atmospheric conditions..." : prediction}
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
                {loading ? (
                  <p>Loading Forecast...</p>
                ) : (
                  daily.length > 0 ? daily.map((day, index) => (
                    <div key={index} className="weather-day">
                      <div className="weather-icon">{day.icon}</div>
                      <div className="weather-info">
                        <h3 className="day-name">{day.day_name}</h3>
                        <p className="weather-details">{day.temp}, {day.wind}</p>
                        <p className="weather-details" style={{ fontSize: '0.9rem', color: '#888' }}>{day.humidity}</p>
                        <p className={`aqi-value ${day.aqi_color}`}>Est. AQI: {day.aqi}</p>
                      </div>
                    </div>
                  )) : (
                    <p>No forecast data available.</p>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Summary Section (Full Width below forecast) */}
          <div className="summary-section">
            <div className="card">
              <h2 className="section-title">Summary</h2>
              <p className="summary-text">
                {loading ? "Generating summary..." : summary}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Forecasting;