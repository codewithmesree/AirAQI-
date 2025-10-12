import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginSignup from './components/LoginSignup';
import Dashboard from './components/Dashboard';
import Forecasting from './components/Forecasting';
import AIInsights from './components/AIInsights';
import SourceAnalysis from './components/SourceAnalysis';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forecasting" element={<Forecasting />} />
          <Route path="/ai-insights" element={<AIInsights />} />
          <Route path="/source-analysis" element={<SourceAnalysis />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
