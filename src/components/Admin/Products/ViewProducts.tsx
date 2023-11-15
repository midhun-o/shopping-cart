import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';
import './ViewProducts.css';

interface Product {
  id: number;
  image: string;
  name: string;
  sku: string;
  category: string;
  price: string;
  stock: number;
  status: string;
  maxLimit: number;
  discount: string;
  seller: string;
  addedDate: string;
}

const ViewProducts: React.FC = function () {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const token: string | null = localStorage.getItem('adminToken');
      const res = await axios.get('admin/fetchproduct', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success === true) {
        setProducts(res.data.products);
      }
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId: number) => {
    try {
      const token: string | null = localStorage.getItem('adminToken');
      const res = await axios.delete(`admin/deleteproduct/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success === true) {
        fetchProducts();
      }
    } catch (error) {
      return false;
    }
  };

  function handleAddProduct() {
    navigate('/addproduct');
  }

  return (
    <div className="product-dashboard">
      <h1>Product Dashboard</h1>
      <button
        className="add-product-button"
        onClick={handleAddProduct}
        type="button"
      >
        Add Product
      </button>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Added Date</th>
            <th>Seller</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.sku}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.status}</td>
              <td>{product.addedDate}</td>
              <td>{product.seller}</td>
              <td className="manage-buttons">
                <button
                  className="action-button delete-button"
                  onClick={() => handleDeleteProduct(product.id)}
                  type="button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewProducts;
