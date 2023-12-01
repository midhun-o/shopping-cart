import axios from '../../api/adminAxios';

interface AdminLoginData {
  adminUsername: string;
  adminPassword: string;
}

const handleAdminLoginApi = (adminLoginData: AdminLoginData) => {
  return axios.post('/admin/login', adminLoginData);
};

const getCategoriesAndSellerApi = () => {
  return axios.get('/admin/getcategoryandseller');
};

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

const addProductsApi = (product: Product) => {
  return axios.post('/admin/addproduct', product, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const getAllProductsApi = () => {
  return axios.get('admin/fetchproduct');
};

const deleteProductsApi = (productId: number) => {
  return axios.delete(`admin/deleteproduct/${productId}`);
};

export {
  handleAdminLoginApi,
  getCategoriesAndSellerApi,
  addProductsApi,
  getAllProductsApi,
  deleteProductsApi,
};
