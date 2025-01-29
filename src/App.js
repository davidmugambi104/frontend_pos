import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/products/ProductList';
import AddProduct from './components/products/AddProduct';
import Sale from './components/sales/Sale';
import AddSale from './components/sales/AddSale';
import CustomerList from './components/customers/CustomerList';
import AddCustomer from './components/customers/AddCustomer';
import PaymentForm from './components/payment/PaymentForm';
import Login from './components/authentification/Login';
import Signup from './components/authentification/signup';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Signup />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/sales" element={<Sale />} />
        <Route path="/add-sale" element={<AddSale />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/add-customer" element={<AddCustomer />} />
        <Route path="/payment" element={<PaymentForm />} />
      </Routes>
    </Router>
  );
};

export default App;
// import React from 'react';

// const App = () => {
//   return (
//     <div>
//       <h1>Welcome to the POS System</h1>
//     </div>
//   );
// };

// export default App;
