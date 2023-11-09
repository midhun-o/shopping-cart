import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../Products/ProductCard';

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
          const imageLink = process.env.REACT_APP_BACKEND_API_URL + item.url;
          return (
            <ProductCard
              key={item.key}
              pid={item.id}
              title={item.name}
              src={imageLink}
              price={item.price}
              quantity={item.quantity}
              page="cart"
            />
          );
        }
      )}
    </div>
  );
};

export default CartPage;
