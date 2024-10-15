import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import ButtonsContainer from '../Buttons/CartButtons/ButtonsContainer';
import WishlistButton from '../Buttons/WishlistButtons/WishlistButton';

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
        const token: string | null = localStorage.getItem('jsonwebtoken');
        const res = await axios.get('products/getcategories', {
          headers: { Authorization: `Bearer ${token}` },
        });
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
        const token: string | null = localStorage.getItem('jsonwebtoken');
        const res = await axios.get(
          `products/search?page=${pageNumber}&search=${searchString}&category=${categoryId}&sort=${sort}&type=${type}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
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
<div className="flex flex-wrap items-center justify-between max-w-full mx-auto bg-gray-200 sticky top-24 z-10 p-4 gap-4">
  <div className="w-full lg:w-auto">
    <input
      type="text"
      id="search"
      className="h-12 w-full lg:w-[500px] text-sm px-5 border border-gray-400 rounded-full"
      placeholder="Search here..."
      onChange={handleSearch}
    />
  </div>

  <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 w-full lg:w-auto">
    <select
      id="sortId"
      className="w-full lg:w-52 h-12 p-3 border border-gray-400 rounded-md"
      onChange={handleSortChange}
    >
      <option value="">Sort by</option>
      <option value="1">Price: Low to high</option>
      <option value="2">Price: High to Low</option>
    </select>

    <select
      id="categoryId"
      className="w-full lg:w-52 h-12 p-3 border border-gray-400 rounded-md"
      onChange={handleCategoryChange}
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
        <div className="flex items-center justify-center max-w-screen-xl mx-auto min-h-[600px]">
          <h2 className="text-gray-500 text-3xl">No products Found</h2>
        </div>
      ) : (
        <div className="max-w-screen-xl min-h-[600px] mx-auto flex flex-wrap justify-center items-baseline gap-2 p-5">
          {productItems.map((item: { id: number; url: string; name: string; price: number; }) => {
            const imageLink = process.env.REACT_APP_BACKEND_API_URL + item.url;
            return (
              <div className="w-[300px] h-[300px] bg-white p-5 flex flex-col items-center gap-2 shadow-md hover:scale-105 transition-transform duration-200" key={item.id}>
                <WishlistButton productId={item.id} />
                <h2 className="text-lg text-center">{item.name}</h2>
                <button
                  className="flex justify-center items-center w-[75px] h-[75px] cursor-pointer"
                  type="button"
                  onClick={() => goToProduct(item.id)}
                >
                  <img
                    src={imageLink}
                    alt={item.name}
                    className="max-w-full h-24 object-cover"
                  />
                </button>
                <p className="font-bold mt-3">Price ${item.price}</p>
                <ButtonsContainer productId={item.id} page="products" />
              </div>
            );
          })}
        </div>
      )}

      <div className="flex justify-center items-center mb-5">
        {pageNumber > 0 && (
          <button
            className="bg-green-500 text-white font-bold py-2 px-4 mx-2 cursor-pointer"
            type="button"
            onClick={previousPage}
          >
            &#60; Prev
          </button>
        )}
        {pageNumberArray.map((number: number) => (
          <button
            className="bg-green-500 text-white font-bold py-2 px-4 mx-2 cursor-pointer"
            key={number}
            type="button"
            onClick={() => gotoPage(number)}
          >
            {number + 1}
          </button>
        ))}
        {pageNumber < pageNumberArray.slice(-1)[0] && pageNumberArray.length > 0 && (
          <button
            className="bg-green-500 text-white font-bold py-2 px-4 mx-2 cursor-pointer"
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
