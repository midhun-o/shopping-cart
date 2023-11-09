import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../api/axios';
import { getCartItems } from '../../redux/cart';

const Header: React.FC = function () {
  const { cartCount } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  async function getCartDetails() {
    try {
      const token: string | null = localStorage.getItem('jsonwebtoken');
      const res = await axios.get('customer/viewcart/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success === true) {
        dispatch(getCartItems(res.data.cartItems));
      }
    } catch (error) {
      return false;
    }
  }
  getCartDetails();
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
