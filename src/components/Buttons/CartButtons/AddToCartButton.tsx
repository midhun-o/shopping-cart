import React from 'react';
import './AddToCartButton.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../api/axios';
import { addToCart } from '../../../redux/cart';

interface ProductProps {
  productId: number;
}

const AddToCartButton: React.FC<ProductProps> = function ({ productId }) {
  const { jsonwebtoken } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  async function handleAddToCart() {
    try {
      const token: string | null = jsonwebtoken;
      const res = await axios.post(
        `customer/addtocart/${productId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
