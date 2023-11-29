import React from 'react';
import './ErrorPage.css';

const ErrorPage: React.FC = function () {
  return (
    <div className="error-message">
      <p>Error 404</p>
      <p>Page Not Found</p>
    </div>
  );
};

export default ErrorPage;
