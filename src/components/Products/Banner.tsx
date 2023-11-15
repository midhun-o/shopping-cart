import React, { useEffect, useState } from 'react';
import { FcNext, FcPrevious } from 'react-icons/fc';
import './Banner.css';
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
        return false;
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
  }, [bannerObj, currentBanner]);

  const handlePreviousBanner = () => {
    setCurrentBanner((prevBanner) =>
      prevBanner === 0 ? bannerObj.length - 1 : prevBanner - 1
    );
  };

  const handleNextBanner = () => {
    setCurrentBanner((prevBanner) =>
      prevBanner === bannerObj.length - 1 ? 0 : prevBanner + 1
    );
  };

  return (
    <div className="banner-container">
      <button
        className="previous-banner"
        type="button"
        onClick={handlePreviousBanner}
      >
        <FcPrevious />
      </button>
      <div className="banner-image-container">
        <img
          className="banner-image"
          src={`${process.env.REACT_APP_BACKEND_API_URL}${imageUrl}`}
          alt=""
        />
      </div>
      <button className="next-banner" type="button" onClick={handleNextBanner}>
        <FcNext />
      </button>
    </div>
  );
};

export default Banner;
