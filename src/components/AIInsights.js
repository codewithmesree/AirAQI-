import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
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
      <Sidebar handleNavigation={handleNavigation} />

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
