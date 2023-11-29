import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';
import './Header.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Header: React.FC = function () {
  const { cartCount } = useSelector((state: RootState) => state.cart);
  const { wishlistCount } = useSelector((state: RootState) => state.wishlist);

  const handleLogout = () => {
    localStorage.removeItem('jsonwebtoken');
    localStorage.removeItem('customerDetails');
  };
  return (
    <div className="header">
      <div className="header-container">
        <Link to="/" className="app-title">
          Shopping Cart
        </Link>
        <div className="navbar">
          <ul className="nav">
            <li>
              <Link to="/cart" className="link">
                Cart
              </Link>
              <span className="cart-count">{cartCount}</span>
            </li>
            <li>
              <Link to="/wishlist" className="link">
                Wishlist
              </Link>
              <span className="cart-count">{wishlistCount}</span>
            </li>
            <li>
              <Link to="/login" className="link" onClick={handleLogout}>
                Log out &nbsp; <AiOutlineLogout />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
