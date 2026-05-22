// pages/LiveMonitor.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';
import './LiveMonitor.css';
import { Activity, Zap, AlertCircle, Clock, MapPin, RefreshCw } from 'lucide-react';

function LiveMonitor() {
  const [darkMode, setDarkMode] = useState(true);
  const [liveTransactions, setLiveTransactions] = useState([]);
  const [stats, setStats] = useState({
    tps: 142,
    avgResponseTime: 87,
    activeSessions: 2341,
    blockedAttempts: 23
  });

  // Simulate live transactions
  useEffect(() => {
    const generateTransaction = () => {
      const locations = ['US, New York', 'UK, London', 'CA, Toronto', 'AU, Sydney', 'DE, Berlin', 'FR, Paris'];
      const statuses = ['approved', 'flagged', 'blocked'];
      const randomStatus = statuses[Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : 2) : 0];
      
      return {
        id: `TXN-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        amount: Math.floor(Math.random() * 5000) + 50,
        location: locations[Math.floor(Math.random() * locations.length)],
        status: randomStatus,
        risk: Math.floor(Math.random() * 100),
        timestamp: new Date().toLocaleTimeString(),
        cardType: ['Visa', 'Mastercard', 'Amex'][Math.floor(Math.random() * 3)]
      };
    };

    const interval = setInterval(() => {
      setLiveTransactions(prev => [generateTransaction(), ...prev].slice(0, 20));
      setStats(prev => ({
        ...prev,
        tps: Math.floor(Math.random() * 50) + 120,
        blockedAttempts: prev.blockedAttempts + (Math.random() > 0.7 ? 1 : 0)
      }));
    }, 2000);

    // Initial transactions
    const initial = Array(10).fill().map(() => generateTransaction());
    setLiveTransactions(initial);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return '#10b981';
      case 'flagged': return '#f59e0b';
      case 'blocked': return '#ef4444';
      default: return '#94a3b8';
    }
  };

  const getRiskColor = (risk) => {
    if (risk > 70) return '#ef4444';
    if (risk > 40) return '#f59e0b';
    return '#10b981';
  };

  return (
    <div className="monitor-page">
      <Sidebar />
      <div className="monitor-main">
        <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
        
        <div className="monitor-content">
          {/* Header */}
          <div className="monitor-header">
            <div>
              <h1 className="monitor-title">Live Monitor</h1>
              <p className="monitor-subtitle">Real-time transaction monitoring</p>
            </div>
            <div className="live-badge">
              <Activity size={16} />
              <span>LIVE</span>
              <div className="pulse-dot"></div>
            </div>
          </div>

          {/* Real-time Stats */}
          <div className="realtime-stats">
            <div className="stat-box">
              <Zap size={20} className="stat-icon" />
              <div>
                <div className="stat-value">{stats.tps}</div>
                <div className="stat-label">Transactions/sec</div>
              </div>
            </div>
            <div className="stat-box">
              <Clock size={20} className="stat-icon" />
              <div>
                <div className="stat-value">{stats.avgResponseTime}ms</div>
                <div className="stat-label">Avg Response</div>
              </div>
            </div>
            <div className="stat-box">
              <RefreshCw size={20} className="stat-icon" />
              <div>
                <div className="stat-value">{stats.activeSessions}</div>
                <div className="stat-label">Active Sessions</div>
              </div>
            </div>
            <div className="stat-box">
              <AlertCircle size={20} className="stat-icon" />
              <div>
                <div className="stat-value">{stats.blockedAttempts}</div>
                <div className="stat-label">Blocked Today</div>
              </div>
            </div>
          </div>

          {/* Live Transactions Table */}
          <div className="transactions-panel">
            <div className="panel-header">
              <h3>Live Transaction Stream</h3>
              <div className="stream-indicator">
                <div className="stream-dot"></div>
                Streaming
              </div>
            </div>
            <div className="transactions-list">
              {liveTransactions.map((tx, index) => (
                <div key={index} className={`transaction-row ${tx.status}`}>
                  <div className="tx-time">
                    <Clock size={12} />
                    {tx.timestamp}
                  </div>
                  <div className="tx-id">{tx.id}</div>
                  <div className="tx-amount">${tx.amount.toLocaleString()}</div>
                  <div className="tx-location">
                    <MapPin size={12} />
                    {tx.location}
                  </div>
                  <div className="tx-card">{tx.cardType}</div>
                  <div className="tx-risk">
                    <div className="risk-indicator">
                      <div className="risk-bar-live" style={{ width: `${tx.risk}%`, background: getRiskColor(tx.risk) }}></div>
                      <span>{tx.risk}%</span>
                    </div>
                  </div>
                  <div className="tx-status">
                    <span className="status-badge-live" style={{ background: `${getStatusColor(tx.status)}20`, color: getStatusColor(tx.status) }}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveMonitor;