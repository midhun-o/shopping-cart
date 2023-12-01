import React, { useEffect, useState } from 'react';
import './AddProduct.css';
import {
  addProductsApi,
  getCategoriesAndSellerApi,
} from '../../../utils/api/AdminApiUtil';

interface Product {
  name: string;
  sku: string;
  description: string;
  price: number;
  stock: number;
  maxLimitPerOrder: number;
  categoryId: number;
  discount: number;
  sellerId: number;
  productImage: File | null;
}

interface Option {
  id: number;
  name: string;
}

const AddProduct: React.FC = function () {
  const [product, setProduct] = useState<Product>({
    name: '',
    sku: '',
    description: '',
    price: 0,
    stock: 0,
    maxLimitPerOrder: 0,
    categoryId: 0,
    discount: 0,
    sellerId: 0,
    productImage: null,
  });

  const [categories, setCategories] = useState<Option[]>([]);
  const [sellers, setSellers] = useState<Option[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchCategoryAndSeller = async () => {
      try {
        const response = await getCategoriesAndSellerApi();
        const [fetchedSellers, fetchedCategories] = response.data.products;

        setSellers(fetchedSellers);
        setCategories(fetchedCategories);
      } catch (error) {
        return false;
      }
    };

    fetchCategoryAndSeller();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setProduct({ ...product, [id]: value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setProduct({ ...product, categoryId: Number(value) });
  };

  const handleSellerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setProduct({ ...product, sellerId: Number(value) });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setProduct({ ...product, productImage: selectedFile });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await addProductsApi(product);
      if (response.data.success === true) {
        setMessage('Added Item');
        setProduct({
          name: '',
          sku: '',
          description: '',
          price: 0,
          stock: 0,
          maxLimitPerOrder: 0,
          categoryId: 0,
          discount: 0,
          sellerId: 0,
          productImage: null,
        });
      }
    } catch (err) {
      if (err) {
        setMessage('Please upload correct product details');
      }
    }
  };

  return (
    <div className="add-product">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <h3>Product Name</h3>
          <input
            type="text"
            id="name"
            value={product.name}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <h3>SKU</h3>
          <input
            type="text"
            id="sku"
            value={product.sku}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <h3>Description</h3>
          <textarea
            id="description"
            value={product.description}
            onChange={handleInputChange}
            className="textarea-field"
          />
        </div>
        <div className="form-group">
          <h3>Price</h3>
          <input
            type="number"
            id="price"
            value={product.price}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <h3>Stock</h3>
          <input
            type="number"
            id="stock"
            value={product.stock}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <h3>Max Limit Per Order</h3>
          <input
            type="number"
            id="maxLimitPerOrder"
            value={product.maxLimitPerOrder}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <h3>Select Category</h3>
          <select
            id="categoryId"
            onChange={handleCategoryChange}
            className="select-field"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <h3>Discount</h3>
          <input
            type="number"
            id="discount"
            value={product.discount}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <h3>Select Seller</h3>
          <select
            id="sellerId"
            onChange={handleSellerChange}
            className="select-field"
          >
            <option value="">Select Seller</option>
            {sellers.map((seller) => (
              <option key={seller.id} value={seller.id}>
                {seller.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <h3>Upload Product Image</h3>
          <input
            type="file"
            id="productImage"
            onChange={handleImageChange}
            className="file-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Add Product
        </button>
      </form>
      <div>{message}</div>
    </div>
  );
};

export default AddProduct;
