import React, { useState } from 'react';
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
} from '../../../utils/api/axios';

interface ProductProps {
  productId: number;
}

const UpdateCartButton: React.FC<ProductProps> = function ({ productId }) {
  const [incrementItemError, setIncrementItemError] = useState(false);
  const [decrementItemError, setDecrementItemError] = useState(false);
  const [removeItemError, setRemoveItemError] = useState(false);
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
        dispatch(incrementItem({ success: true, data: res.data.data[0] }));
        setIncrementItemError(false);
      }
    } catch (error) {
      dispatch(incrementItem({ success: false }));
      setIncrementItemError(true);
    }
  }
  async function decrementCart() {
    try {
      const res = await decrementCartApi(productId);
      if (res.data.success === true) {
        dispatch(decrementItem({ success: true, data: res.data.data[0] }));
        setDecrementItemError(false);
      }
    } catch (error) {
      dispatch(decrementItem({ success: false }));
      setDecrementItemError(true);
    }
  }
  async function removeCartItem() {
    try {
      const res = await removeCartApi(productId);
      if (res.data.success === true) {
        dispatch(removeFromCart({ success: true, data: res.data.data }));
        setRemoveItemError(false);
      }
    } catch (error) {
      dispatch(removeFromCart({ success: false }));
      setRemoveItemError(true);
    }
  }
  return (
    <>
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
      {(incrementItemError && <div>Error in Updating Cart</div>) ||
        (decrementItemError && <div>Error in Updating Cart</div>) ||
        (removeItemError && <div>Error in Updating Cart</div>)}
    </>
  );
};

export default UpdateCartButton;
