import React, { useState, useEffect } from 'react';
import './ProductsDisplay.css';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import ButtonsContainer from '../Buttons/CartButtons/ButtonsContainer';
import WishlistButton from '../Buttons/WishlistButtons/WishlistButton';

const ProductsDisplay: React.FC = function () {
  const navigate = useNavigate();
  const [productItems, setProductItems] = useState([]);
  const [pageNumber, setPageNumber] = useState<number>(0);

  function previousPage() {
    if (pageNumber > 0) {
      setPageNumber((page) => page - 1);
    } else {
      setPageNumber(0);
    }
  }

  function nextPage() {
    setPageNumber((page) => page + 1);
  }

  function goToProduct(id: number) {
    navigate('/product', { state: { id } });
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const token: string | null = localStorage.getItem('jsonwebtoken');
        const res = await axios.get(`products/getproducts?page=${pageNumber}`, {
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
  }, [pageNumber]);
  return (
    <>
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
                <WishlistButton productId={item.id} />
                <h2 className="product-head">{item.name}</h2>
                <button
                  className="productimage-container"
                  type="button"
                  onClick={() => goToProduct(item.id)}
                >
                  <img src={imageLink} alt="" className="product-image" />
                </button>
                <p className="price">Price ${item.price}</p>
                <ButtonsContainer productId={item.id} page="products" />
              </div>
            );
          }
        )}
      </div>
      <div className="pagination-container">
        <button
          className="pagination-buttons"
          type="button"
          onClick={previousPage}
        >
          &#60; Prev
        </button>
        <button className="pagination-buttons" type="button" onClick={nextPage}>
          &#62; Next
        </button>
      </div>
    </>
  );
};

export default ProductsDisplay;
