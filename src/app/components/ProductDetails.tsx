// ProductDetails.tsx
import React from 'react';
import Image from 'next/image';

interface ProductDetailsProps {
  image: string;
  title: string;
  description: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ image, title, description }) => {
  return (
    <div className="product-container">
      <div className="product-image">
        <Image 
          src={image} 
          alt={title} 
          height={600} 
          width={600} 
          className="w-full h-auto" 
        />
      </div>
      <div className="product-details">
        <h2 className="product-title">{title}</h2>
        <p className="product-description">{description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
