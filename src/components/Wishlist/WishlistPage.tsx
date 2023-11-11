import React from 'react';
import { useSelector } from 'react-redux';
import './WishlistPage.css';
import WishlistButton from '../Buttons/WishlistButtons/WishlistButton';

const WishlistPage: React.FC = function () {
  const { wishlistItems } = useSelector((state: any) => state.wishlist);
  return (
    <div className="wishlist-container">
      <div className="wishlist-items-container">
        {wishlistItems.map(
          (item: {
            key: React.Key | null | undefined;
            id: number;
            url: string;
            name: string;
            price: number;
          }) => {
            const wishlistImage =
              process.env.REACT_APP_BACKEND_API_URL + item.url;
            return (
              <div className="wishlist-item" key={item.id}>
                <div className="productimage-container">
                  <img src={wishlistImage} alt="" className="product-image" />
                </div>
                <h2 className="product-head">{item.name}</h2>
                <p className="price">Price ${item.price}</p>
                <WishlistButton productId={item.id} />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
