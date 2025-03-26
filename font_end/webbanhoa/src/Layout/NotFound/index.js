import React from 'react';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Oops! Page Not Found</p>
      <p className="not-found-description">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <a href="/" className="not-found-button">
        Go Back Home
      </a>
    </div>
  );
};

export default NotFound;