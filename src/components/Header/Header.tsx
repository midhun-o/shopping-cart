import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../api/axios';
import { getCartItems } from '../../redux/cart';
import { getWishlistItems } from '../../redux/wishlist';

const Header: React.FC = function () {
  const { cartCount } = useSelector((state: any) => state.cart);
  const { wishlistCount } = useSelector((state: any) => state.wishlist);
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlistItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getWishlistDetails() {
      try {
        const token: string | null = localStorage.getItem('jsonwebtoken');
        const res = await axios.get('customer/wishlist/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success === true) {
          setWishlistItems(res.data.wishlist);
          dispatch(getWishlistItems(res.data.wishlistItems));
        }
      } catch (error) {
        return false;
      }
    }
    getWishlistDetails();
    async function getCartDetails() {
      try {
        const token: string | null = localStorage.getItem('jsonwebtoken');
        const res = await axios.get('customer/viewcart/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success === true) {
          setCartItems(res.data.cartItems);
          dispatch(getCartItems(res.data.cartItems));
        }
      } catch (error) {
        return false;
      }
    }
    getCartDetails();
  }, [dispatch, cartItems, wishlist]);
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
                Log out <AiOutlineLogout />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
