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
          key: React.Key | null | undefined;
          id: number;
          url: string;
          name: string;
          price: number;
          quantity: number | null;
        }) => {
          const imageLink = process.env.REACT_APP_BACKEND_API_URL + item.url;
          return (
            <ProductCard
              key={item.key}
              pid={item.id}
              title={item.name}
              src={imageLink}
              price={item.price}
              page="products"
              quantity={null}
            />
          );
        }
      )}
    </div>
  );
};

export default ProductsDisplay;
