import React from "react";
import ProductDetails from "@/components/ProductDetails";
import { getStoryblokApi } from "@/lib/storyblok";
import NotFoundPage from "@/app/404";
import { console } from "inspector";
import Nutrition from "@/components/Nutrition";
import RelatedProducts from "@/components/RelatedProducts";
import { StoryblokStory } from "@storyblok/react/rsc";

const fetchProductPage = async (lang: string, slug: string) => {
  try {
    const productResponse = await fetch(`http://ab0810a8654c442c3a1b9d521f979f17-1571552794.us-east-1.elb.amazonaws.com/api/products/${slug}`);
    const productData = await productResponse.json();

    const client = getStoryblokApi();
    const productRelated = await client.get(`cdn/stories/ricekrispies/${lang}/product-config`, {
      version: process.env.VERSION === "preview" ? "draft" : "published",
      cv: Date.now(),
    });

    const productPageBlok = productRelated?.data?.story?.content?.body?.find(
      (blok: any) => blok.component === "productPage"
    );
    
    const relatedProductsResponse = await fetch(`http://ab0810a8654c442c3a1b9d521f979f17-1571552794.us-east-1.elb.amazonaws.com/api/related-products/${slug}`);
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
  const data = await fetchProductPage(params.lang, params.slug);

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
        <Nutrition staticContent={data?.productPageBlok}/>
        <RelatedProducts 
        staticContent={data?.productPageBlok} 
        relatedProducts={data.relatedProducts}
        />
        <StoryblokStory story={data.productRelated} />
      </div>
  );
};


export async function generateStaticParams() {
  const languages = ["en-us", "es-us"];
  return languages.map((lang) => ({ lang }));
}

export default ProductPage;