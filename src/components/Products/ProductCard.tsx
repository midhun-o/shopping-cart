import React from 'react';
import './ProductCard.css';
import AddToCartButton from '../Buttons/AddToCartButton';

interface ProductProps {
  src: string | undefined;
  title: string;
  price: number;
  description: string;
}

const ProductCard: React.FC<ProductProps> = function ({
  src,
  title,
  price,
  description,
}) {
  return (
    <div className="product__card">
      <h2 className="product__head">{title}</h2>
      <div className="productimage__container">
        <img src={src} alt="" className="product__image" />
      </div>
      <p className="price">Price ₹{price}</p>
      <p className="product__description">{description}</p>
      <AddToCartButton />
    </div>
  );
};

export default ProductCard;
