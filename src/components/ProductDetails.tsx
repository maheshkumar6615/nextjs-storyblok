import React from "react";
import Image from "next/image";

interface ProductDetailsProps {
  image: string;
  title: string;
  description: string;
  staticContent: {
    whereToBuyCtaText: string;
  };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  image,
  title,
  description,
  staticContent
}) => {
  const imageUrl = image.startsWith("//") ? `https:${image}` : image;

  return (
    <div className="product-container flex flex-col md:flex-row items-center p-4">
      <div className="product-image md:w-1/2">
        <Image
          src={imageUrl}
          alt={title}
          height={600}
          width={600}
          className="w-full h-auto rounded"
        />
      </div>
      <div className="product-details md:w-1/2 mt-4 md:mt-0 md:ml-4 text-center md:text-left">
        <h2
          className="product-title text-2xl font-bold mb-2"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p className="product-description text-gray-700">{description}</p>
        <a href="#" className="button-cta" data-event="ps-widget-pdp">{staticContent.whereToBuyCtaText}</a>
      </div>
    </div>
  );
};

export default ProductDetails;
