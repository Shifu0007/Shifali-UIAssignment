import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import './PointsSummary.css';

/**
 * PointsSummary component displays points for all customers in a table format.
 * @param {Object} props - Component props
 * @param {Array} props.customers - List of customer points
 */
const PointsSummary = ({ customers }) => {
  const renderedRows = useMemo(() => {
    return customers.map(customer => (
      <tr key={customer.customerId}>
        <td>Customer {customer.customerId}</td>
        <td>{customer.points}</td>
      </tr>
    ));
  }, [customers]); // Only re-compute when `customers` changes

  return (
    <table className="points-summary-table">
      <thead>
        <tr>
          <th>Customer ID</th>
          <th>Points Earned</th>
        </tr>
      </thead>
      <tbody>
        {renderedRows}
      </tbody>
    </table>
  );
};

PointsSummary.propTypes = {
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.number.isRequired,
      points: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default PointsSummary;
