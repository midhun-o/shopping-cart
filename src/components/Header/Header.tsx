import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = function () {
  const handleLogout = () => {
    localStorage.removeItem('jsonwebtoken');
    localStorage.removeItem('customerDetails');
  };
  return (
    <div className="header__container">
      <h1 className="app__title">Shopping Cart</h1>
      <div className="navbar">
        <ul className="nav">
          <li>
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/cart" className="link">
              Cart
            </Link>
          </li>
          <li>
            <Link to="/login" className="link" onClick={handleLogout}>
              Log out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
