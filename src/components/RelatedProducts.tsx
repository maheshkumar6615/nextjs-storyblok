import React from "react";
import Image from "next/image";

interface RelatedProduct {
  productToPrimaryImage: string;
  seoName: string;
  webProductFullName: string;
}

interface RelatedProductsProps {
  relatedProducts: RelatedProduct[];
  staticContent: {
    relatedProductsTitle: string;
    maxRelatedProducts: number;
  };
}

const RelatedProducts = ({ relatedProducts, staticContent }: RelatedProductsProps) => {
  const displayedProducts = relatedProducts.slice(0, staticContent.maxRelatedProducts);

  return (
    <div className="related-products">
      <h2>{staticContent.relatedProductsTitle}</h2>
      <div className="related-products-grid">
        {displayedProducts.map((product, index) => (
          <a
            key={index}
            href={`${product.seoName}`}
            className="related-product-card"
          >
            <div className="related-product-image-wrapper">
              <Image
                src={
                  product.productToPrimaryImage.startsWith("//")
                    ? `https:${product.productToPrimaryImage}`
                    : product.productToPrimaryImage
                }
                alt={product.webProductFullName || "Related Product"}
                className="related-product-image"
                width={300} 
                height={300}
                layout="responsive"
              />
            </div>
            <span
              className="related-product-title"
              dangerouslySetInnerHTML={{ __html: product.webProductFullName || "Unnamed product" }}
            ></span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;