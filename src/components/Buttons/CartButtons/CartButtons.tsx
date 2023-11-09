import React from 'react';
import { useSelector } from 'react-redux';
import AddToCartButton from './AddToCartButton';
import UpdateCartButton from './UpdateCartButton';

interface ProductProps {
  productId: number;
}

const CartButtons: React.FC<ProductProps> = function ({ productId }) {
  const { cartItems } = useSelector((state: any) => state.cart);
  const productQuantity = cartItems.find(
    (item: { id: number }) => item.id === productId
  );
  const quantity = productQuantity ? productQuantity.quantity : null;
  return (
    <div>
      {productQuantity ? (
        <UpdateCartButton productId={productId} quantity={quantity} />
      ) : (
        <AddToCartButton productId={productId} />
      )}
    </div>
  );
};

export default CartButtons;
