import React from 'react';
import BounceSpinner from 'react-spinners/BounceLoader';

const LoadingSpinner = ({ text }) => {
  return (
    <div className="container">
      <p className="has-text-centered mt-6 has-text-weight-bold">{text}</p>
      <BounceSpinner color="#00D1B2" css="margin: 0 auto" />
    </div>
  );
};

export default LoadingSpinner;
