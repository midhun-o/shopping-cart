import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { useDispatch } from 'react-redux';
import PrivateRoutes from './utils/PrivateRoutes';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Home from './Routes/Home';
import Login from './Routes/Login';
import Signup from './Routes/Signup';
import Cart from './Routes/Cart';
import axios from './api/axios';
import { getCartItems } from './redux/cart';

const App: React.FC = function () {
  const dispatch = useDispatch();
  async function getCartDetails() {
    try {
      const token: string | null = localStorage.getItem('jsonwebtoken');
      const res = await axios.get('customer/viewcart/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success === true) {
        dispatch(getCartItems(res.data.cartItems));
      }
    } catch (error) {
      return false;
    }
  }
  getCartDetails();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Home />} path="/" />
          <Route element={<Cart />} path="/cart" />
        </Route>
        <Route element={<Login />} path="/login" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<ErrorPage />} path="*" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
