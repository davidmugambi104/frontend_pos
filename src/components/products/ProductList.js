import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../../services/api';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      // Remove the deleted product from the list
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      console.error('Failed to delete product', err);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Products</h2>
      <Link to="/add-product">Add Product</Link>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price} - {product.stock} in stock
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
