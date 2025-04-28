import React from "react";
import ProductDetails from "@/components/ProductDetails";
import { getStoryblokApi } from "@/lib/storyblok";
import NotFoundPage from "@/app/404";
import Nutrition from "@/components/Nutrition";
import RelatedProducts from "@/components/RelatedProducts";
import { StoryblokStory } from "@storyblok/react/rsc";

const fetchProductPage = async (slug: string) => {
  try {
    const baseUrl = process.env.AWS_IPADDRESS; 

    const productResponse = await fetch(`${baseUrl}/api/products/${slug}`);
    const productData = await productResponse.json();

    const client = getStoryblokApi();
    const productRelated = await client.get(`cdn/stories/ricekrispies/templates/product-template`, {
      version: process.env.VERSION === "preview" ? "draft" : "published",
      cv: Date.now(),
    });

    const productPageBlok = productRelated?.data?.story?.content?.body?.find(
      (blok: any) => blok.component === "productPage"
    );

    const relatedProductsResponse = await fetch(`${baseUrl}/api/related-products/${slug}`);
    const relatedProducts = await relatedProductsResponse.json();

    return {
      product: productData,
      productRelated: productRelated?.data?.story,
      productPageBlok,
      relatedProducts,
    };
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
};

const ProductPage = async ({ params }: { params: { lang: string; slug: string } }) => {
  const data = await fetchProductPage(params.slug);

  if (!data || !data.product || !data.productRelated) {
    return <NotFoundPage />;
  }

  return (
    <div className="p-8">
      <ProductDetails
        image={data.product.productToPrimaryImage}
        title={data.product.webProductFullName}
        description={data.product.productDescription}
        staticContent={data?.productPageBlok}
      />
      <Nutrition staticContent={data?.productPageBlok} />
      <RelatedProducts
        staticContent={data?.productPageBlok}
        relatedProducts={data.relatedProducts}
      />
      <StoryblokStory story={data.productRelated} />
    </div>
  );
};

export async function generateStaticParams() {
  const baseUrl = process.env.AWS_IPADDRESS;
  const languages = ["en-us", "es-us"];

  const productResponse = await fetch(`${baseUrl}/api/products`);
  const products = await productResponse.json();

  const paths = [];
  for (const lang of languages) {
    for (const product of products) {
      paths.push({ lang, slug: product.seoName });
    }
  }

  return paths;
}

export default ProductPage;