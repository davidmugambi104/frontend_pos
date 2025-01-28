const API_BASE_URL = 'http://127.0.0.1:5000'; // Adjust if necessary

// Add Customer
// export const addCustomer = async (customerData) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/addcustomer`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(customerData),
//     });
//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.message || 'Something went wrong.');
//     }
//     return await response.json(); // Handle the response
//   } catch (error) {
//     console.error('Error adding customer:', error);
//     throw error;
//   }
// };

// Add Product
export const addProduct = async (productData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/add-product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};
export const addSale = async (saleData) => {
  try {
    // Get the JWT token from localStorage
    const token = localStorage.getItem('token'); 
    
    if (!token) {
      throw new Error('Token is missing!');
    }

    // Make the API call to add the sale
    const response = await fetch(`${API_BASE_URL}/add-sale`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the header
      },
      body: JSON.stringify(saleData),
    });

    // Handle unsuccessful response
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong.');
    }

    // Return the response JSON if successful
    return await response.json();
  } catch (error) {
    console.error('Error adding sale:', error);
    throw error;  // Throw error to handle it in the component
  }
};


export const addPayment = async (paymentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/add-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong.');
    }

    return await response.json();
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};


// Fetch Customers
export const getCustomers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/customers`);
    if (!response.ok) {
      throw new Error('Failed to fetch customers.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

// Fetch Products
export const getProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Fetch Sales
export const getSales = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/sales`);
    if (!response.ok) {
      throw new Error('Failed to fetch sales.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching sales:', error);
    throw error;
  }
};

// Delete Product
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const addCustomer = async (customerData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/addcustomer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong.');
    }

    return await response.json(); // Handle the response
  } catch (error) {
    console.error('Error adding customer:', error);
    throw error;
  }
};

export const addInventoryTransaction = async (transactionData) => {
  try {
    const response = await fetch('http://127.0.0.1:5000/inventory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    return await response.json();
  } catch (error) {
    console.error('Error processing transaction:', error);
    throw error;
  }
};

export const getInventoryTransactions = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/inventory');
    if (!response.ok) {
      throw new Error('Failed to fetch inventory transactions');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};
