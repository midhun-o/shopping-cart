import React, { useState } from 'react';
import './AddToCartButton.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/cart';
import { addToCartApi } from '../../../utils/api/axios';

interface ProductProps {
  productId: number;
}

const AddToCartButton: React.FC<ProductProps> = function ({ productId }) {
  const dispatch = useDispatch();
  const [showError, setShowError] = useState<boolean>(false);
  async function handleAddToCart() {
    try {
      const res = await addToCartApi(productId);
      if (res.data.success === true) {
        dispatch(
          addToCart({ success: true, data: res.data.productDetails[0] })
        );
        setShowError(false);
      }
    } catch (error) {
      dispatch(addToCart({ success: false }));
      setShowError(true);
    }
  }
  return (
    <button
      className="addtocart-button"
      type="button"
      onClick={handleAddToCart}
    >
      {showError ? 'Retry' : 'Add To Cart'}
    </button>
  );
};

export default AddToCartButton;
