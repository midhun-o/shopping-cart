import React, { useState, useEffect } from 'react';
import './ViewProduct.css';
import { useLocation } from 'react-router-dom';
import axios from '../../api/axios';
import ProductButtons from '../Buttons/CartButtons/ProductButtons';

interface Product {
  name: string;
  description: string;
  price: string;
  category: string;
  seller: string;
  url: string;
}
const ViewProduct: React.FC = function () {
  const location = useLocation();
  const { id } = location.state;
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token: string | null = localStorage.getItem('jsonwebtoken');
        const res = await axios.get(`products/getproducts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProduct(res.data.product);
      } catch (error) {
        return false;
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="product-details-container">
      <div className="product-image-container">
        <img
          src={`${process.env.REACT_APP_BACKEND_API_URL}${product?.url}`}
          alt={product?.name}
          className="product-image"
        />
      </div>
      <div className="product-info-container">
        <h2 className="product-name">{product?.name}</h2>
        <p className="product-description">{product?.description}</p>
        <p className="product-price">${product?.price}</p>
        <p className="product-seller">Sold by:{product?.seller}</p>
        <p className="product-category">Category: {product?.category}</p>
        <ProductButtons productId={id} />
      </div>
    </div>
  );
};

export default ViewProduct;
