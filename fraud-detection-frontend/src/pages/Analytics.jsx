// pages/Analytics.jsx
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';
import './Analytics.css';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Download, 
  Filter,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  DollarSign,
  CreditCard,
  AlertTriangle
} from 'lucide-react';
import {
  LineChart as ReLineChart,
  Line,
  BarChart as ReBarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

function Analytics() {
  const [darkMode, setDarkMode] = useState(true);
  const [timeRange, setTimeRange] = useState('week');

  // Mock data for analytics
  const monthlyData = [
    { month: 'Jan', transactions: 12450, fraud: 234, amount: 845000 },
    { month: 'Feb', transactions: 13890, fraud: 198, amount: 912000 },
    { month: 'Mar', transactions: 15670, fraud: 287, amount: 1023000 },
    { month: 'Apr', transactions: 14230, fraud: 245, amount: 978000 },
    { month: 'May', transactions: 16890, fraud: 312, amount: 1156000 },
    { month: 'Jun', transactions: 18450, fraud: 278, amount: 1289000 },
  ];

  const fraudTypeData = [
    { name: 'Card Not Present', value: 45, color: '#ef4444' },
    { name: 'Account Takeover', value: 23, color: '#f59e0b' },
    { name: 'Identity Theft', value: 18, color: '#6366f1' },
    { name: 'Money Laundering', value: 14, color: '#10b981' },
  ];

  const riskScoreDistribution = [
    { range: '0-20', count: 2340, color: '#10b981' },
    { range: '21-40', count: 1890, color: '#34d399' },
    { range: '41-60', count: 1250, color: '#fbbf24' },
    { range: '61-80', count: 890, color: '#f97316' },
    { range: '81-100', count: 430, color: '#ef4444' },
  ];

  const hourlyPattern = [
    { hour: '0', transactions: 120, fraud: 8 },
    { hour: '4', transactions: 45, fraud: 3 },
    { hour: '8', transactions: 890, fraud: 45 },
    { hour: '12', transactions: 2340, fraud: 98 },
    { hour: '16', transactions: 3450, fraud: 156 },
    { hour: '20', transactions: 2890, fraud: 134 },
  ];

  const topMerchants = [
    { name: 'Amazon', risk: 12, transactions: 3450 },
    { name: 'Walmart', risk: 8, transactions: 2890 },
    { name: 'Target', risk: 15, transactions: 2340 },
    { name: 'Best Buy', risk: 23, transactions: 1890 },
    { name: 'eBay', risk: 31, transactions: 1560 },
  ];

  const stats = [
    { 
      title: 'Total Volume', 
      value: '$8.2M', 
      change: '+23.5%', 
      trend: 'up',
      icon: <DollarSign size={20} />,
      color: '#10b981'
    },
    { 
      title: 'Avg Transaction', 
      value: '$127', 
      change: '-5.2%', 
      trend: 'down',
      icon: <CreditCard size={20} />,
      color: '#f59e0b'
    },
    { 
      title: 'Fraud Rate', 
      value: '2.3%', 
      change: '+0.8%', 
      trend: 'up',
      icon: <AlertTriangle size={20} />,
      color: '#ef4444'
    },
    { 
      title: 'Detection Accuracy', 
      value: '98.4%', 
      change: '+1.2%', 
      trend: 'up',
      icon: <Activity size={20} />,
      color: '#6366f1'
    },
  ];

  return (
    <div className="analytics-page">
      <Sidebar />
      <div className="analytics-main">
        <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
        
        <div className="analytics-content">
          {/* Header */}
          <div className="analytics-header">
            <div>
              <h1 className="analytics-title">Analytics Dashboard</h1>
              <p className="analytics-subtitle">Advanced fraud analytics & insights</p>
            </div>
            <div className="analytics-actions">
              <div className="time-range-selector">
                <button 
                  className={`range-btn ${timeRange === 'day' ? 'active' : ''}`}
                  onClick={() => setTimeRange('day')}
                >
                  Day
                </button>
                <button 
                  className={`range-btn ${timeRange === 'week' ? 'active' : ''}`}
                  onClick={() => setTimeRange('week')}
                >
                  Week
                </button>
                <button 
                  className={`range-btn ${timeRange === 'month' ? 'active' : ''}`}
                  onClick={() => setTimeRange('month')}
                >
                  Month
                </button>
                <button 
                  className={`range-btn ${timeRange === 'year' ? 'active' : ''}`}
                  onClick={() => setTimeRange('year')}
                >
                  Year
                </button>
              </div>
              <button className="export-btn">
                <Download size={16} />
                Export Report
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="analytics-stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="analytics-stat-card">
                <div className="stat-header">
                  <div className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
                    {stat.icon}
                  </div>
                  <span className="stat-change" style={{ color: stat.trend === 'up' ? '#10b981' : '#ef4444' }}>
                    {stat.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {stat.change}
                  </span>
                </div>
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-label">{stat.title}</p>
              </div>
            ))}
          </div>

          {/* Charts Row 1 */}
          <div className="charts-grid">
            <div className="chart-card">
              <div className="chart-card-header">
                <h3>Transaction Trends</h3>
                <Filter size={16} className="filter-icon" />
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="transactionsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis yAxisId="left" stroke="#94a3b8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: '#1a1f2e', border: 'none', borderRadius: '12px' }} />
                  <Legend />
                  <Area type="monotone" dataKey="transactions" stroke="#6366f1" fill="url(#transactionsGradient)" yAxisId="left" name="Transactions" />
                  <Line type="monotone" dataKey="fraud" stroke="#ef4444" yAxisId="right" name="Fraud Cases" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <div className="chart-card-header">
                <h3>Fraud Type Distribution</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <RePieChart>
                  <Pie
                    data={fraudTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {fraudTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#1a1f2e', border: 'none', borderRadius: '12px' }} />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="charts-grid">
            <div className="chart-card">
              <div className="chart-card-header">
                <h3>Risk Score Distribution</h3>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <ReBarChart data={riskScoreDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="range" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: '#1a1f2e', border: 'none', borderRadius: '12px' }} />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                    {riskScoreDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </ReBarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <div className="chart-card-header">
                <h3>Hourly Transaction Pattern</h3>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <ReLineChart data={hourlyPattern}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="hour" stroke="#94a3b8" />
                  <YAxis yAxisId="left" stroke="#94a3b8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: '#1a1f2e', border: 'none', borderRadius: '12px' }} />
                  <Line type="monotone" dataKey="transactions" stroke="#6366f1" yAxisId="left" strokeWidth={2} />
                  <Line type="monotone" dataKey="fraud" stroke="#ef4444" yAxisId="right" strokeWidth={2} />
                </ReLineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Merchants Table */}
          <div className="data-table-card">
            <div className="table-header">
              <h3>Top Merchants by Risk Score</h3>
              <button className="view-details-btn">View Details</button>
            </div>
            <div className="data-table">
              <table>
                <thead>
                  <tr>
                    <th>Merchant Name</th>
                    <th>Transactions</th>
                    <th>Risk Score</th>
                    <th>Risk Level</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {topMerchants.map((merchant, index) => (
                    <tr key={index}>
                      <td className="merchant-name">{merchant.name}</td>
                      <td>{merchant.transactions.toLocaleString()}</td>
                      <td>
                        <div className="risk-score-cell">
                          <div className="risk-bar-mini">
                            <div className="risk-fill-mini" style={{ width: `${merchant.risk}%`, background: merchant.risk > 20 ? '#ef4444' : '#f59e0b' }}></div>
                          </div>
                          <span>{merchant.risk}%</span>
                        </div>
                      </td>
                      <td>
                        <span className={`risk-level ${merchant.risk > 20 ? 'high' : 'medium'}`}>
                          {merchant.risk > 20 ? 'High Risk' : 'Medium Risk'}
                        </span>
                      </td>
                      <td>
                        <button className="investigate-btn">Investigate</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Insights Section */}
          <div className="insights-section">
            <div className="insight-card">
              <div className="insight-icon">📊</div>
              <h4>Peak Fraud Hours</h4>
              <p>Highest fraud activity detected between 2 PM - 6 PM, accounting for 34% of all cases</p>
            </div>
            <div className="insight-card">
              <div className="insight-icon">💰</div>
              <h4>Average Fraud Amount</h4>
              <p>Fraudulent transactions average $847, 42% higher than legitimate transactions</p>
            </div>
            <div className="insight-card">
              <div className="insight-icon">🌍</div>
              <h4>Geographic Hotspots</h4>
              <p>Top fraud origins: US (38%), UK (22%), Germany (15%), Australia (12%)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;