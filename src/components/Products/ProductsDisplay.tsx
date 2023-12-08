import React, { useState, useEffect } from 'react';
import './ProductsDisplay.css';
import { useNavigate } from 'react-router-dom';
import ButtonsContainer from '../Buttons/CartButtons/ButtonsContainer';
import WishlistButton from '../Buttons/WishlistButtons/WishlistButton';
import { fetchCategories, fetchProducts } from '../../utils/api/axios';

const ProductsDisplay: React.FC = function () {
  interface Category {
    id: number;
    name: string;
  }

  const navigate = useNavigate();
  const [productItems, setProductItems] = useState([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [searchString, setSearchString] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [productCount, setProductCount] = useState<number>(0);
  const [pageNumberArray, setPageNumberArray] = useState<number[]>([]);
  const [sort, setSort] = useState<string>('p.id');
  const [type, setType] = useState<string>('low');

  function previousPage() {
    if (pageNumber > 0) {
      setPageNumber((page) => page - 1);
    } else {
      setPageNumber(0);
    }
  }

  function nextPage() {
    setPageNumber((page) =>
      page < pageNumberArray.slice(-1)[0] ? page + 1 : page
    );
  }

  function gotoPage(gotoPageNumber: number) {
    setPageNumber(gotoPageNumber);
  }

  function goToProduct(id: number) {
    navigate('/product', { state: { id } });
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchString(value);
    setPageNumber(0);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setCategoryId(value);
    setPageNumber(0);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    if (Number(value) === 1) {
      setSort('p.price');
      setType('low');
    } else if (Number(value) === 2) {
      setSort('p.price');
      setType('high');
    } else {
      setSort('p.id');
      setType('low');
    }
  };

  useEffect(() => {
    async function getcategories() {
      try {
        const res = await fetchCategories();
        if (res.data.success === true) {
          setCategories(res.data.category);
        }
      } catch (error) {
        return false;
      }
    }

    getcategories();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetchProducts(
          pageNumber,
          searchString,
          categoryId,
          sort,
          type
        );
        if (res.data.success === true) {
          setProductItems(res.data.product);
          setProductCount(res.data.productCount);
          setPageNumberArray([]);
          for (let i = 0; i < productCount / 8; i += 1) {
            setPageNumberArray((values) => [...values, i]);
          }
        }
      } catch (error) {
        return false;
      }
    }

    fetchData();
  }, [categoryId, pageNumber, productCount, searchString, sort, type]);
  return (
    <>
      <div className="option-container">
        <div className="search-box-container">
          <input
            type="text"
            id="search"
            className="search-box"
            placeholder="Search here..."
            onChange={handleSearch}
          />
        </div>
        <div className="filter-sort-container">
          <select
            id="sortId"
            className="sort-filter"
            onChange={handleSortChange}
          >
            <option value="">Sort by</option>
            <option value="1">Price: Low to high</option>
            <option value="2">Price: High to Low</option>
          </select>
          <select
            id="categoryId"
            onChange={handleCategoryChange}
            className="category-filter"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {productItems.length < 1 ? (
        <div className="no-products-found">
          <h2 className="no-products-text">No products Found</h2>
        </div>
      ) : (
        <div className="products-container">
          {productItems.map(
            (item: {
              key: number;
              id: number;
              url: string;
              name: string;
              price: number;
            }) => {
              const imageLink =
                process.env.REACT_APP_BACKEND_API_URL + item.url;
              return (
                <div className="product-card" key={item.id}>
                  <WishlistButton productId={item.id} />
                  <h2 className="product-head">{item.name}</h2>
                  <button
                    className="productimage-container"
                    type="button"
                    onClick={() => goToProduct(item.id)}
                  >
                    <img
                      src={imageLink}
                      alt={item.name}
                      className="product-image"
                    />
                  </button>
                  <p className="price">Price ${item.price}</p>
                  <ButtonsContainer productId={item.id} page="products" />
                </div>
              );
            }
          )}
        </div>
      )}

      <div className="pagination-container">
        {pageNumber === 0 ? null : (
          <button
            className="pagination-buttons"
            type="button"
            onClick={previousPage}
          >
            &#60; Prev
          </button>
        )}
        {pageNumberArray.map((number: number) => {
          return (
            <button
              className="pagination-number-buttons"
              key={number}
              type="button"
              onClick={() => gotoPage(number)}
            >
              {number + 1}
            </button>
          );
        })}
        {pageNumber === pageNumberArray.slice(-1)[0] ||
        pageNumberArray.length === 0 ? null : (
          <button
            className="pagination-buttons"
            type="button"
            onClick={nextPage}
          >
            Next &#62;
          </button>
        )}
      </div>
    </>
  );
};

export default ProductsDisplay;
