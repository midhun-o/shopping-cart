import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddToCartButton from './AddToCartButton';
import { RootState } from '../../../redux/store';

interface ProductProps {
  productId: number;
}

const ProductButtons: React.FC<ProductProps> = ({ productId }) => {
  const navigate = useNavigate();
  
  function gotoCart() {
    navigate('/cart');
  }

  const { cartItems } = useSelector((state: RootState) => state.cart);
  const productQuantity = cartItems.find(
    (item: { id: number }) => item.id === productId
  );

  return (
    <div>
      {productQuantity ? (
        <button
          className="bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-white hover:text-orange-500 hover:outline hover:outline-2 hover:outline-orange-500"
          type="button"
          onClick={gotoCart}
        >
          View in Cart
        </button>
      ) : (
        <AddToCartButton productId={productId} />
      )}
    </div>
  );
};

export default ProductButtons;
