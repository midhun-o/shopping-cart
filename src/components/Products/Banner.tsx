import React, { useEffect, useState } from 'react';
import { FcNext, FcPrevious } from 'react-icons/fc';
import axios from '../../api/axios';

interface BannerImage {
  id: number;
  title: string;
  image_url: string;
}

const Banner: React.FC = function () {
  const [currentBanner, setCurrentBanner] = useState<number>(1);
  const [bannerObj, setBannerObj] = useState<BannerImage[]>([]);
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const token: string | null = localStorage.getItem('jsonwebtoken');
        const res = await axios.get('customer/fetchBannerImages', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBannerObj(res.data.message);
      } catch (error) {
      }
    };
    fetchBanner();
  }, []);

  useEffect(() => {
    if (bannerObj.length > 0) {
      const selectedBanner = bannerObj.find(
        (item) => item.id === currentBanner
      );
      if (selectedBanner) {
        setImageUrl(selectedBanner.image_url);
      }
    }

    const intervalId = setInterval(() => {
      setCurrentBanner((prevBanner) =>
        prevBanner === bannerObj.length ? 1 : prevBanner + 1
      );
    }, 4000);

    return () => clearInterval(intervalId);
  }, [bannerObj, currentBanner]);

  const handlePreviousBanner = () => {
    setCurrentBanner((prevBanner) =>
      prevBanner === 1 ? bannerObj.length : prevBanner - 1
    );
  };

  const handleNextBanner = () => {
    setCurrentBanner((prevBanner) =>
      prevBanner === bannerObj.length ? 1 : prevBanner + 1
    );
  };

  return (
    <div className="mx-auto pt-16 sm:pt-20 lg:pt-24 relative">
      <button
        className="absolute top-2/3 left-2 sm:left-4 transform -translate-y-1/2 
        bg-gray-200 hover:bg-gray-300 border border-gray-400 p-2 sm:p-3 
        flex justify-center items-center rounded-full shadow-md"
        type="button"
        onClick={handlePreviousBanner}
      >
        <FcPrevious className="text-xl sm:text-2xl" />
      </button>

      <div className="w-full">
        <img
          className="w-full object-fill h-[150px] sm:h-[100px] md:h-[200px] lg:h-[300px] xl:h-[400px]"
          src={`${process.env.REACT_APP_BACKEND_API_URL}${imageUrl}`}
          alt="Banner"
        />
      </div>

      <button
        className="absolute top-2/3 right-2 sm:right-4 transform -translate-y-1/2 
        bg-gray-200 hover:bg-gray-300 border border-gray-400 p-2 sm:p-3 
        flex justify-center items-center rounded-full shadow-md"
        type="button"
        onClick={handleNextBanner}
      >
        <FcNext className="text-xl sm:text-2xl" />
      </button>
    </div>
  );
};

export default Banner;
