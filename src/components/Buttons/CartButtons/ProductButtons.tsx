import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddToCartButton from './AddToCartButton';
import './ProductButtons.css';

interface ProductProps {
  productId: number;
}

const ProductButtons: React.FC<ProductProps> = function ({ productId }) {
  const navigate = useNavigate();
  function gotoCart() {
    navigate('/cart');
  }
  const { cartItems } = useSelector((state: any) => state.cart);
  const productQuantity = cartItems.find(
    (item: { id: number }) => item.id === productId
  );
  return (
    <div>
      {productQuantity ? (
        <button className="item-exist-product" type="button" onClick={gotoCart}>
          View in Cart
        </button>
      ) : (
        <AddToCartButton productId={productId} />
      )}
    </div>
  );
};

export default ProductButtons;
