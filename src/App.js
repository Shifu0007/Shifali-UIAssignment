import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { fetchTransactions } from './Api/Transactions';
import { calculatePoints } from './Utils/CalculatePoints';

// Mock the API and calculatePoints utility
jest.mock('./Api/Transactions');
jest.mock('./Utils/CalculatePoints');

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    render(<App />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test('renders error state when fetch fails', async () => {
    fetchTransactions.mockRejectedValue(new Error('Network Error'));
    
    render(<App />);

    await waitFor(() => expect(screen.getByText(/Error: Network Error/i)).toBeInTheDocument());
  });

  test('renders customer points summary when fetch is successful', async () => {
    const mockData = [
      { customerId: '1', amount: 120 },
      { customerId: '2', amount: 80 },
      { customerId: '1', amount: 50 },
    ];

    fetchTransactions.mockResolvedValue(mockData);
    calculatePoints.mockImplementation((amount) => amount > 100 ? amount - 100 : 0);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Rewards Program/i)).toBeInTheDocument();
      expect(screen.getByText(/Customer 1: 70 Points/i)).toBeInTheDocument(); // 120 - 100 + 50 - 100 = 70
      expect(screen.getByText(/Customer 2: 0 Points/i)).toBeInTheDocument(); // 80 <= 100 = 0
    });
  });
});
