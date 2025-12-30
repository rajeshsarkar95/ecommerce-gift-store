import React from 'react';
import '../../styles/ProductSkeleton.css'; 

const ProductSkeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-text title"></div>
      <div className="skeleton-text price"></div>
      <div className="skeleton-button"></div>
    </div>
  );
};

export default ProductSkeleton;