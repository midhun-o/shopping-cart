import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillHeart } from 'react-icons/ai';
import { MdError } from 'react-icons/md';
import { addToWishlist, removeFromWishlist } from '../../../redux/wishlist';
import './WishlistButton.css';
import { RootState } from '../../../redux/store';
import { addToWishlistApi, removeWishlistApi } from '../../../utils/api/axios';

interface ProductProps {
  productId: number;
}

const WishlistButton: React.FC<ProductProps> = function ({ productId }) {
  const { wishlistItems } = useSelector((state: RootState) => state.wishlist);
  const itemFound = wishlistItems.find(
    (item: { id: number }) => item.id === productId
  );
  const dispatch = useDispatch();

  const [showErrorTooltip, setShowErrorTooltip] = useState<boolean>(false);

  async function handleAddToWishlist() {
    try {
      const res = await addToWishlistApi(productId);
      if (res.data.success === true) {
        setShowErrorTooltip(false);
        dispatch(
          addToWishlist({ success: true, data: res.data.productDetails[0] })
        );
      }
    } catch (error) {
      setShowErrorTooltip(true);
      dispatch(addToWishlist({ success: false }));
    }
  }

  async function handleRemoveFromWishlist() {
    try {
      const res = await removeWishlistApi(productId);
      if (res.data.success === true) {
        setShowErrorTooltip(false);
        dispatch(removeFromWishlist({ success: true, data: res.data.data }));
      }
    } catch (error) {
      setShowErrorTooltip(true);
      dispatch(removeFromWishlist({ success: false }));
    }
  }

  return (
    <div className="wishlist-button-container">
      {showErrorTooltip && (
        <span className="tooltiptext">
          Retry <MdError />
        </span>
      )}
      <div className="wishlist-button-wrapper">
        {itemFound ? (
          <button
            className="removewishlist-button"
            type="button"
            onClick={handleRemoveFromWishlist}
            onMouseEnter={() => setShowErrorTooltip(false)}
          >
            <AiFillHeart />
          </button>
        ) : (
          <button
            className="addtowishlist-button"
            type="button"
            onClick={handleAddToWishlist}
            onMouseEnter={() => setShowErrorTooltip(false)}
          >
            <AiFillHeart />
          </button>
        )}
      </div>
    </div>
  );
};

export default WishlistButton;
