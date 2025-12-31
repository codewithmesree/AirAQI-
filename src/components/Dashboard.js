import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Sidebar from './Sidebar';
import './Dashboard.css';

// Fix for default Leaflet icon issues (though we are using CircleMarker so might not need this, but good practice)
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Dashboard = () => {
  const [locations, setLocations] = useState([]);
  const [latestReadings, setLatestReadings] = useState({});
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [weather, setWeather] = useState([]);
  const [pollutionSources, setPollutionSources] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initial Data Fetch (Locations + AQI)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 1. Fetch Locations
        const locResponse = await axios.get('/api/locations');
        const locs = locResponse.data;
        setLocations(locs);

        // 2. Fetch recent readings
        const readingsResponse = await axios.get('/api/readings?limit=50');
        const readings = readingsResponse.data;

        // Process readings
        const latest = {};
        readings.forEach(r => {
          if (!latest[r.location_id]) {
            latest[r.location_id] = r;
          }
        });
        setLatestReadings(latest);

        // Set default selected location
        if (locs.length > 0) {
          const locWithData = locs.find(l => latest[l.id]);
          setSelectedLocation(locWithData || locs[0]);
        }

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch Location-Specific Data (Weather, Sources, Alerts) when selectedLocation changes
  useEffect(() => {
    if (!selectedLocation) return;

    const fetchLocationDetails = async () => {
      try {
        const [weatherRes, sourcesRes, alertsRes] = await Promise.all([
          axios.get(`/api/weather?location_id=${selectedLocation.id}`),
          axios.get(`/api/pollution-sources?location_id=${selectedLocation.id}`),
          axios.get(`/api/alerts?location_id=${selectedLocation.id}`)
        ]);

        setWeather(weatherRes.data);
        setPollutionSources(sourcesRes.data);
        setAlerts(alertsRes.data);
      } catch (error) {
        console.error("Error fetching location details:", error);
      }
    };

    fetchLocationDetails();
  }, [selectedLocation]);

  const getStatus = (aqi) => {
    if (aqi === undefined || aqi === null) return 'No Data';
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(/ /g, '-');
  };

  const getColor = (aqi) => {
    if (aqi === undefined || aqi === null) return '#gray';
    if (aqi <= 50) return '#009966';
    if (aqi <= 100) return '#ffde33';
    if (aqi <= 150) return '#ff9933';
    if (aqi <= 200) return '#cc0033';
    if (aqi <= 300) return '#660099';
    return '#7e0023';
  };

  const currentReading = selectedLocation ? latestReadings[selectedLocation.id] : null;
  const currentAqi = currentReading ? currentReading.aqi : null;

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
                    <p className="metric-label">Location</p>
                    <p className="metric-value location-name" style={{ fontSize: '1.2rem' }}>
                      {selectedLocation ? selectedLocation.name : 'Loading...'}
                    </p>
                  </div>
                  <div className="metric-box">
                    <p className="metric-label">Current AQI</p>
                    <p className="metric-value primary">{loading ? '...' : (currentAqi ?? '--')}</p>
                    <p className={`metric-status ${loading ? '' : getStatusClass(getStatus(currentAqi))}`}>
                      {loading ? 'Loading...' : getStatus(currentAqi)}
                    </p>
                  </div>
                  <div className="metric-box">
                    <p className="metric-label">Dominant Pollutant</p>
                    <p className="metric-value">PM2.5</p>
                    <p className="metric-sub-value">{loading ? '' : (currentReading ? `${currentReading.pm2_5} µg/m³` : '')}</p>
                  </div>
                </div>

                <h2 className="section-title">Regional AQI Heatmap</h2>
                <div className="heatmap-container" style={{ height: '300px', width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
                  {locations.length > 0 ? (
                    <MapContainer
                      center={[28.6139, 77.2090]} // Center of Delhi
                      zoom={10}
                      style={{ height: '100%', width: '100%' }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      {locations.map(loc => {
                        const reading = latestReadings[loc.id];
                        const aqi = reading ? reading.aqi : null;
                        return (
                          <CircleMarker
                            key={loc.id}
                            center={[loc.latitude, loc.longitude]}
                            radius={10}
                            pathOptions={{
                              color: 'white',
                              weight: 1,
                              fillColor: getColor(aqi),
                              fillOpacity: 0.8
                            }}
                            eventHandlers={{
                              click: () => setSelectedLocation(loc),
                            }}
                          >
                            <Popup>
                              <strong>{loc.name}</strong><br />
                              AQI: {aqi ?? 'N/A'}<br />
                              Status: {getStatus(aqi)}
                            </Popup>
                          </CircleMarker>
                        );
                      })}
                    </MapContainer>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      Loading Map...
                    </div>
                  )}
                </div>
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
                      {weather.length > 0 ? (
                        weather.map((w, index) => (
                          <tr key={index}>
                            <td className="time-cell">{w.time}</td>
                            <td>{w.temp}</td>
                            <td>{w.wind}</td>
                            <td>{w.humidity}</td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="4">No weather data available</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="right-column">
              {/* Top Pollution Sources */}
              <div className="card pollution-card">
                <h2 className="section-title">Top Pollution Sources</h2>
                <ul className="sources-list">
                  {pollutionSources.length > 0 ? (
                    pollutionSources.map((source, index) => (
                      <li key={index} className="source-item">
                        <div className="source-info" style={{ width: '100%' }}>
                          <p className="source-name" style={{ fontSize: '1.1rem', marginBottom: '8px', fontWeight: '600' }}>{source.name}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ flex: 1, backgroundColor: '#f0f2f5', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
                              <div style={{ width: `${source.percentage}%`, backgroundColor: '#4a90e2', height: '100%', borderRadius: '5px' }}></div>
                            </div>
                            <span className="source-percentage" style={{ fontWeight: 'bold', color: '#4a90e2', minWidth: '35px' }}>{source.percentage}%</span>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <p>No pollution source data available</p>
                  )}
                </ul>
              </div>

              {/* Alerts */}
              <div className="card alerts-card">
                <h2 className="section-title">Alerts</h2>
                <div className="alerts-container">
                  {alerts.length > 0 ? (
                    alerts.map((alert, index) => (
                      <div key={index} className={`alert-card ${alert.severity.toLowerCase()}`} style={{ marginBottom: '10px', padding: '10px', borderLeft: `4px solid ${alert.severity === 'High' ? 'red' : 'orange'}`, backgroundColor: '#fff5f5' }}>
                        <p className="alert-title" style={{ fontWeight: 'bold', color: '#c00' }}>{alert.title}</p>
                        <p className="alert-message">{alert.message}</p>
                      </div>
                    ))
                  ) : (
                    <p>No active alerts.</p>
                  )}
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