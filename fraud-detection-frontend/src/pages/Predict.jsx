// pages/Predict.jsx (Enhanced)
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';
import './Predict.css';
import { Shield, CreditCard, DollarSign, MapPin, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';

function Predict() {
  const [darkMode, setDarkMode] = useState(true);
  const [formData, setFormData] = useState({
    amount: '',
    cardType: 'Visa',
    location: '',
    timeOfDay: '',
    transactionType: 'online'
  });
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePredict = () => {
    // Mock prediction logic
    const amount = parseFloat(formData.amount);
    let riskScore = 0;
    let riskLevel = '';
    let message = '';

    if (amount > 5000) riskScore += 40;
    else if (amount > 1000) riskScore += 20;
    else riskScore += 5;

    if (formData.location === 'international') riskScore += 25;
    else if (formData.location === 'different_city') riskScore += 15;

    if (formData.timeOfDay === 'late_night') riskScore += 20;
    else if (formData.timeOfDay === 'early_morning') riskScore += 10;

    if (formData.transactionType === 'online') riskScore += 15;

    riskScore = Math.min(riskScore, 100);

    if (riskScore > 70) {
      riskLevel = 'High Risk';
      message = 'This transaction has a high probability of being fraudulent. Immediate review recommended.';
    } else if (riskScore > 40) {
      riskLevel = 'Medium Risk';
      message = 'This transaction shows suspicious patterns. Additional verification recommended.';
    } else {
      riskLevel = 'Low Risk';
      message = 'This transaction appears legitimate based on current analysis.';
    }

    setPrediction({ riskScore, riskLevel, message });
  };

  return (
    <div className="predict-page">
      <Sidebar />
      <div className="predict-main">
        <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
        
        <div className="predict-content">
          <div className="predict-header">
            <h1 className="predict-title">Fraud Prediction</h1>
            <p className="predict-subtitle">Real-time transaction risk assessment</p>
          </div>

          <div className="predict-container">
            {/* Input Form */}
            <div className="predict-form-card">
              <h3>Transaction Details</h3>
              
              <div className="form-field">
                <label>
                  <DollarSign size={16} />
                  Transaction Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label>
                  <CreditCard size={16} />
                  Card Type
                </label>
                <select name="cardType" value={formData.cardType} onChange={handleChange}>
                  <option>Visa</option>
                  <option>Mastercard</option>
                  <option>Amex</option>
                  <option>Discover</option>
                </select>
              </div>

              <div className="form-field">
                <label>
                  <MapPin size={16} />
                  Location Type
                </label>
                <select name="location" value={formData.location} onChange={handleChange}>
                  <option value="">Select location type</option>
                  <option value="same_city">Same City</option>
                  <option value="different_city">Different City</option>
                  <option value="international">International</option>
                </select>
              </div>

              <div className="form-field">
                <label>
                  <Calendar size={16} />
                  Time of Day
                </label>
                <select name="timeOfDay" value={formData.timeOfDay} onChange={handleChange}>
                  <option value="">Select time</option>
                  <option value="morning">Morning (6AM - 12PM)</option>
                  <option value="afternoon">Afternoon (12PM - 6PM)</option>
                  <option value="evening">Evening (6PM - 12AM)</option>
                  <option value="late_night">Late Night (12AM - 6AM)</option>
                </select>
              </div>

              <div className="form-field">
                <label>
                  <Shield size={16} />
                  Transaction Type
                </label>
                <select name="transactionType" value={formData.transactionType} onChange={handleChange}>
                  <option value="online">Online</option>
                  <option value="in_store">In-Store</option>
                  <option value="atm">ATM</option>
                </select>
              </div>

              <button className="predict-btn" onClick={handlePredict}>
                Analyze Transaction
              </button>
            </div>

            {/* Results */}
            {prediction && (
              <div className="prediction-result">
                <div className="result-header">
                  <h3>Risk Assessment Result</h3>
                  <div className={`risk-score-large ${prediction.riskLevel.toLowerCase().replace(' ', '-')}`}>
                    {prediction.riskScore}%
                  </div>
                </div>
                
                <div className={`risk-indicator ${prediction.riskLevel.toLowerCase().replace(' ', '-')}`}>
                  {prediction.riskLevel === 'High Risk' ? <AlertTriangle size={24} /> : <CheckCircle size={24} />}
                  <div>
                    <h4>{prediction.riskLevel}</h4>
                    <p>{prediction.message}</p>
                  </div>
                </div>

                <div className="recommendations">
                  <h4>Recommendations</h4>
                  {prediction.riskLevel === 'High Risk' && (
                    <ul>
                      <li>Block transaction immediately</li>
                      <li>Contact cardholder for verification</li>
                      <li>Flag account for additional monitoring</li>
                      <li>File fraud report if confirmed</li>
                    </ul>
                  )}
                  {prediction.riskLevel === 'Medium Risk' && (
                    <ul>
                      <li>Request additional authentication</li>
                      <li>Send SMS verification code</li>
                      <li>Monitor for suspicious patterns</li>
                    </ul>
                  )}
                  {prediction.riskLevel === 'Low Risk' && (
                    <ul>
                      <li>Approve transaction</li>
                      <li>Continue normal monitoring</li>
                      <li>Update trust score</li>
                    </ul>
                  )}
                </div>

                <button className="action-button">
                  {prediction.riskLevel === 'High Risk' ? 'Block Transaction' : 'Approve Transaction'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Predict;