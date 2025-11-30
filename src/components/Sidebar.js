import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
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
                <button className={`nav-item ${isActive('/dashboard')}`} onClick={() => handleNavigation('/dashboard')}>
                    <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M221.66,133.66l-72,72A8,8,0,0,1,144,208H40a8,8,0,0,1-8-8V104a8,8,0,0,1,13.66-5.66l72,72a8,8,0,0,0,11.32,0l72-72a8,8,0,0,1,11.32,11.32ZM85.66,42.34l72,72a8,8,0,0,0,11.32,0l72-72a8,8,0,0,0-11.32-11.32L152,108.69,85.66,42.34a8,8,0,0,0-11.32,0L34.34,82.34a8,8,0,1,0,11.32,11.32Z"></path>
                    </svg>
                    <span>Dashboard</span>
                </button>
                <button className={`nav-item ${isActive('/forecasting')}`} onClick={() => handleNavigation('/forecasting')}>
                    <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200Zm-24-96a8,8,0,0,1-8,8H152v32h32a8,8,0,0,1,0,16H152v16a8,8,0,0,1-16,0V160H104a8,8,0,0,1,0-16h32V112H104a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8h80a8,8,0,0,1,8,8Z"></path>
                    </svg>
                    <span>Forecasting</span>
                </button>
                <button className={`nav-item ${isActive('/source-analysis')}`} onClick={() => handleNavigation('/source-analysis')}>
                    <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM48,48H96V208H48Zm64,160V48h48V208Zm112,0H176V48h48Z"></path>
                    </svg>
                    <span>Source Analysis</span>
                </button>
                <button className={`nav-item ${isActive('/ai-insights')}`} onClick={() => handleNavigation('/ai-insights')}>
                    <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"></path>
                    </svg>
                    <span>AI Insights</span>
                </button>
                <button className={`nav-item ${isActive('/reports')}`} onClick={() => handleNavigation('/reports')}>
                    <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M88,112a8,8,0,0,1,8-8h80a8,8,0,0,1,0,16H96A8,8,0,0,1,88,112Zm8,40h80a8,8,0,0,0,0-16H96a8,8,0,0,0,0,16ZM224,48V208a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48Zm-16,0H48V208H208Z"></path>
                    </svg>
                    <span>Reports</span>
                </button>
            </nav>

            <div className="sidebar-footer">
                <button className={`nav-item ${isActive('/settings')}`} onClick={() => handleNavigation('/settings')}>
                    <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"></path>
                    </svg>
                    <span>Settings</span>
                </button>
                <button className="nav-item" onClick={handleLogout}>
                    <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
                    </svg>
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
