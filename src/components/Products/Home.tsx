import React from 'react';
import './Home.css';

const Home: React.FC = function Home() {
  interface CustomerDetailsProps {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
  }
  const customerDetails: CustomerDetailsProps | null = JSON.parse(
    localStorage.getItem('customerDetails')!
  );

  if (customerDetails) {
    return (
      <div className="user-details">
        <p>Welcome {customerDetails.first_name}</p>
      </div>
    );
  } else {
    return <p className="user-details">No Access</p>;
  }
};

export default Home;
