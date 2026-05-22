// src/contexts/FraudContext.jsx - NO MOCK DATA
import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const FraudContext = createContext();

export const useFraud = () => {
  const context = useContext(FraudContext);
  if (!context) {
    throw new Error('useFraud must be used within FraudProvider');
  }
  return context;
};

export const FraudProvider = ({ children }) => {
  const [stats, setStats] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch all data from backend
      const [statsData, transactionsData, alertsData, analyticsData] = await Promise.all([
        API.getDashboardStats(),
        API.getTransactions(20),
        API.getAlerts(),
        API.getAnalytics()
      ]);
      
      setStats(statsData);
      setTransactions(transactionsData);
      setAlerts(alertsData);
      setAnalytics(analyticsData);
      setError(null);
      setIsBackendConnected(true);
      
    } catch (err) {
      console.error('Failed to fetch from backend:', err);
      setError(`Backend not connected: ${err.message}. Please ensure the AI model server is running.`);
      setIsBackendConnected(false);
      setStats(null);
      setTransactions([]);
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  };

  const predictTransaction = async (data) => {
    try {
      const result = await API.predictFraud(data);
      return result;
    } catch (err) {
      console.error('Prediction failed:', err);
      throw new Error('AI model prediction failed. Please check backend connection.');
    }
  };

  const refreshData = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <FraudContext.Provider value={{
      stats,
      transactions,
      alerts,
      analytics,
      loading,
      error,
      isBackendConnected,
      predictTransaction,
      refreshData
    }}>
      {children}
    </FraudContext.Provider>
  );
};