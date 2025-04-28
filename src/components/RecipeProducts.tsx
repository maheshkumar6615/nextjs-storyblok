import React from "react";
import Image from "next/image";

interface RecipeProduct {
  productToPrimaryImage: string;
  seoName: string;
  stepId: string;
  webProductFullName: string;
}

interface RecipeProductsProps {
  blok: {
    ctaLabel?: string; // Optional
    ctaWebRedirect?: string; // Optional
    recipeProductLabel?: string; // Optional
    recipe?: {
      recipeProducts?: RecipeProduct[]; // Optional
    };
  };
}

const RecipeProducts = ({ blok }: RecipeProductsProps) => {
  const { ctaLabel, ctaWebRedirect, recipeProductLabel, recipe } = blok || {};
  const { recipeProducts } = recipe || {};

  return (
    <div className="recipeproducts">
      <div className="recipe-products section--in-viewport">
        <section className="section--in-viewport">
          <div className="content_wrapper recipe-products-container">
            {recipeProducts && recipeProducts.length > 0 ? (
              recipeProducts.map((product, index) => (
                <div key={index} className="recipe-product-tile">
                  <div className="recipe-product-image-container">
                    {product.productToPrimaryImage ? (
                      <Image
                        itemProp="image"
                        src={
                          product.productToPrimaryImage.startsWith("//")
                            ? `https:${product.productToPrimaryImage}`
                            : product.productToPrimaryImage
                        }
                        alt={product.webProductFullName || "Product Image"}
                        width={200}
                        height={300}
                        className="recipe-product-image"
                      />
                    ) : (
                      <p>No image available</p>
                    )}
                  </div>

                  <div className="recipe-product-content">
                    <h4>{recipeProductLabel || "Product"}</h4>
                    <h3
                      dangerouslySetInnerHTML={{
                        __html: product.webProductFullName || "Unnamed Product",
                      }}
                    ></h3>
                    {ctaWebRedirect && product.stepId ? (
                      <a
                        href={`${ctaWebRedirect}${product.stepId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button-cta button-wtb"
                      >
                        {ctaLabel || "Learn More"}
                      </a>
                    ) : (
                      <p>No link available</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default RecipeProducts;