// pages/Alerts.jsx (CORRECTED VERSION)
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';
import './Alerts.css';
import { Bell, CheckCircle, XCircle, AlertTriangle, Clock, Filter, Download } from 'lucide-react';

function Alerts() {
  const [darkMode, setDarkMode] = useState(true);
  const [filter, setFilter] = useState('all');

  const alerts = [
    { id: 1, type: 'critical', message: 'Suspicious high-value transaction detected', amount: '$12,450', location: 'New York, US', time: '2 minutes ago', status: 'unread', risk: 98 },
    { id: 2, type: 'high', message: 'Multiple failed login attempts', amount: '-', location: 'London, UK', time: '15 minutes ago', status: 'unread', risk: 87 },
    { id: 3, type: 'medium', message: 'Unusual spending pattern detected', amount: '$5,230', location: 'Toronto, CA', time: '1 hour ago', status: 'read', risk: 65 },
    { id: 4, type: 'critical', message: 'Card not present fraud pattern', amount: '$8,900', location: 'Berlin, DE', time: '3 hours ago', status: 'read', risk: 94 },
    { id: 5, type: 'high', message: 'Geolocation mismatch', amount: '$3,450', location: 'Paris, FR', time: '5 hours ago', status: 'unread', risk: 82 },
    { id: 6, type: 'low', message: 'New device login detected', amount: '-', location: 'Sydney, AU', time: '1 day ago', status: 'read', risk: 35 },
  ];

  const getTypeColor = (type) => {
    switch(type) {
      case 'critical': return '#ef4444';
      case 'high': return '#f59e0b';
      case 'medium': return '#3b82f6';
      case 'low': return '#10b981';
      default: return '#94a3b8';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'critical': return <XCircle size={20} />;
      case 'high': return <AlertTriangle size={20} />;
      case 'medium': return <Bell size={20} />;
      case 'low': return <CheckCircle size={20} />;
      default: return <Bell size={20} />;
    }
  };

  const filteredAlerts = filter === 'all' ? alerts : alerts.filter(a => a.type === filter);

  return (
    <div className="alerts-page">
      <Sidebar />
      <div className="alerts-main">
        <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
        
        <div className="alerts-content">
          {/* Header */}
          <div className="alerts-header">
            <div>
              <h1 className="alerts-title">Security Alerts</h1>
              <p className="alerts-subtitle">Real-time fraud alerts and notifications</p>
            </div>
            <div className="alerts-actions">
              <button className="mark-all-btn">
                <CheckCircle size={16} />
                Mark all as read
              </button>
              <button className="export-alerts-btn">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="filter-bar">
            <div className="filter-buttons">
              <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
                All Alerts
                <span className="count">{alerts.length}</span>
              </button>
              <button className={`filter-btn ${filter === 'critical' ? 'active' : ''}`} onClick={() => setFilter('critical')}>
                Critical
                <span className="count critical">{alerts.filter(a => a.type === 'critical').length}</span>
              </button>
              <button className={`filter-btn ${filter === 'high' ? 'active' : ''}`} onClick={() => setFilter('high')}>
                High
                <span className="count high">{alerts.filter(a => a.type === 'high').length}</span>
              </button>
              <button className={`filter-btn ${filter === 'medium' ? 'active' : ''}`} onClick={() => setFilter('medium')}>
                Medium
                <span className="count medium">{alerts.filter(a => a.type === 'medium').length}</span>
              </button>
              <button className={`filter-btn ${filter === 'low' ? 'active' : ''}`} onClick={() => setFilter('low')}>
                Low
                <span className="count low">{alerts.filter(a => a.type === 'low').length}</span>
              </button>
            </div>
            <button className="filter-settings">
              <Filter size={16} />
              Filter
            </button>
          </div>

          {/* Alerts List */}
          <div className="alerts-list">
            {filteredAlerts.map((alert) => (
              <div key={alert.id} className={`alert-card ${alert.status} ${alert.type}`}>
                <div className="alert-icon" style={{ background: `${getTypeColor(alert.type)}20`, color: getTypeColor(alert.type) }}>
                  {getTypeIcon(alert.type)}
                </div>
                <div className="alert-content">
                  <div className="alert-header">
                    <h4>{alert.message}</h4>
                    <span className="alert-time">
                      <Clock size={12} />
                      {alert.time}
                    </span>
                  </div>
                  <div className="alert-details">
                    {alert.amount !== '-' && <span className="alert-amount">{alert.amount}</span>}
                    <span className="alert-location">{alert.location}</span>
                    <div className="alert-risk">
                      <div className="risk-bar-alert">
                        <div className="risk-fill-alert" style={{ width: `${alert.risk}%`, background: getTypeColor(alert.type) }}></div>
                      </div>
                      <span>Risk: {alert.risk}%</span>
                    </div>
                  </div>
                </div>
                <div className="alert-actions">
                  <button className="investigate-alert">Investigate</button>
                  <button className="dismiss-alert">Dismiss</button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="alerts-summary">
            <div className="summary-card">
              <div className="summary-icon critical-bg">⚠️</div>
              <div>
                <div className="summary-value">2</div>
                <div className="summary-label">Critical Alerts</div>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-icon high-bg">🔴</div>
              <div>
                <div className="summary-value">2</div>
                <div className="summary-label">High Priority</div>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-icon medium-bg">🟡</div>
              <div>
                <div className="summary-value">1</div>
                <div className="summary-label">Medium Priority</div>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-icon low-bg">🟢</div>
              <div>
                <div className="summary-value">1</div>
                <div className="summary-label">Low Priority</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alerts;