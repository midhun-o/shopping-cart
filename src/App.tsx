import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import PrivateRoutes from './utils/PrivateRoutes';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Home from './Routes/Home';
import Login from './Routes/Login';
import Signup from './Routes/Signup';
import Cart from './Routes/Cart';

const App: React.FC = function () {
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
