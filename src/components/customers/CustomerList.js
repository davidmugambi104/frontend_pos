import React, { useState, useEffect } from 'react';
import { getCustomers } from '../../services/api';
import { Link } from 'react-router-dom';
import './styles.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const customerData = await getCustomers();
      setCustomers(customerData);
    };
    fetchCustomers();
  }, []);

  return (
    <div className="container">
      <h2>Customer List</h2>
      <Link to="/add-customer" className="submit-btn">Add Customer</Link>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            {customer.name} - {customer.email} - {customer.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
