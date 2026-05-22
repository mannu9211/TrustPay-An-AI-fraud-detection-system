// components/Navbar/Navbar.jsx
import React from 'react';
import './Navbar.css';
import { Bell, User, Moon, Sun, LogOut } from 'lucide-react';

function Navbar({ darkMode, toggleDarkMode }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <div className="logo-icon">🔒</div>
          <span className="logo-text">Trust<span className="logo-highlight">Pay</span></span>
        </div>
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search transactions, users..." />
        </div>
      </div>
      <div className="navbar-right">
        <button className="nav-icon-btn" onClick={toggleDarkMode}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="nav-icon-btn">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>
        <div className="user-profile">
          <div className="user-avatar">
            <User size={18} />
          </div>
          <div className="user-info">
            <span className="user-name">Admin User</span>
            <span className="user-role">Security Officer</span>
          </div>
          <LogOut size={18} className="logout-icon" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;