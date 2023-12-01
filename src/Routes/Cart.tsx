import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import CartPage from '../components/Cart/CartPage';
import ProgressBar from './Progressbar';

const Cart: React.FC = function () {
  return (
    <>
      <ProgressBar />
      <Header />
      <CartPage />
      <Footer />
    </>
  );
};

export default Cart;
