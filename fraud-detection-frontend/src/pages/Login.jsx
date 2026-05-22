// pages/Login.jsx (FIXED VERSION)
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { Shield, Mail, Lock, Eye, EyeOff } from 'lucide-react';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  // Use useCallback to prevent unnecessary re-renders
  const handleEmailChange = useCallback((e) => {
    const value = e.target.value;
    setEmail(value);
    
    // Validate email format
    if (value && !value.includes('@')) {
      setEmailError('Please include an "@" in the email address');
    } else {
      setEmailError('');
    }
  }, []);

  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate email before submitting
    if (!email.includes('@')) {
      setEmailError('Please include an "@" in the email address');
      return;
    }
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-bg">
        <div className="bg-gradient"></div>
        <div className="bg-grid"></div>
      </div>
      
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <Shield size={48} className="logo-shield" />
            <h1>Trust<span>Pay</span></h1>
          </div>
          <p className="login-subtitle">Fraud Detection System</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="input-group">
            <Mail size={18} className="input-icon" />
            <input 
              type="email" 
              placeholder="Email address" 
              value={email}
              onChange={handleEmailChange}
              required
              autoComplete="off"
            />
          </div>
          {emailError && (
            <div className="error-message">
              ⚠️ {emailError}
            </div>
          )}
          
          <div className="input-group">
            <Lock size={18} className="input-icon" />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              value={password}
              onChange={handlePasswordChange}
              required
              autoComplete="current-password"
            />
            <button 
              type="button" 
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          
          <div className="login-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-link">Forgot password?</a>
          </div>
          
          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>
        
        <div className="login-footer">
          <p>Secure access for authorized personnel only</p>
          <div className="security-badge">
            <Shield size={14} />
            <span>256-bit Encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;