import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginSignup.css';

const LoginSignup = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      if (activeTab === 'login') {
        const response = await axios.post('/api/login', {
          email: formData.email,
          password: formData.password
        });
        
        setMessage('Login successful!');
        console.log('User logged in:', response.data.user);
        // Redirect to dashboard after successful login
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
        
      } else {
        // Signup validation
        if (formData.password !== formData.confirmPassword) {
          setMessage('Passwords do not match');
          return;
        }
        if (!formData.name || !formData.email || !formData.password) {
          setMessage('Please fill in all fields');
          return;
        }
        
        const response = await axios.post('/api/signup', {
          email: formData.email,
          password: formData.password,
          name: formData.name
        });
        
        setMessage('Signup successful!');
        console.log('User created:', response.data.user);
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || 'An error occurred');
      } else {
        setMessage('Network error. Please check if the backend is running.');
      }
    }
  };

  return (
    <div className="login-signup-container">
      {/* Header with logo */}
      <div className="header">
        <div className="logo">
          <div className="logo-icon"></div>
          <span className="logo-text">AirAQI</span>
        </div>
      </div>

      {/* Welcome title */}
      <h1 className="welcome-title">Welcome to AIRAQI</h1>

      {/* Main card */}
      <div className="auth-card">
        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Log in
          </button>
          <button
            className={`tab ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {activeTab === 'signup' && (
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          )}
          
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          {activeTab === 'signup' && (
            <div className="input-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          )}

          {activeTab === 'login' && (
            <div className="forgot-password">
              <a href="#" className="forgot-link">Forgot Password?</a>
            </div>
          )}

          <button type="submit" className="submit-btn">
            {activeTab === 'login' ? 'Log in' : 'Sign up'}
          </button>

          {message && (
            <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
        </form>

        {/* Divider */}
        <div className="divider">
          <span className="divider-text">Or</span>
        </div>

        {/* Google login */}
        <button className="google-btn">
          <div className="google-icon">G</div>
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default LoginSignup;
