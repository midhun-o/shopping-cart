import React from 'react';
import Footer from '../../components/Footer/Footer';
import AddProduct from '../../components/Admin/Products/AddProduct';
import AdminHomeHeader from '../../components/Admin/Header/AdminHomeHeader';

const AddProductPage: React.FC = function () {
  return (
    <>
      <AdminHomeHeader />
      <AddProduct />
      <Footer />
    </>
  );
};

export default AddProductPage;
