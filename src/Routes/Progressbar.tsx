import React, { useState } from 'react';
import './Progressbar.css';

const ProgressBar: React.FC = function () {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    const scrolled = scrollTop + windowHeight;
    const progress = (scrolled / documentHeight) * 100;

    setScrollPercentage(progress);
  };

  document.addEventListener('scroll', handleScroll);

  return (
    <div className="progress-bar" style={{ width: `${scrollPercentage}%` }} />
  );
};

export default ProgressBar;
