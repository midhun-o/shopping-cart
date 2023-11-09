import React from 'react';
import './ProductCard.css';
import AddToCartButton from '../Buttons/AddToCartButton';
import UpdateCartButton from '../Buttons/UpdateCartButton';

interface ProductProps {
  pid: number;
  src: string | undefined;
  title: string;
  price: number;
  page: string;
  quantity: number | null;
}

const ProductCard: React.FC<ProductProps> = function ({
  pid,
  src,
  title,
  price,
  page,
  quantity,
}) {
  return (
    <div className="product-card">
      <h2 className="product-head">{title}</h2>
      <div className="productimage-container">
        <img src={src} alt="" className="product-image" />
      </div>
      <p className="price">Price ${price}</p>
      {page === 'products' ? (
        <AddToCartButton productId={pid} />
      ) : (
        <UpdateCartButton quantity={quantity} />
      )}
    </div>
  );
};

export default ProductCard;
