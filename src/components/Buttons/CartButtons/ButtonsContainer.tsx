import React from 'react';
import ProductButtons from './ProductButtons';
import UpdateCartButton from './UpdateCartButton';

interface ProductProps {
  productId: number;
  page: string;
}

const ButtonsContainer: React.FC<ProductProps> = function ({
  productId,
  page,
}) {
  return page === 'products' ? (
    <ProductButtons productId={productId} />
  ) : (
    <UpdateCartButton productId={productId} />
  );
};

export default ButtonsContainer;
