// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FraudProvider } from './contexts/FraudContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Predict from './pages/Predict';
import Transactions from './pages/Transactions';
import LiveMonitor from './pages/LiveMonitor';
import Analytics from './pages/Analytics';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';
import './App.css';

function App() {
  return (
    <FraudProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/monitor" element={<LiveMonitor />} />
            <Route path="/predict" element={<Predict />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </Router>
    </FraudProvider>
  );
}

export default App;