import React from 'react';

interface ProductDetailsProps {
  image: string;
  title: string;
  description: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ image, title, description }) => {
  return (
    <div className="flex flex-col md:flex-row items-center p-4 gap-4">
      <div className="w-full md:w-1/2">
        <img src={image} alt={title} className="w-full h-auto rounded-lg shadow-md" />
      </div>
      <div className="w-full md:w-1/2 flex flex-col gap-2">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;