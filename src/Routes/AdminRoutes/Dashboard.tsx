import React from 'react';
import Footer from '../../components/Footer/Footer';
import ViewProducts from '../../components/Admin/Products/ViewProducts';
import AdminHomeHeader from '../../components/Admin/Header/AdminHomeHeader';

const Dashboard: React.FC = function () {
  return (
    <>
      <AdminHomeHeader />
      <ViewProducts />
      <Footer />
    </>
  );
};

export default Dashboard;
