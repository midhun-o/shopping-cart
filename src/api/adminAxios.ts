import axios from 'axios';

const token: string | null = localStorage.getItem('adminToken');

export default axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
  headers: { Authorization: `Bearer ${token}` },
});
