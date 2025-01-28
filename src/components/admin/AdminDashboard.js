import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/dashboard', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you store JWT token in localStorage
          }
        });
        setMetrics(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch dashboard data.');
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <h3>Total Users: {metrics.total_users}</h3>
        <h3>Total Sales: ${metrics.total_sales}</h3>
        <h3>Total Products: {metrics.total_products}</h3>
      </div>
      <button onClick={() => alert('View More Stats')}>View More Stats</button>
    </div>
  );
};

export default AdminDashboard;
