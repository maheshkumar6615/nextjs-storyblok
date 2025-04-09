import React from "react";

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
            <img
              src={
                product.productToPrimaryImage.startsWith("//")
                  ? `https:${product.productToPrimaryImage}`
                  : product.productToPrimaryImage
              }
              alt={product.seoName}
              className="related-product-image"
            />
            <span className="related-product-title">
              {product.webProductFullName}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;