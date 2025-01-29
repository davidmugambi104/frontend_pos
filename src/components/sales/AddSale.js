import React, { useState, useEffect } from 'react';
import { addSale, getProducts, getCustomers } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import '../css/styles.css';

const AddSale = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [customerId, setCustomerId] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProducts();
      setProducts(productsData);
    };
    const fetchCustomers = async () => {
      const customersData = await getCustomers();
      setCustomers(customersData);
    };

    fetchProducts();
    fetchCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const saleData = { customerId, productId, quantity, totalAmount };

    try {
      await addSale(saleData);
      navigate('/sales');
    } catch (error) {
      console.error('Failed to add sale:', error);
      alert('Error adding sale');
    }
  };

  const handleProductChange = (e) => {
    const selectedProduct = products.find(product => product.id === parseInt(e.target.value));
    setProductId(selectedProduct.id);
    setTotalAmount(selectedProduct.price * quantity);
  };

  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);
    const selectedProduct = products.find(product => product.id === productId);
    if (selectedProduct) {
      setTotalAmount(selectedProduct.price * newQuantity);
    }
  };

  return (
    <div className="container">
      <h2>Add Sale</h2>
      <form onSubmit={handleSubmit} className="form">
        <select onChange={(e) => setCustomerId(e.target.value)} value={customerId} className="form-input" required>
          <option value="">Select Customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
        <select onChange={handleProductChange} value={productId} className="form-input" required>
          <option value="">Select Product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} - ${product.price}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          className="form-input"
          required
          min="1"
        />
        <div>Total Amount: ${totalAmount}</div>
        <button type="submit" className="submit-btn">Create Sale</button>
      </form>
    </div>
  );
};

export default AddSale;
