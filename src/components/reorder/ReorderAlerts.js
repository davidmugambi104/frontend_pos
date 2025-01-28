import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReorderAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReorderAlerts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/reorder-alerts', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setAlerts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch reorder alerts.');
        setLoading(false);
      }
    };
    fetchReorderAlerts();
  }, []);

  if (loading) return <div>Loading reorder alerts...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Reorder Alerts</h2>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Stock Quantity</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.stock_quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReorderAlerts;
