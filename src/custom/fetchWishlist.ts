import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getWishlistItems, updateError } from '../redux/wishlist';
import { fetchWishlistApi } from '../utils/api/ApiUtil';

const useFetchCartItems = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getWishlistDetails() {
      try {
        const res = await fetchWishlistApi();
        if (res.data.success === true) {
          dispatch(getWishlistItems(res.data.wishlistItems));
          dispatch(updateError(false));
        }
      } catch (error) {
        dispatch(updateError(true));
      }
    }
    getWishlistDetails();
  }, [dispatch]);
};

export default useFetchCartItems;
