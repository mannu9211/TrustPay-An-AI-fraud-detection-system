// components/Sidebar/Sidebar.jsx (Make sure this exports correctly)
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { 
  LayoutDashboard, 
  Activity, 
  CreditCard, 
  LineChart, 
  Settings, 
  Shield,
  AlertTriangle 
} from 'lucide-react';

function Sidebar() {
  const menuItems = [
    { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard', alert: false },
    { path: '/monitor', icon: <Activity size={20} />, label: 'Live Monitor', alert: true },
    { path: '/predict', icon: <Shield size={20} />, label: 'Fraud Predict', alert: false },
    { path: '/transactions', icon: <CreditCard size={20} />, label: 'Transactions', alert: false },
    { path: '/analytics', icon: <LineChart size={20} />, label: 'Analytics', alert: false },
    { path: '/alerts', icon: <AlertTriangle size={20} />, label: 'Alerts', alert: false },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings', alert: false },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">🛡️</div>
          <div>
            <div className="sidebar-logo-text">TrustPay</div>
            <div className="sidebar-logo-sub">Fraud Detection System</div>
          </div>
        </div>
      </div>
      <div className="sidebar-nav">
        {menuItems.map((item, index) => (
          <NavLink 
            key={index} 
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {item.alert && <span className="nav-alert">●</span>}
          </NavLink>
        ))}
      </div>
      <div className="sidebar-footer">
        <div className="system-status">
          <div className="status-dot online"></div>
          <span>System Online</span>
        </div>
        <div className="version">v2.4.1</div>
      </div>
    </div>
  );
}

export default Sidebar;