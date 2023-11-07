import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './ProductsDisplay.css';
import axios from '../../api/axios';

const ProductsDisplay: React.FC = function () {
  const [productItems, setProductItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const token: string | null = localStorage.getItem('jsonwebtoken');
        const res = await axios.get('products/getproducts?page=0', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success === true) {
          setProductItems(res.data.products);
        }
      } catch (error) {
        return false;
      }
    }

    fetchData();
  }, []);

  return (
    <div className="products-container">
      {productItems.map(
        (item: {
          url: string;
          id: React.Key | null | undefined;
          name: string;
          price: number;
        }) => {
          const imageLink = process.env.REACT_APP_BACKEND_API_URL + item.url;
          return (
            <ProductCard
              key={item.id}
              title={item.name}
              src={imageLink}
              price={item.price}
            />
          );
        }
      )}
    </div>
  );
};

export default ProductsDisplay;
