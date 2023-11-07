import React from 'react';
import Footer from '../components/Footer/Footer';
import HomeHeader from '../components/Header/HomeHeader';
import LoginForm from '../components/Login/LoginForm';

const Login: React.FC = function () {
  return (
    <>
      <HomeHeader pageName="Sign Up" path="/signup" />
      <LoginForm />
      <Footer />
    </>
  );
};

export default Login;
