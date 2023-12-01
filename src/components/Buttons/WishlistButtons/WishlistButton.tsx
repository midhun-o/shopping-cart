import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillHeart } from 'react-icons/ai';
import { addToWishlist, removeFromWishlist } from '../../../redux/wishlist';
import './WishlistButton.css';
import { RootState } from '../../../redux/store';
import {
  addToWishlistApi,
  removeWishlistApi,
} from '../../../utils/api/ApiUtil';

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
      const res = await addToWishlistApi(productId);
      if (res.data.success === true) {
        dispatch(addToWishlist(res.data.productDetails[0]));
      }
    } catch (error) {
      return false;
    }
  }
  async function handleRemoveFromWishlist() {
    try {
      const res = await removeWishlistApi(productId);
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
