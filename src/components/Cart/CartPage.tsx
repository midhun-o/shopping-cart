import React from 'react';
import { useSelector } from 'react-redux';
import './CartPage.css';
import ButtonsContainer from '../Buttons/CartButtons/ButtonsContainer';

const CartPage: React.FC = function () {
  const { cartItems } = useSelector((state: any) => state.cart);
  return (
    <div className="cart-container">
      <div className="cart-items-container">
        {cartItems.map(
          (item: {
            key: React.Key | null | undefined;
            id: number;
            url: string;
            name: string;
            price: number;
            quantity: number;
          }) => {
            const cartImage = process.env.REACT_APP_BACKEND_API_URL + item.url;
            return (
              <div className="product-card" key={item.id}>
                <div className="productimage-container">
                  <img src={cartImage} alt="" className="product-image" />
                </div>
                <h2 className="product-head">{item.name}</h2>
                <p className="price">Price ${item.price}</p>
                <ButtonsContainer productId={item.id} page="cart" />
              </div>
            );
          }
        )}
      </div>
      <div className="cart-details">
        <h2>Cart Total : $50</h2>
        <button className="checkout-button" type="button">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
