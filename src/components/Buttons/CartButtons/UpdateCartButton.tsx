import React from 'react';
import './UpdateCartButton.css';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillDelete } from 'react-icons/ai';
import axios from '../../../api/axios';
import {
  incrementItem,
  decrementItem,
  removeFromCart,
} from '../../../redux/cart';
import { RootState } from '../../../redux/store';

interface ProductProps {
  productId: number;
}

const UpdateCartButton: React.FC<ProductProps> = function ({ productId }) {
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const productQuantity = cartItems.find(
    (item: { id: number }) => item.id === productId
  );
  const quantity = productQuantity ? productQuantity.quantity : null;
  const dispatch = useDispatch();
  async function incrementCart() {
    try {
      const token: string | null = localStorage.getItem('jsonwebtoken');
      const res = await axios.post(
        `customer/increment/${productId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.success === true) {
        dispatch(incrementItem(res.data.data[0]));
      }
    } catch (error) {
      return false;
    }
  }
  async function decrementCart() {
    try {
      const token: string | null = localStorage.getItem('jsonwebtoken');
      const res = await axios.post(
        `customer/decrement/${productId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.success === true) {
        dispatch(decrementItem(res.data.data[0]));
      }
    } catch (error) {
      return false;
    }
  }
  async function removeCartItem() {
    try {
      const token: string | null = localStorage.getItem('jsonwebtoken');
      const res = await axios.post(
        `customer/removecartitem/${productId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.success === true) {
        dispatch(removeFromCart(res.data.data));
      }
    } catch (error) {
      return false;
    }
  }
  return (
    <div className="updatecart-buttons-container">
      <button
        className="decrement-button"
        type="button"
        onClick={decrementCart}
      >
        -
      </button>
      <span className="cart-item-quantity">{quantity}</span>
      <button
        className="increment-button"
        type="button"
        onClick={incrementCart}
      >
        +
      </button>
      <button
        className="remove-cart-button"
        type="button"
        onClick={removeCartItem}
      >
        <AiFillDelete />
      </button>
    </div>
  );
};

export default UpdateCartButton;
