import React from 'react';
import Header from '../components/Header/Header';
import Banner from '../components/Products/Banner';
import Footer from '../components/Footer/Footer';
import ProductsDisplay from '../components/Products/ProductsDisplay';
import Welcome from '../components/Products/Welcome';

const Home: React.FC = function () {
  return (
    <>
      <Header />
      <Banner />
      <Welcome />
      <ProductsDisplay />
      <Footer />
    </>
  );
};

export default Home;
