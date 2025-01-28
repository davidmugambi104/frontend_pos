import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/cart', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setCartItems(response.data.cart_items);
        setTotalAmount(response.data.total_amount);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cart.');
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const checkout = async () => {
    try {
      await axios.post('http://127.0.0.1:5000/checkout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Checkout successful!');
    } catch (err) {
      setError('Checkout failed.');
    }
  };

  if (loading) return <div>Loading cart...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Your Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.product_id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price}</td>
              <td>${item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total: ${totalAmount}</h3>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
};

export default Cart;
