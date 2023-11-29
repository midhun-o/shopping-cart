import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import PrivateRoutes from './utils/PrivateRoutes';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Home from './Routes/Home';
import Login from './Routes/Login';
import Signup from './Routes/Signup';
import Cart from './Routes/Cart';
import Wishlist from './Routes/Wishlist';
import Product from './Routes/Product';
import AdminLogin from './Routes/AdminRoutes/AdminLogin';
import Dashboard from './Routes/AdminRoutes/Dashboard';
import AddProductPage from './Routes/AdminRoutes/AddProductPage';
import AdminRoutes from './utils/AdminRoutes';

const App: React.FC = function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Home />} path="/" />
          <Route element={<Product />} path="/product" />
          <Route element={<Cart />} path="/cart" />
          <Route element={<Wishlist />} path="/wishlist" />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<AddProductPage />} path="/addproduct" />
        </Route>
        <Route element={<Login />} path="/login" />
        <Route element={<AdminLogin />} path="/admin" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<ErrorPage />} path="*" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
