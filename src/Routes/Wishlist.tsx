import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import WishlistPage from '../components/Wishlist/WishlistPage';
import ProgressBar from './Progressbar';

const Cart: React.FC = function () {
  return (
    <>
      <ProgressBar />
      <Header />
      <WishlistPage />
      <Footer />
    </>
  );
};

export default Cart;
