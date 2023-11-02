import React from 'react';
import './HomePage.css';

const HomePage: React.FC = function () {
  return (
    <div className="main">
      <div className="banner-container">
        <div className="bannerimage-container">
          <img src="bannerimg/banner-1.png" alt="" className="banner-image" />
        </div>
        <a className="login-button" href="/login">
          Login
        </a>
      </div>
    </div>
  );
};

export default HomePage;
