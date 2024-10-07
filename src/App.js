// src/App.js
import React, { useEffect, useState } from 'react';
import PointsSummary from './Components/PointsSummary';
import { fetchTransactions } from './Api/Transactions';
import { calculatePoints } from './Utils/CalculatePoints';
import './App.css';

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchTransactions();
        const pointsData = result.map(transaction => ({
          customerId: transaction.customerId,
          points: calculatePoints(transaction.amount),
        }));

        const aggregatedPoints = pointsData.reduce((acc, curr) => {
          const existingCustomer = acc.find(c => c.customerId === curr.customerId);
          if (existingCustomer) {
            existingCustomer.points += curr.points;
          } else {
            acc.push({ customerId: curr.customerId, points: curr.points });
          }
          return acc;
        }, []);
        
        setCustomers(aggregatedPoints);
      } catch (err) {
        setError(err.message);
      }
    };
    
    loadData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="my-4">Customer Reward Points</h1>
        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <PointsSummary customers={customers} />
        )}
      </header>
    </div>
  );
};

export default App;
