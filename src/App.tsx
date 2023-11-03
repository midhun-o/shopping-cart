import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import LoginForm from './components/Login/LoginForm';
import Home from './components/Products/Home';
import PrivateRoutes from './utils/PrivateRoutes';
import ProductsDisplay from './components/Products/ProductsDisplay';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomeHeader from './components/Header/HomeHeader';
import ErrorPage from './components/ErrorPage/ErrorPage';
import SignupForm from './components/Signup/SignupForm';

const App: React.FC = function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route
            element={
              <>
                <Header />
                <Home />
                <ProductsDisplay />
                <Footer />
              </>
            }
            path="/"
          />
        </Route>
        <Route
          element={
            <>
              <HomeHeader pageName="Sign Up" path="/signup" />
              <LoginForm />
              <Footer />
            </>
          }
          path="/login"
        />
        <Route
          element={
            <>
              <HomeHeader pageName="Login" path="/login" />
              <SignupForm />
              <Footer />
            </>
          }
          path="/signup"
        />
        <Route element={<ErrorPage />} path="*" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
