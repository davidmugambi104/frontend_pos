import React, { useState, useEffect } from 'react';
import { getInventoryTransactions } from '../../services/api'; // Assuming your API helper is set up.
import './styles.css';

const InventoryTransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getInventoryTransactions();
        setTransactions(data.transactions);
      } catch (error) {
        console.error('Error fetching inventory transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="container">
      <h2>Inventory Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li 
            key={transaction.id} 
            className={transaction.transaction_type === 'add' ? 'transaction-add' : 'transaction-remove'}
          >
            {transaction.product_name} - {transaction.transaction_type} {transaction.change_quantity} items
            {transaction.transaction_type === 'remove' && ` - Reason: ${transaction.reason}`}
            <span> - {new Date(transaction.timestamp).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryTransactionList;
