// src/pages/Dashboard.jsx - Clean version
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';
import StatCard from '../components/StatCard/StatCard';
import { useFraud } from '../contexts/FraudContext';
import './Dashboard.css';
import { 
  CreditCard, AlertCircle, Shield, DollarSign, 
  Zap, RefreshCw 
} from 'lucide-react';
import {
  AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

function Dashboard() {
  const [darkMode, setDarkMode] = useState(true);
  const { stats, transactions, alerts, analytics, loading, error, isBackendConnected, refreshData } = useFraud();
  const [liveRisk, setLiveRisk] = useState(0);

  useEffect(() => {
    if (stats?.currentRiskLevel) {
      setLiveRisk(stats.currentRiskLevel);
    }
  }, [stats]);

  if (loading && !stats) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-main">
          <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading AI Model Data...</p>
          </div>
        </div>
      </div>
    );
  }

  const fraudTrends = analytics?.fraudTrends || [];
  const riskDistribution = analytics?.riskDistribution || [
    { name: 'Critical Risk', value: 0, color: '#dc2626' },
    { name: 'High Risk', value: 0, color: '#ef4444' },
    { name: 'Medium Risk', value: 0, color: '#f59e0b' },
    { name: 'Low Risk', value: 0, color: '#10b981' }
  ];

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-main">
        <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
        
        <div className="dashboard-content">
          {/* Connection Status */}
          <div className={`connection-status ${isBackendConnected ? 'connected' : 'disconnected'}`}>
            <div className="status-dot"></div>
            <span>{isBackendConnected ? '✅ AI Model Connected' : '⚠️ Connecting to AI Model...'}</span>
          </div>

          {/* Dataset Info Banner */}
          {analytics && (
            <div className="dataset-banner">
              <Shield size={16} />
              <span>
                AI Model Trained on {analytics.totalTransactions?.toLocaleString()} Transactions | 
                Fraud Rate: {analytics.fraudRate}% | 
                Model Accuracy: {(analytics.modelPerformance?.accuracy * 100).toFixed(1)}%
              </span>
            </div>
          )}

          {/* Welcome Section */}
          <div className="welcome-section">
            <div>
              <h1 className="welcome-title">Fraud Detection Dashboard</h1>
              <p className="welcome-subtitle">AI-powered real-time fraud detection</p>
            </div>
            <div className="live-risk-badge">
              <Zap size={16} />
              <span>Live Risk Score: {liveRisk}%</span>
              <div className="risk-bar">
                <div className="risk-fill" style={{ width: `${liveRisk}%` }}></div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            <StatCard 
              title="Total Transactions" 
              value={stats?.totalTransactions?.toLocaleString() || '0'} 
              icon={<CreditCard size={24} />}
              color="#6366f1"
              trend="up"
              trendValue={`+${stats?.transactionGrowth || 0}%`}
            />
            <StatCard 
              title="Flagged Transactions" 
              value={stats?.flaggedTransactions?.toLocaleString() || '0'} 
              icon={<AlertCircle size={24} />}
              color="#ef4444"
              trend="up"
              trendValue={`+${stats?.flaggedGrowth || 0}%`}
            />
            <StatCard 
              title="AI Detection Rate" 
              value={`${stats?.fraudDetectionRate || 0}%`} 
              icon={<Shield size={24} />}
              color="#10b981"
              trend="up"
              trendValue={`+${stats?.accuracyImprovement || 0}%`}
            />
            <StatCard 
              title="Amount Saved" 
              value={`$${((stats?.amountSaved || 0) / 1000000).toFixed(1)}M`} 
              icon={<DollarSign size={24} />}
              color="#f59e0b"
              trend="up"
              trendValue={`+${stats?.savingsGrowth || 0}%`}
            />
          </div>

          {/* Model Performance Stats */}
          {stats && (
            <div className="model-stats">
              <div className="model-stat-card">
                <div className="model-stat-label">Model Accuracy</div>
                <div className="model-stat-value">{stats.modelAccuracy}%</div>
                <div className="model-stat-bar">
                  <div className="model-stat-fill" style={{ width: `${stats.modelAccuracy}%` }}></div>
                </div>
              </div>
              <div className="model-stat-card">
                <div className="model-stat-label">Model Precision</div>
                <div className="model-stat-value">{stats.modelPrecision}%</div>
                <div className="model-stat-bar">
                  <div className="model-stat-fill" style={{ width: `${stats.modelPrecision}%` }}></div>
                </div>
              </div>
              <div className="model-stat-card">
                <div className="model-stat-label">Fraud Rate</div>
                <div className="model-stat-value">{stats.fraudRate}%</div>
                <div className="model-stat-bar">
                  <div className="model-stat-fill" style={{ width: `${stats.fraudRate * 10}%`, background: '#f59e0b' }}></div>
                </div>
              </div>
            </div>
          )}

          {/* Charts Section */}
          <div className="charts-row">
            <div className="chart-card large">
              <div className="chart-header">
                <h3>Fraud Detection Trends</h3>
                <button className="refresh-btn-small" onClick={refreshData}>
                  <RefreshCw size={14} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={fraudTrends}>
                  <defs>
                    <linearGradient id="fraudGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="hour" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: '#1a1f2e', border: 'none', borderRadius: '12px' }} />
                  <Area type="monotone" dataKey="fraud_rate" stroke="#ef4444" fill="url(#fraudGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h3>Risk Distribution</h3>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={riskDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {riskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="pie-legend">
                {riskDistribution.map((item, i) => (
                  <div key={i} className="legend-item">
                    <div className="legend-color" style={{ background: item.color }}></div>
                    <span>{item.name}</span>
                    <span className="legend-value">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;