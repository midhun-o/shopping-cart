import React from 'react';
import './HomePage.css';

const HomePage: React.FC = function () {
  return (
    <>
      <h1>Home Page</h1>
      <a className="home__link" href="/login">
        Login
      </a>
    </>
  );
};

export default HomePage;
