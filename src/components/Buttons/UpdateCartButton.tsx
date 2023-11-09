import React from 'react';
import './UpdateCartButton.css';

interface ProductProps {
  quantity: number | null;
}

const UpdateCartButton: React.FC<ProductProps> = function ({ quantity }) {
  return (
    <div className="updatecart-buttons-container">
      <button className="decrement-button" type="button">
        -
      </button>
      <span className="cart-item-quantity"> {quantity}</span>
      <button className="increment-button" type="button">
        +
      </button>
    </div>
  );
};

export default UpdateCartButton;
