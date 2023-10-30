import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = function () {
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
            <Link to="/products" className="link">
              Products
            </Link>
          </li>
          <li>
            <Link to="/cart" className="link">
              Cart
            </Link>
          </li>
          <li>
            <Link to="/contact" className="link">
              Contact US
            </Link>
          </li>
          <li>
            <Link to="/aboutus" className="link">
              About US
            </Link>
          </li>
          <li>
            <Link to="/login" className="link">
              Log out
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default Header;
