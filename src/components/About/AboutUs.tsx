import React from 'react';
import './AboutUs.css';

const AboutUs: React.FC = function () {
  return (
    <div className="about-us" id="aboutus">
      <h3 className="about-head">About Us</h3>
      <p className="about-text">
        Welcome to our grocery store! We are committed to providing fresh and
        high-quality products to our customers.
      </p>
      <p className="about-text">
        With a wide range of groceries available, we strive to make your
        shopping experience convenient and enjoyable.
      </p>
      <p className="about-text">
        Our dedicated team ensures that all products meet the highest standards
        of quality and freshness.
      </p>
      <p className="about-text">
        Explore our store and discover the finest selection of fruits,
        vegetables, dairy products, meats, pantry staples, and much more.
      </p>
      <p className="about-text">
        We take pride in serving you and look forward to being your trusted
        grocery provider. Shop with us today!
      </p>
    </div>
  );
};

export default AboutUs;
