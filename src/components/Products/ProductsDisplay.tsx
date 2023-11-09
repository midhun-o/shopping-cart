import React, { useState, useEffect } from 'react';
import './ProductsDisplay.css';
import axios from '../../api/axios';
import CartButtons from '../Buttons/CartButtons/CartButtons';

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
        }) => {
          const imageLink = process.env.REACT_APP_BACKEND_API_URL + item.url;
          return (
            <div className="product-card" key={item.id}>
              <h2 className="product-head">{item.name}</h2>
              <div className="productimage-container">
                <img src={imageLink} alt="" className="product-image" />
              </div>
              <p className="price">Price ${item.price}</p>
              <CartButtons productId={item.id} />
            </div>
          );
        }
      )}
    </div>
  );
};

export default ProductsDisplay;
