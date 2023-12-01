import React from 'react';
import './UpdateCartButton.css';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillDelete } from 'react-icons/ai';
import {
  incrementItem,
  decrementItem,
  removeFromCart,
} from '../../../redux/cart';
import { RootState } from '../../../redux/store';
import {
  decrementCartApi,
  incrementCartApi,
  removeCartApi,
} from '../../../utils/api/ApiUtil';

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
      const res = await incrementCartApi(productId);
      if (res.data.success === true) {
        dispatch(incrementItem(res.data.data[0]));
      }
    } catch (error) {
      return false;
    }
  }
  async function decrementCart() {
    try {
      const res = await decrementCartApi(productId);
      if (res.data.success === true) {
        dispatch(decrementItem(res.data.data[0]));
      }
    } catch (error) {
      return false;
    }
  }
  async function removeCartItem() {
    try {
      const res = await removeCartApi(productId);
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
