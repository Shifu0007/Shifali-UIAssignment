// App.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { fetchTransactions } from './Api/Transactions';
import { calculatePoints } from './Utils/CalculatePoints';

// Mock the API function and utility function
jest.mock('./Api/Transactions');
jest.mock('./Utils/CalculatePoints');

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders error message when fetch fails', async () => {
    fetchTransactions.mockRejectedValue(new Error('Failed to fetch'));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
    });
  });

  test('renders PointsSummary when data is fetched successfully', async () => {
    const mockTransactions = [
      { customerId: 1, amount: 100 },
      { customerId: 2, amount: 200 },
    ];
    
    fetchTransactions.mockResolvedValue(mockTransactions);
    calculatePoints.mockImplementation(amount => amount * 0.1); // Example point calculation

    render(<App />);

    // Wait for the loading to finish and check if the PointsSummary is rendered
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    // Check for customer points
    expect(screen.getByText(/customer 1/i)).toBeInTheDocument();
    expect(screen.getByText(/customer 2/i)).toBeInTheDocument();
    expect(screen.getByText(/10/i)).toBeInTheDocument(); // 10 points for customer 1
    expect(screen.getByText(/20/i)).toBeInTheDocument(); // 20 points for customer 2
  });

  test('aggregates points for the same customer', async () => {
    const mockTransactions = [
      { customerId: 1, amount: 100 },
      { customerId: 1, amount: 200 },
    ];
    
    fetchTransactions.mockResolvedValue(mockTransactions);
    calculatePoints.mockImplementation(amount => amount * 0.1); // Example point calculation

    render(<App />);

    // Wait for the loading to finish and check if the PointsSummary is rendered
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    // Check for aggregated points
    expect(screen.getByText(/customer 1/i)).toBeInTheDocument();
    expect(screen.getByText(/30/i)).toBeInTheDocument(); // Total points for customer 1 (10 + 20)
  });
});
