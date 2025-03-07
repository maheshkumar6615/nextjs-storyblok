import React from "react";
import ProductDetails from "@/app/components/ProductDetails";
import CookingInstructions from "@/app/components/CookingInstructions";
import { getStoryblokApi } from "@/lib/storyblok";
import NotFoundPage from "@/app/404";
import { StoryblokStory } from "@storyblok/react/rsc";

const fetchProductPage = async (lang: string, slug: string) => {
  try {
    const productResponse = await fetch(`http://a2df20be227834da5bc1416149fe39e2-1940091949.us-east-1.elb.amazonaws.com/api/products/${slug}`);
    const productData = await productResponse.json();

    const client = getStoryblokApi();
    const productRelated = await client.get(`cdn/stories/eggos/${lang}/products/${slug}`, {
      version: "draft",
      cv: Date.now(),
    });

    return {
      product: productData,
      productRelated: productRelated?.data?.story,
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
          image={data.product.dataPim.productToPrimaryImage}
          title={data.product.jcrContent.jcrTitle}
          description={data.product.dataPim.productDescription}
        />
        <CookingInstructions instructions={data.product.dataPim.preparationInstructions} />
        <StoryblokStory story={data.productRelated} />
      </div>
  );
};

export async function generateStaticParams() {
  const languages = ["en-us", "es-us"];
  const client = getStoryblokApi();
  const { data } = await client.get("cdn/links/");

  const paths: { lang: string; slug: string; }[] = [];

  languages.forEach((lang) => {
    Object.keys(data.links).forEach((slug) => {
      if (slug.startsWith(`${lang}/products/`)) {
        paths.push({ lang, slug: slug.replace(`${lang}/products/`, "") });
      }
    });
  });
  return paths;
}

export default ProductPage;