import React from 'react';
import './AddToCartButton.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/cart';
import { addToCartApi } from '../../../utils/api/ApiUtil';

interface ProductProps {
  productId: number;
}

const AddToCartButton: React.FC<ProductProps> = function ({ productId }) {
  const dispatch = useDispatch();
  async function handleAddToCart() {
    try {
      const res = await addToCartApi(productId);
      if (res.data.success === true) {
        dispatch(addToCart(res.data.productDetails[0]));
      }
    } catch (error) {
      return false;
    }
  }
  return (
    <button
      className="addtocart-button"
      type="button"
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
