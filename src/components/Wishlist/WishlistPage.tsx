import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WishlistButton from '../Buttons/WishlistButtons/WishlistButton';

const WishlistPage: React.FC = function () {
  const navigate = useNavigate();
  
  function goToProduct(id: number) {
    navigate('/product', { state: { id } });
  }

  const { wishlistItems } = useSelector((state: any) => state.wishlist);
  const wishlistLength = wishlistItems.length;

  return (
    <div className="mx-auto py-[150px] min-h-[90vh] pb-[100px] flex items-start justify-center">
      {wishlistLength === 0 ? (
        <div className="flex justify-center items-center max-w-[500px] p-[75px]">
          <img
            src="/other/empty-wishlist.png"
            alt="empty wishlist"
            className="max-w-full"
          />
        </div>
      ) : (
        <div className="max-w-[1350px] flex flex-wrap justify-center gap-4">
          {wishlistItems.map(
            (item: {
              key: React.Key | null | undefined;
              id: number;
              url: string;
              name: string;
              price: number;
            }) => {
              const wishlistImage =
                process.env.REACT_APP_BACKEND_API_URL + item.url;

              return (
                <div
                  className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col items-center transition-transform hover:scale-105 w-72 h-auto" // Set card width and height to auto
                  key={item.id}
                >
                  <button
                    type="button"
                    onClick={() => goToProduct(item.id)}
                    className="block w-full"
                  >
                    <img
                      src={wishlistImage}
                      alt={item.name}
                      className="w-full h-40 object-cover" // Set a consistent height for images
                    />
                  </button>
                  <div className="p-4 flex flex-col">
                    <h2 className="text-md font-semibold text-center">{item.name}</h2> 
                    <p className="text-md font-semibold text-black text-center">Price ${item.price}</p> 
                    <div className="mt-2"> 
                      <WishlistButton productId={item.id} />
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
