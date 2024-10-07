import React from 'react';
import { render, screen } from '@testing-library/react';
import PointsSummary from './PointsSummary';

test('displays all customer points in a table format', () => {
  const customers = [
    { customerId: 1, points: 90 },
    { customerId: 2, points: 150 },
  ];
  
  render(<PointsSummary customers={customers} />);
  
  expect(screen.getByText(/Customer ID/i)).toBeInTheDocument();
  expect(screen.getByText(/Points Earned/i)).toBeInTheDocument();
  expect(screen.getByText(/Customer 1/i)).toBeInTheDocument();
  expect(screen.getByText(/90/i)).toBeInTheDocument();
  expect(screen.getByText(/Customer 2/i)).toBeInTheDocument();
  expect(screen.getByText(/150/i)).toBeInTheDocument();
});
