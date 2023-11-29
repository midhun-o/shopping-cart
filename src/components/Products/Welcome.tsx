import React from 'react';
import './Welcome.css';

const Welcome: React.FC = function () {
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

export default Welcome;
