// src/services/api.js - NO MOCK DATA, ONLY REAL BACKEND
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

class FraudAPI {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 15000,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async getDashboardStats() {
    const response = await this.api.get('/dashboard/stats');
    return response.data;
  }

  async getTransactions(limit = 20) {
    const response = await this.api.get('/transactions', { params: { limit } });
    return response.data;
  }

  async predictFraud(transactionData) {
    const response = await this.api.post('/predict', transactionData);
    return response.data;
  }

  async getAlerts() {
    const response = await this.api.get('/alerts');
    return response.data;
  }

  async getAnalytics() {
    const response = await this.api.get('/analytics');
    return response.data;
  }

  async getDatasetInfo() {
    const response = await this.api.get('/dataset/info');
    return response.data;
  }

  async healthCheck() {
    const response = await this.api.get('/health');
    return response.data;
  }
}

export default new FraudAPI();