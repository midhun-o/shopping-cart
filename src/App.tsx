import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LoginForm from './components/Login/LoginForm';
import ProductsDisplay from './components/Products/ProductsDisplay';
import HomePage from './components/HomePage/HomePage';

const App: React.FC = function () {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/products" element={<ProductsDisplay />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
