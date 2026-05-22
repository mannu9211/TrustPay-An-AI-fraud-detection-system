// pages/Transactions.jsx (Simplified working version)
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';
import './Transactions.css';

function Transactions() {
  const [darkMode, setDarkMode] = useState(true);

  const transactions = [
    { id: 'TXN-001', amount: '$1,234', status: 'approved', date: '2024-01-15', location: 'New York, US' },
    { id: 'TXN-002', amount: '$5,678', status: 'flagged', date: '2024-01-15', location: 'London, UK' },
    { id: 'TXN-003', amount: '$12,345', status: 'blocked', date: '2024-01-14', location: 'Tokyo, JP' },
    { id: 'TXN-004', amount: '$2,345', status: 'approved', date: '2024-01-14', location: 'Paris, FR' },
    { id: 'TXN-005', amount: '$8,901', status: 'flagged', date: '2024-01-13', location: 'Sydney, AU' },
  ];

  return (
    <div className="transactions-page">
      <Sidebar />
      <div className="transactions-main">
        <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
        <div className="transactions-content">
          <div className="transactions-header">
            <h1 className="transactions-title">Transactions</h1>
            <p className="transactions-subtitle">View and manage all transactions</p>
          </div>
          <div className="transactions-table-container">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td>{tx.id}</td>
                    <td>{tx.amount}</td>
                    <td className={`status-${tx.status}`}>{tx.status}</td>
                    <td>{tx.date}</td>
                    <td>{tx.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;