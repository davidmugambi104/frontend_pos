import React, { useState } from 'react';
import { addInventoryTransaction } from '../../services/api'; // Assuming your API helper is set up.
import '../css/styles.css';
const AddInventoryTransaction = () => {
  const [productId, setProductId] = useState('');
  const [changeQuantity, setChangeQuantity] = useState('');
  const [transactionType, setTransactionType] = useState('add');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transactionData = {
      product_id: productId,
      change_quantity: changeQuantity,
      transaction_type: transactionType,
      reason: transactionType === 'remove' ? reason : null,
    };

    try {
      await addInventoryTransaction(transactionData);
      alert('Transaction added successfully');
    } catch (error) {
      alert('Error adding transaction');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container transaction-container">
      <h2>Add Inventory Transaction</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="number"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="form-input"
          required
        />
        <input
          type="number"
          placeholder="Change Quantity"
          value={changeQuantity}
          onChange={(e) => setChangeQuantity(e.target.value)}
          className="form-input"
          required
        />
        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          className="form-input"
        >
          <option value="add">Add</option>
          <option value="remove">Remove</option>
        </select>
        {transactionType === 'remove' && (
          <input
            type="text"
            placeholder="Reason for removal"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="form-input"
            required
          />
        )}
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default AddInventoryTransaction;
