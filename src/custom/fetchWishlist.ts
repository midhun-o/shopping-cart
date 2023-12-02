import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getWishlistItems } from '../redux/wishlist';
import { fetchWishlistApi } from '../utils/api/ApiUtil';

const useFetchCartItems = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getWishlistDetails() {
      try {
        const res = await fetchWishlistApi();
        if (res.data.success === true) {
          dispatch(
            getWishlistItems({ success: true, data: res.data.wishlistItems })
          );
        }
      } catch (error) {
        getWishlistItems({ success: false });
      }
    }
    getWishlistDetails();
  }, [dispatch]);
};

export default useFetchCartItems;
