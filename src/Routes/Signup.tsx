import React from 'react';
import Footer from '../components/Footer/Footer';
import HomeHeader from '../components/Header/HomeHeader';
import SignupForm from '../components/Signup/SignupForm';

const Signup: React.FC = function () {
  return (
    <>
      <HomeHeader pageName="Login" path="/login" />
      <SignupForm />
      <Footer />
    </>
  );
};

export default Signup;
