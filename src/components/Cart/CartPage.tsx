import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CartPage.css';
import { useNavigate } from 'react-router-dom';
import ButtonsContainer from '../Buttons/CartButtons/ButtonsContainer';
import { checkout } from '../../redux/cart';
import { RootState } from '../../redux/store';
import { handleCheckoutApi } from '../../utils/api/axios';

const CartPage: React.FC = function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getCartItemsError } = useSelector(
    (state: RootState) => state.cart.cartError
  );
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
      const res = await handleCheckoutApi();
      if (res.data.success === true) {
        dispatch(checkout({ success: true }));
        navigate('/');
      }
    } catch (error) {
      return false;
    }
  };

  return getCartItemsError ? (
    <div className="cart-container">
      <h2 className="api-error-message">Error fetching data from server</h2>
    </div>
  ) : (
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
