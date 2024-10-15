import React from 'react';
import { useDispatch } from 'react-redux';
import axios from '../../../api/axios';
import { addToCart } from '../../../redux/cart';

interface ProductProps {
  productId: number;
}

const AddToCartButton: React.FC<ProductProps> = ({ productId }) => {
  const dispatch = useDispatch();

  async function handleAddToCart() {
    try {
      const token: string | null = localStorage.getItem('jsonwebtoken');
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
    }
  }

  return (
    <button
      className="bg-green-600 text-white font-bold py-2 px-4 rounded-md cursor-pointer hover:bg-white hover:text-green-600 hover:outline hover:outline-2 hover:outline-green-600"
      type="button"
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
