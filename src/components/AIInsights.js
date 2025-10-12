import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AIInsights.css';

const AIInsights = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored auth data
    localStorage.removeItem('authToken');
    // Redirect to login page
    navigate('/');
  };

  const handleNavigation = (path) => {
    if (path === '/logout') {
      handleLogout();
    } else {
      navigate(path);
    }
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">
              <svg className="logo-svg" fill="currentColor" height="20" viewBox="0 0 256 256" width="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M144,32H112a8,8,0,0,0-8,8V77.25l-21.37-21.38a8,8,0,0,0-11.32,11.32L96,92,71.31,116.69a8,8,0,0,0,11.32,11.32L104,103.31V144a8,8,0,0,0,16,0V103.31l21.37,21.38a8,8,0,0,0,11.32-11.32L128,88.75V40a8,8,0,0,0,8-8,24,24,0,0,1,48,0,8,8,0,0,0,8,8v48.75l-24.69-24.68a8,8,0,0,0-11.32,11.31L176,108,151.31,132.69a8,8,0,0,0,11.32,11.32L184,122.69V216a8,8,0,0,0,16,0V122.69l21.37,21.38a8,8,0,0,0,11.32-11.32L208,108l-24.69-24.68a8,8,0,1,0-11.31,11.31L192,115.25V40a8,8,0,0,0,8-8,24,24,0,0,1-48,0A8,8,0,0,0,144,32ZM72,184a24,24,0,1,0-24-24A24,24,0,0,0,72,184Z"></path>
              </svg>
            </div>
            <span className="logo-text">AirAQI</span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <button className="nav-item" onClick={() => handleNavigation('/dashboard')}>
            <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M221.66,133.66l-72,72A8,8,0,0,1,144,208H40a8,8,0,0,1-8-8V104a8,8,0,0,1,13.66-5.66l72,72a8,8,0,0,0,11.32,0l72-72a8,8,0,0,1,11.32,11.32ZM85.66,42.34l72,72a8,8,0,0,0,11.32,0l72-72a8,8,0,0,0-11.32-11.32L152,108.69,85.66,42.34a8,8,0,0,0-11.32,0L34.34,82.34a8,8,0,1,0,11.32,11.32Z"></path>
            </svg>
            <span>Dashboard</span>
          </button>
          <button className="nav-item" onClick={() => handleNavigation('/forecasting')}>
            <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM208,208H48V88H208Z"></path>
            </svg>
            <span>Forecasting</span>
          </button>
          <button className="nav-item" onClick={() => handleNavigation('/live-map')}>
            <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0v94.37L90.73,98a8,8,0,0,1,10.07-.38l58.81,44.11L218.73,90a8,8,0,1,1,10.54,12l-64,56a8,8,0,0,1-10.07.38L96.39,114.29,40,163.63V200H224A8,8,0,0,1,232,208Z"></path>
            </svg>
            <span>Live Map</span>
          </button>
          <button className="nav-item" onClick={() => handleNavigation('/source-analysis')}>
            <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M197.58,129.06l-51.61-19-19-51.65a15.92,15.92,0,0,0-29.88,0L78.07,110l-51.65,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0l19-51.61,51.65-19a15.92,15.92,0,0,0,0-29.88ZM140.39,163a15.87,15.87,0,0,0-9.43,9.43l-19,51.46L93,172.39A15.87,15.87,0,0,0,83.61,163h0L32.15,144l51.46-19A15.87,15.87,0,0,0,93,115.61l19-51.46,19,51.46a15.87,15.87,0,0,0,9.43,9.43l51.46,19ZM144,40a8,8,0,0,1,8-8h16V16a8,8,0,0,1,16,0V32h16a8,8,0,0,1,0,16H184V64a8,8,0,0,1-16,0V48H152A8,8,0,0,1,144,40ZM248,88a8,8,0,0,1-8,8h-8v8a8,8,0,0,1-16,0V96h-8a8,8,0,0,1,0-16h8V72a8,8,0,0,1,16,0v8h8A8,8,0,0,1,248,88Z"></path>
            </svg>
            <span>Source Analysis</span>
          </button>
          <button className="nav-item active" onClick={() => handleNavigation('/ai-insights')}>
            <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"></path>
            </svg>
            <span>AI Insights</span>
          </button>
          <button className="nav-item" onClick={() => handleNavigation('/reports')}>
            <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"></path>
            </svg>
            <span>Reports</span>
          </button>
        </nav>
        
        <div className="sidebar-footer">
          <button className="nav-item" onClick={() => handleNavigation('/settings')}>
            <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"></path>
            </svg>
            <span>Settings</span>
          </button>
          <button className="nav-item" onClick={() => handleNavigation('/logout')}>
            <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-container">
          {/* Header */}
          <header className="content-header">
            <h1 className="page-title">AI Insights & Health Advisories</h1>
            <p className="page-subtitle">Your personalized guide to navigating Delhi's air quality.</p>
          </header>

          {/* AI Insights Cards */}
          <div className="insights-grid">
            {/* Personalized Health Advisory */}
            <div className="insight-card">
              <div className="card-icon">
                <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M208,40H48A16,16,0,0,0,32,56V200a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V56A16,16,0,0,0,208,40ZM48,56H208V200H48ZM128,88a40,40,0,1,0,40,40A40,40,0,0,0,128,88Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,152Zm48-88a8,8,0,0,1,0,16H80a8,8,0,0,1,0-16Z"></path>
                </svg>
              </div>
              <div className="card-content">
                <h2 className="card-title">Personalized Health Advisory</h2>
                <p className="card-text">
                  Based on the current Air Quality Index (AQI) of <span className="highlight">250 (Very Unhealthy)</span> and your profile with mild asthma, it's strongly recommended to stay indoors as much as possible. If you must go out, wear a high-quality N95 mask and avoid strenuous activities. Keep your inhaler readily available.
                </p>
              </div>
            </div>

            {/* Safe Route Suggestions */}
            <div className="insight-card">
              <div className="card-icon">
                <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0v94.37L90.73,98a8,8,0,0,1,10.07-.38l58.81,44.11L218.73,90a8,8,0,1,1,10.54,12l-64,56a8,8,0,0,1-10.07.38L96.39,114.29,40,163.63V200H224A8,8,0,0,1,232,208Z"></path>
                </svg>
              </div>
              <div className="card-content">
                <h2 className="card-title">Safe Route Suggestions</h2>
                <p className="card-text">
                  For your commute, consider the metro, which has a significantly better average AQI of <span className="highlight">180</span> compared to the city average. Alternatively, the cycling route along the Yamuna River has an AQI of <span className="highlight">200</span>, but it's only recommended if you have no respiratory symptoms.
                </p>
              </div>
            </div>

            {/* Pollution Event Predictions */}
            <div className="insight-card">
              <div className="card-icon">
                <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M160,40a8,8,0,0,1,8-8h40a8,8,0,0,1,0,16H168A8,8,0,0,1,160,40ZM96,40a8,8,0,0,1,8-8h40a8,8,0,0,1,0,16H104A8,8,0,0,1,96,40ZM232,88a8,8,0,0,1-8,8H32a8,8,0,0,1,0-16H224A8,8,0,0,1,232,88ZM160,136a8,8,0,0,1,8-8h40a8,8,0,0,1,0,16H168A8,8,0,0,1,160,136ZM96,136a8,8,0,0,1,8-8h40a8,8,0,0,1,0,16H104A8,8,0,0,1,96,136ZM232,184a8,8,0,0,1-8,8H32a8,8,0,0,1,0-16H224A8,8,0,0,1,232,184Z"></path>
                </svg>
              </div>
              <div className="card-content">
                <h2 className="card-title">Pollution Event Predictions</h2>
                <p className="card-text">
                  Our AI models predict a potential pollution spike in the next 48 hours due to changing weather and traffic patterns. The AQI in central Delhi is expected to reach <span className="highlight">300</span>. Plan outdoor activities accordingly and consider working from home. We will continue to monitor the situation and provide updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIInsights;
