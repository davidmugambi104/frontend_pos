import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import Sale from './components/Sale';
import AddSale from './components/AddSale';
import CustomerList from './components/CustomerList';
import AddCustomer from './components/AddCustomer';
import PaymentForm from './components/PaymentForm';
import Login from './components/Login';
import Header from './components/Header';
import Signup from './components/signup';

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
