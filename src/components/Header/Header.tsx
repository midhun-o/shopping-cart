import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useSelector } from 'react-redux';

const Header: React.FC = function () {
  const { cartCount } = useSelector((state: any) => state.cart);

  const handleLogout = () => {
    localStorage.removeItem('jsonwebtoken');
    localStorage.removeItem('customerDetails');
  };
  return (
    <div className="header">
      <div className="header-container">
        <h1 className="app-title">Shopping Cart</h1>
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
              <span className="cart-count">{cartCount}</span>
            </li>
            <li>
              <Link to="/login" className="link" onClick={handleLogout}>
                Log out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
