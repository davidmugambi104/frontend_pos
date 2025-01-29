import React, { useState } from 'react';
import { addCustomer } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import '../css/styles.css';

const AddCustomer = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!name || !email || !phone) {
      alert('Please fill in all fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email');
      return;
    }

    if (!/^\d+$/.test(phone)) {
      alert('Please enter a valid phone number');
      return;
    }

    const customerData = { name, email, phone };

    setLoading(true); // Set loading to true before sending the request

    try {
      await addCustomer(customerData);
      navigate('/customers'); // Navigate to the customer list page
    } catch (error) {
      console.error('Failed to add customer:', error);
      alert('Error adding customer');
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  return (
    <div className="container add-customer-container">
      <h2>Add Customer</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-input"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="form-input"
          required
        />
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Adding Customer...' : 'Add Customer'}
        </button>
      </form>
    </div>
  );
};

export default AddCustomer;
