import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from '../api/axios';
import { getWishlistItems } from '../redux/wishlist';

const useFetchCartItems = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getWishlistDetails() {
      try {
        const token: string | null = localStorage.getItem('jsonwebtoken');
        const res = await axios.get('customer/wishlist/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success === true) {
          dispatch(getWishlistItems(res.data.wishlistItems));
        }
      } catch (error) {
        return false;
      }
    }
    getWishlistDetails();
  }, [dispatch]);
};

export default useFetchCartItems;
