import React from 'react';
import './ProductCard.css';
import AddToCartButton from '../Buttons/AddToCartButton';

interface ProductProps {
  src: string | undefined;
  title: string;
  price: number;
}

const ProductCard: React.FC<ProductProps> = function ({ src, title, price }) {
  return (
    <div className="product-card">
      <h2 className="product-head">{title}</h2>
      <div className="productimage-container">
        <img src={src} alt="" className="product-image" />
      </div>
      <p className="price">Price ${price}</p>
      <AddToCartButton />
    </div>
  );
};

export default ProductCard;
