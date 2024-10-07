import React, { useEffect, useState, useMemo } from 'react';
import PointsSummary from './Components/PointsSummary';
import { fetchTransactions } from './Api/Transactions';
import { calculatePoints } from './Utils/CalculatePoints';
import './App.css';

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null); // Reset error state before fetching

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
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Memoize the customer data to prevent unnecessary recalculations
  const memoizedCustomers = useMemo(() => customers, [customers]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="my-4">Customer Reward Points</h1>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <PointsSummary customers={memoizedCustomers} />
        )}
      </header>
    </div>
  );
};

export default App;
