import React, { useState, useEffect } from 'react';
import { getSales } from '../../services/api';
import { Link } from 'react-router-dom';
import '../css/styles.css';

const Sale = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      const salesData = await getSales();
      setSales(salesData);
    };
    fetchSales();
  }, []);

  return (
    <div className="sale-container">
      <h2>Sales List</h2>
      <Link to="/add-sale" className="add-sale-link">Add Sale</Link>
      <ul>
        {sales.map((sale) => (
          <li key={sale.id}>
            <div className="sale-info">
              <span>Sale ID:</span> {sale.id} - 
              <span> Customer:</span> {sale.customer.name} - 
              <span> Total:</span> ${sale.total_amount} - 
              <span> Payment Method:</span> {sale.payment_method}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sale;
