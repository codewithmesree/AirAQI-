import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginSignup.css';

const LoginSignup = () => {
  const navigate = useNavigate();
  const { signup, login, googleSignIn } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      if (activeTab === 'login') {
        await login(formData.email, formData.password);
        setMessage('Login successful!');
        navigate('/dashboard');
      } else {
        if (formData.password !== formData.confirmPassword) {
          setMessage('Passwords do not match');
          setLoading(false);
          return;
        }
        if (!formData.email || !formData.password) {
          setMessage('Please fill in all fields');
          setLoading(false);
          return;
        }

        await signup(formData.email, formData.password);
        setMessage('Signup successful!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Auth Error:", error);
      setMessage(error.message.replace('Firebase: ', ''));
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      setMessage('');
      setLoading(true);
      await googleSignIn();
      navigate('/dashboard');
    } catch (error) {
      console.error("Google Auth Error:", error);
      setMessage(error.message.replace('Firebase: ', ''));
      setLoading(false);
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
              <button type="button" className="forgot-link" onClick={() => setMessage('Forgot password functionality not implemented')}>
                Forgot Password?
              </button>
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Processing...' : (activeTab === 'login' ? 'Log in' : 'Sign up')}
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
        <button type="button" className="google-btn" onClick={handleGoogleSignIn} disabled={loading}>
          <div className="google-icon">G</div>
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default LoginSignup;
