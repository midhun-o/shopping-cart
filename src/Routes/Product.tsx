import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ViewProduct from '../components/Products/ViewProduct';

const Product: React.FC = function () {
  return (
    <>
      <Header />
      <ViewProduct />
      <Footer />
    </>
  );
};

export default Product;
