import React from 'react';
import Footer from '../../components/Footer/Footer';
import AdminLogin from '../../components/Admin/Login/AdminLogin';
import AdminHeader from '../../components/Header/AdminHeader';

const Login: React.FC = function () {
  return (
    <>
      <AdminHeader />
      <AdminLogin />
      <Footer />
    </>
  );
};

export default Login;
