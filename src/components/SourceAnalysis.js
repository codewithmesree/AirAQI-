import React from 'react';
import Sidebar from './Sidebar';
import './SourceAnalysis.css';

const SourceAnalysis = () => {
  return (
    <div className="dashboard">
      <Sidebar />

      {/* Main Content */}
      <main className="main-content">
        <div className="breakdown-header">
          <h2 className="breakdown-title">Detailed Source Analysis</h2>
          <p className="breakdown-description">
            Detailed information about each pollution source and its impact on air quality in Delhi NCR.
          </p>
        </div>

        <div className="breakdown-list">

          {/* Vehicular Emissions */}
          <div className="breakdown-item card">
            <div className="breakdown-info">
              <div className="breakdown-icon">
                <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24">
                  <path d="M240,112H229.2L201.42,49.5A16,16,0,0,0,186.8,40H69.2a16,16,0,0,0-14.62,9.5L26.8,112H16a8,8,0,0,0,0,16h8v80a16,16,0,0,0,16,16H64a16,16,0,0,0,16-16V192h96v16a16,16,0,0,0,16,16h24a16,16,0,0,0,16-16V128h8a8,8,0,0,0,0-16ZM69.2,56H186.8l24.89,56H44.31ZM64,208H40V192H64Zm128,0V192h24v16Zm24-32H40V128H216ZM56,152a8,8,0,0,1,8-8H80a8,8,0,0,1,0,16H64A8,8,0,0,1,56,152Zm112,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H176A8,8,0,0,1,168,152Z"></path>
                </svg>
              </div>
              <div className="breakdown-content">
                <h3 className="breakdown-item-title">Vehicular Emissions</h3>
                <p className="breakdown-item-text">45% of total pollution</p>
              </div>
            </div>
            <p className="breakdown-summary">
              Primary source of NO2 and CO. Traffic control and better fuel standards are key mitigation strategies.
            </p>
          </div>

          {/* Industrial Emissions */}
          <div className="breakdown-item card">
            <div className="breakdown-info">
              <div className="breakdown-icon">
                <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24">
                  <path d="M116,176a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h28A8,8,0,0,1,116,176Zm60-8H148a8,8,0,0,0,0,16h28a8,8,0,0,0,0-16Zm72,48a8,8,0,0,1-8,8H16a8,8,0,0,1,0-16H32V88a8,8,0,0,1,12.8-6.4L96,120V88a8,8,0,0,1,12.8-6.4l38.74,29.05L159.1,29.74A16.08,16.08,0,0,1,174.94,16h18.12A16.08,16.08,0,0,1,208.9,29.74l15,105.13s.08.78.08,1.13v72h16A8,8,0,0,1,248,216Zm-85.86-94.4,8.53,6.4h36.11L193.06,32H174.94ZM48,208H208V144H168a8,8,0,0,1-4.8-1.6l-14.4-10.8,0,0L112,104v32a8,8,0,0,1-12.8,6.4L48,104Z"></path>
                </svg>
              </div>
              <div className="breakdown-content">
                <h3 className="breakdown-item-title">Industrial Emissions</h3>
                <p className="breakdown-item-text">25% of total pollution</p>
              </div>
            </div>
            <p className="breakdown-summary">
              Major contributor of SO2 and PM. Requires strict emission monitoring and clean energy transition.
            </p>
          </div>

          {/* Construction Dust */}
          <div className="breakdown-item card">
            <div className="breakdown-info">
              <div className="breakdown-icon">
                <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24">
                  <path d="M224,64H176V56a24,24,0,0,0-24-24H104A24,24,0,0,0,80,56v8H32A16,16,0,0,0,16,80V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V80A16,16,0,0,0,224,64ZM96,56a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM224,80v32H192v-8a8,8,0,0,0-16,0v8H80v-8a8,8,0,0,0-16,0v8H32V80Zm0,112H32V128H64v8a8,8,0,0,0,16,0v-8h96v8a8,8,0,0,0,16,0v-8h32v64Z"></path>
                </svg>
              </div>
              <div className="breakdown-content">
                <h3 className="breakdown-item-title">Construction Dust</h3>
                <p className="breakdown-item-text">15% of total pollution</p>
              </div>
            </div>
            <p className="breakdown-summary">
              Major PM10 contributor; needs dust control and site monitoring.
            </p>
          </div>

          {/* Residential Activities */}
          <div className="breakdown-item card">
            <div className="breakdown-info">
              <div className="breakdown-icon">
                <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24">
                  <path d="M208,32H48A16,16,0,0,0,32,48V200a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM208,200H48V48H208ZM128,88a40,40,0,1,0,40,40A40,40,0,0,0,128,88Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,152Z"></path>
                </svg>
              </div>
              <div className="breakdown-content">
                <h3 className="breakdown-item-title">Residential Activities</h3>
                <p className="breakdown-item-text">10% of total pollution</p>
              </div>
            </div>
            <p className="breakdown-summary">
              Includes biomass and waste burning; needs cleaner alternatives.
            </p>
          </div>

          {/* Meteorological & Misc */}
          <div className="breakdown-item card">
            <div className="breakdown-info">
              <div className="breakdown-icon">
                <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24">
                  <path d="M128,24a104,104,0,1,0,104,104A104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm0-144a56,56,0,1,0,56,56A56.06,56.06,0,0,0,128,72Zm0,96a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z"></path>
                </svg>
              </div>
              <div className="breakdown-content">
                <h3 className="breakdown-item-title">Other & Meteorology</h3>
                <p className="breakdown-item-text">5% of total pollution</p>
              </div>
            </div>
            <p className="breakdown-summary">
              Includes stubble burning, storms, and stagnant winds; requires seasonal planning.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default SourceAnalysis;
