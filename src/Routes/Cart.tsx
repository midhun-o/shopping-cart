import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import CartPage from '../components/Cart/CartPage';

const Cart: React.FC = function () {
  return (
    <>
      <Header />
      <CartPage />
      <Footer />
    </>
  );
};

export default Cart;
