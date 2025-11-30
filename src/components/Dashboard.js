import React from 'react';
import Sidebar from './Sidebar';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />

      {/* Main Content */}
      <main className="main-content">
        <div className="content-container">
          {/* Header */}
          <header className="content-header">
            <h1 className="page-title">Delhi NCR Air Quality</h1>
            <p className="page-subtitle">Real-time monitoring and forecasting for a healthier city.</p>
          </header>

          {/* Main Grid */}
          <div className="main-grid">
            {/* Left Column */}
            <div className="left-column">
              {/* AQI Metrics Card */}
              <div className="card">
                <div className="aqi-metrics">
                  <div className="metric-box">
                    <p className="metric-label">Current AQI</p>
                    <p className="metric-value primary">285</p>
                    <p className="metric-status unhealthy">Unhealthy</p>
                  </div>
                  <div className="metric-box">
                    <p className="metric-label">Dominant Pollutant</p>
                    <p className="metric-value">PM2.5</p>
                  </div>
                </div>

                <h2 className="section-title">Regional AQI Heatmap</h2>
                <div
                  className="heatmap-image"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA-uXR5NZgkHVygbzOfHHX1LCEoJe97ZTTMnl6YKJeE2f-0j8wVb1u7QnoxLBEGN-UA-epFFWhIpF6uXlg9T9IRGHAwJfMmt-DMNQkI7FI3fZP34ORTdDZ10jy8KAoHL3NBWJ7Ejr1JTol1yEcAysukWwo5JDoT7M3a5aDWUT_GhSaioy9QPqGoyQp6wsDr1Ll0YIyz_nD691UjLPY344S3GgalDNIqB_kuDrlYrTePmXEX_1tGX0hA_EtlB_CKRdO9NObsEv-2H2IU')`
                  }}
                ></div>
              </div>

              {/* Weather Forecast */}
              <div className="card">
                <h2 className="section-title">Short-Term Weather Forecast</h2>
                <div className="table-container">
                  <table className="weather-table">
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Temp.</th>
                        <th>Wind</th>
                        <th>Humidity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="time-cell">10:00 AM</td>
                        <td>28°C</td>
                        <td>15 km/h</td>
                        <td>60%</td>
                      </tr>
                      <tr>
                        <td className="time-cell">12:00 PM</td>
                        <td>30°C</td>
                        <td>18 km/h</td>
                        <td>55%</td>
                      </tr>
                      <tr>
                        <td className="time-cell">2:00 PM</td>
                        <td>32°C</td>
                        <td>20 km/h</td>
                        <td>50%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="right-column">
              {/* Top Pollution Sources */}
              <div className="card">
                <h2 className="section-title">Top Pollution Sources</h2>
                <ul className="sources-list">
                  <li className="source-item">
                    <div className="source-icon">
                      <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M116,176a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h28A8,8,0,0,1,116,176Zm60-8H148a8,8,0,0,0,0,16h28a8,8,0,0,0,0-16Zm72,48a8,8,0,0,1-8,8H16a8,8,0,0,1,0-16H32V88a8,8,0,0,1,12.8-6.4L96,120V88a8,8,0,0,1,12.8-6.4l38.74,29.05L159.1,29.74A16.08,16.08,0,0,1,174.94,16h18.12A16.08,16.08,0,0,1,208.9,29.74l15,105.13s.08.78.08,1.13v72h16A8,8,0,0,1,248,216Zm-85.86-94.4,8.53,6.4h36.11L193.06,32H174.94ZM48,208H208V144H168a8,8,0,0,1-4.8-1.6l-14.4-10.8,0,0L112,104v32a8,8,0,0,1-12.8,6.4L48,104Z"></path>
                      </svg>
                    </div>
                    <div className="source-info">
                      <p className="source-name">Industrial Emissions</p>
                      <p className="source-percentage">45%</p>
                    </div>
                  </li>
                  <li className="source-item">
                    <div className="source-icon">
                      <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M240,112H229.2L201.42,49.5A16,16,0,0,0,186.8,40H69.2a16,16,0,0,0-14.62,9.5L26.8,112H16a8,8,0,0,0,0,16h8v80a16,16,0,0,0,16,16H64a16,16,0,0,0,16-16V192h96v16a16,16,0,0,0,16,16h24a16,16,0,0,0,16-16V128h8a8,8,0,0,0,0-16ZM69.2,56H186.8l24.89,56H44.31ZM64,208H40V192H64Zm128,0V192h24v16Zm24-32H40V128H216ZM56,152a8,8,0,0,1,8-8H80a8,8,0,0,1,0,16H64A8,8,0,0,1,56,152Zm112,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H176A8,8,0,0,1,168,152Z"></path>
                      </svg>
                    </div>
                    <div className="source-info">
                      <p className="source-name">Vehicular Traffic</p>
                      <p className="source-percentage">30%</p>
                    </div>
                  </li>
                  <li className="source-item">
                    <div className="source-icon">
                      <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M224,64H176V56a24,24,0,0,0-24-24H104A24,24,0,0,0,80,56v8H32A16,16,0,0,0,16,80V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V80A16,16,0,0,0,224,64ZM96,56a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM224,80v32H192v-8a8,8,0,0,0-16,0v8H80v-8a8,8,0,0,0-16,0v8H32V80Zm0,112H32V128H64v8a8,8,0,0,0,16,0v-8h96v8a8,8,0,0,0,16,0v-8h32v64Z"></path>
                      </svg>
                    </div>
                    <div className="source-info">
                      <p className="source-name">Construction Dust</p>
                      <p className="source-percentage">25%</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Alerts */}
              <div className="card">
                <h2 className="section-title">Alerts</h2>
                <div className="alert-card">
                  <p className="alert-title">High Pollution Alert</p>
                  <p className="alert-message">Gurgaon AQI exceeds threshold. Advised to stay indoors.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;