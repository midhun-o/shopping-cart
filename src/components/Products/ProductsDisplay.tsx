import React from 'react';
import ProductCard from './ProductCard';
import productItems from '../../utils/productData';
import './ProductsDisplay.css';

const ProductsDisplay: React.FC = function () {
  return (
    <div className="products__container">
      {productItems.map((item) => {
        const imageLink = `productImg/${item.imageLink}.jpg`;
        return (
          <ProductCard
            key={item.id}
            title={item.productName}
            src={imageLink}
            price={item.price}
            description={item.productDescription}
          />
        );
      })}
    </div>
  );
};

export default ProductsDisplay;
