import React from 'react';
import { useSelector } from 'react-redux';
import CartButtons from '../Buttons/CartButtons/CartButtons';

const CartPage: React.FC = function () {
  const { cartItems } = useSelector((state: any) => state.cart);
  return (
    <div className="products-container">
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
              <CartButtons productId={item.id} />
            </div>
          );
        }
      )}
    </div>
  );
};

export default CartPage;
