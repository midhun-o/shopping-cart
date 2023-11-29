import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillHeart } from 'react-icons/ai';
import axios from '../../../api/axios';
import { addToWishlist, removeFromWishlist } from '../../../redux/wishlist';
import './WishlistButton.css';
import { RootState } from '../../../redux/store';

interface ProductProps {
  productId: number;
}

const WishlistButton: React.FC<ProductProps> = function ({ productId }) {
  const { wishlistItems } = useSelector((state: RootState) => state.wishlist);
  const itemFound = wishlistItems.find(
    (item: { id: number }) => item.id === productId
  );
  const dispatch = useDispatch();
  async function handleAddToWishlist() {
    try {
      const token: string | null = localStorage.getItem('jsonwebtoken');
      const res = await axios.post(
        `customer/addtowishlist/${productId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.success === true) {
        dispatch(addToWishlist(res.data.productDetails[0]));
      }
    } catch (error) {
      return false;
    }
  }
  async function handleRemoveFromWishlist() {
    try {
      const token: string | null = localStorage.getItem('jsonwebtoken');
      const res = await axios.post(
        `customer/removewishlist/${productId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.success === true) {
        dispatch(removeFromWishlist(res.data.data));
      }
    } catch (error) {
      return false;
    }
  }
  return (
    <div>
      {itemFound ? (
        <button
          className="removewishlist-button"
          type="button"
          onClick={handleRemoveFromWishlist}
        >
          <AiFillHeart />
        </button>
      ) : (
        <button
          className="addtowishlist-button"
          type="button"
          onClick={handleAddToWishlist}
        >
          <AiFillHeart />
        </button>
      )}
    </div>
  );
};

export default WishlistButton;
