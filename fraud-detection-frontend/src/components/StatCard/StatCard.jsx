// components/StatCard/StatCard.jsx
import React from 'react';
import './StatCard.css';
import { TrendingUp, TrendingDown } from 'lucide-react';

function StatCard({ title, value, icon, color, trend, trendValue }) {
  const iconStyle = { background: `${color}20`, color };
  const valueStyle = { color };

  return (
    <div className="stat-card">
      <div className="stat-header">
        <div className="stat-icon" style={iconStyle}>
          {icon}
        </div>
        <span className="stat-title">{title}</span>
      </div>
      <div className="stat-body">
        <p className="stat-value" style={valueStyle}>
          {value}
        </p>
        {trend && (
          <div className={`stat-trend ${trend === 'up' ? 'trend-up' : 'trend-down'}`}>
            {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;