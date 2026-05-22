// pages/Settings.jsx (CORRECTED VERSION)
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';
import './Settings.css';
import { 
  User, Bell, Shield, Eye, Globe, 
  Mail, Lock, Smartphone, Save, RefreshCw,
  BellRing, Moon, Sun
} from 'lucide-react';

function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: true,
    fraudAlerts: true,
    dailyReport: false,
    smsAlerts: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: 30,
    loginNotifications: true,
    ipWhitelisting: false
  });

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSecurityChange = (key) => {
    setSecuritySettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
    { id: 'preferences', label: 'Preferences', icon: <Globe size={18} /> },
  ];

  return (
    <div className="settings-page">
      <Sidebar />
      <div className="settings-main">
        <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
        
        <div className="settings-content">
          <div className="settings-header">
            <h1 className="settings-title">Settings</h1>
            <p className="settings-subtitle">Manage your account preferences and security</p>
          </div>

          <div className="settings-container">
            <div className="settings-sidebar">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="settings-panel">
              {activeTab === 'profile' && (
                <div className="settings-section">
                  <h2>Profile Information</h2>
                  <p className="section-desc">Update your personal information and preferences</p>
                  
                  <div className="profile-avatar-section">
                    <div className="profile-avatar">
                      <User size={48} />
                    </div>
                    <button className="change-avatar-btn">Change Avatar</button>
                  </div>

                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" defaultValue="Admin User" className="settings-input" />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Email Address</label>
                      <input type="email" defaultValue="admin@trustpay.com" className="settings-input" />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input type="tel" defaultValue="+1 (555) 123-4567" className="settings-input" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Role</label>
                    <input type="text" defaultValue="Security Administrator" disabled className="settings-input disabled" />
                  </div>

                  <button className="save-settings-btn">
                    <Save size={16} />
                    Save Changes
                  </button>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="settings-section">
                  <h2>Notification Preferences</h2>
                  <p className="section-desc">Choose how you want to receive alerts</p>

                  <div className="notification-option">
                    <div className="option-info">
                      <Mail size={20} />
                      <div>
                        <h4>Email Alerts</h4>
                        <p>Receive fraud alerts via email</p>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={notifications.emailAlerts}
                        onChange={() => handleNotificationChange('emailAlerts')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="notification-option">
                    <div className="option-info">
                      <BellRing size={20} />
                      <div>
                        <h4>Push Notifications</h4>
                        <p>Real-time push notifications on your device</p>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={notifications.pushNotifications}
                        onChange={() => handleNotificationChange('pushNotifications')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="notification-option">
                    <div className="option-info">
                      <Shield size={20} />
                      <div>
                        <h4>Fraud Alerts</h4>
                        <p>Critical fraud detection notifications</p>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={notifications.fraudAlerts}
                        onChange={() => handleNotificationChange('fraudAlerts')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="notification-option">
                    <div className="option-info">
                      <RefreshCw size={20} />
                      <div>
                        <h4>Daily Report</h4>
                        <p>Daily summary of fraud activity</p>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={notifications.dailyReport}
                        onChange={() => handleNotificationChange('dailyReport')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="notification-option">
                    <div className="option-info">
                      <Smartphone size={20} />
                      <div>
                        <h4>SMS Alerts</h4>
                        <p>Text message alerts for critical events</p>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={notifications.smsAlerts}
                        onChange={() => handleNotificationChange('smsAlerts')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="settings-section">
                  <h2>Security Settings</h2>
                  <p className="section-desc">Manage your security preferences</p>

                  <div className="notification-option">
                    <div className="option-info">
                      <Lock size={20} />
                      <div>
                        <h4>Two-Factor Authentication</h4>
                        <p>Add an extra layer of security to your account</p>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={securitySettings.twoFactorAuth}
                        onChange={() => handleSecurityChange('twoFactorAuth')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="notification-option">
                    <div className="option-info">
                      <Bell size={20} />
                      <div>
                        <h4>Login Notifications</h4>
                        <p>Get notified when someone logs into your account</p>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={securitySettings.loginNotifications}
                        onChange={() => handleSecurityChange('loginNotifications')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="notification-option">
                    <div className="option-info">
                      <Eye size={20} />
                      <div>
                        <h4>IP Whitelisting</h4>
                        <p>Restrict access to specific IP addresses</p>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={securitySettings.ipWhitelisting}
                        onChange={() => handleSecurityChange('ipWhitelisting')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="form-group">
                    <label>Session Timeout (minutes)</label>
                    <input 
                      type="number" 
                      defaultValue={securitySettings.sessionTimeout}
                      className="settings-input"
                    />
                  </div>

                  <button className="save-settings-btn">
                    <Save size={16} />
                    Update Security Settings
                  </button>

                  <div className="danger-zone">
                    <h4>Danger Zone</h4>
                    <button className="danger-btn">Delete Account</button>
                  </div>
                </div>
              )}

              {activeTab === 'preferences' && (
                <div className="settings-section">
                  <h2>App Preferences</h2>
                  <p className="section-desc">Customize your experience</p>

                  <div className="notification-option">
                    <div className="option-info">
                      {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                      <div>
                        <h4>Dark Mode</h4>
                        <p>Toggle between light and dark theme</p>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="form-group">
                    <label>Language</label>
                    <select className="settings-select">
                      <option>English (US)</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Time Zone</label>
                    <select className="settings-select">
                      <option>Eastern Time (ET)</option>
                      <option>Central Time (CT)</option>
                      <option>Mountain Time (MT)</option>
                      <option>Pacific Time (PT)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Date Format</label>
                    <select className="settings-select">
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;