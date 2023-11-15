import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CartPage.css';
import { useNavigate } from 'react-router-dom';
import ButtonsContainer from '../Buttons/CartButtons/ButtonsContainer';
import axios from '../../api/axios';
import { checkout } from '../../redux/cart';
import { RootState } from '../../redux/store';

const CartPage: React.FC = function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state: RootState) => state.cart);
  function goToProduct(id: number) {
    navigate('/product', { state: { id } });
  }

  let cartTotal = 0;
  const cartLength = cartItems.length;

  cartItems.forEach((item: { price: number; quantity: number }) => {
    cartTotal += item.price * item.quantity;
  });

  const handleCheckout = async () => {
    try {
      const token: string | null = localStorage.getItem('jsonwebtoken');
      const res = await axios.post(
        'customer/checkout',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.success === true) {
        dispatch(checkout());
        navigate('/');
      }
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="cart-container">
      {cartLength === 0 ? (
        <div className="empty-cart-image-container">
          <img
            src="/other/empty-cart.webp"
            alt="empty wishlist"
            className="empty-cart-image"
          />
        </div>
      ) : (
        <div className="cart-items-container">
          {cartItems.map(
            (item: {
              id: number;
              url: string;
              name: string;
              price: number;
              quantity: number;
            }) => {
              const cartImage =
                process.env.REACT_APP_BACKEND_API_URL + item.url;
              return (
                <div className="product-card" key={item.id}>
                  <button
                    className="productimage-container"
                    type="button"
                    onClick={() => goToProduct(item.id)}
                  >
                    <img src={cartImage} alt="" className="product-image" />
                  </button>
                  <h2 className="product-head">{item.name}</h2>
                  <p className="price">Price ${item.price}</p>
                  <ButtonsContainer productId={item.id} page="cart" />
                </div>
              );
            }
          )}
        </div>
      )}
      {cartLength === 0 ? (
        ''
      ) : (
        <div className="cart-details">
          <h2 className="cart-amount">Cart Total : ${cartTotal.toFixed(2)}</h2>
          <button
            className="checkout-button"
            type="button"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
