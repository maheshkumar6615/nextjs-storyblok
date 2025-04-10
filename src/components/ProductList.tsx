import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";
import React from "react";

interface Product {
  productToPrimaryImage: string;
  seoName: string;
  stepId: string;
  webProductFullName: string;
}

interface ProductListProps {
  blok: {
    products: Product[];
    lang: string;
  };
}

const ProductList = ({ blok }: ProductListProps) => {
  const products = blok.products || [];
  return (
    <div className="content_wrapper" {...storyblokEditable(blok)}>
      <div className="products-list">
        {products.map((product) => (
          <div key={product.stepId} className="products-list-product">
            <a
              href={`/ricekrispies/${blok.lang}/products/${product.seoName}`}
              title={product.webProductFullName}
              className="track"
            >
              <div className="product-primary-image">
                <Image
                  src={
                    product.productToPrimaryImage.startsWith("//")
                      ? `https:${product.productToPrimaryImage}`
                      : product.productToPrimaryImage
                  }
                  alt={product.webProductFullName || "Product Image"}
                  width={300}
                  height={300}
                  layout="responsive"
                />
              </div>

              <div
                className="product-list-title"
                dangerouslySetInnerHTML={{ __html: product.webProductFullName }}
              ></div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;