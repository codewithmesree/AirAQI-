import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginSignup from './components/LoginSignup';
import Dashboard from './components/Dashboard';
import Forecasting from './components/Forecasting';
import AIInsights from './components/AIInsights';
import SourceAnalysis from './components/SourceAnalysis';
import Reports from './components/Reports';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginSignup />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/forecasting"
              element={
                <PrivateRoute>
                  <Forecasting />
                </PrivateRoute>
              }
            />
            <Route
              path="/ai-insights"
              element={
                <PrivateRoute>
                  <AIInsights />
                </PrivateRoute>
              }
            />
            <Route
              path="/source-analysis"
              element={
                <PrivateRoute>
                  <SourceAnalysis />
                </PrivateRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <PrivateRoute>
                  <Reports />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
