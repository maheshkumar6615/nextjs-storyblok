import React from "react";
import CookingInstructions from "@/components/CookingInstructions";
import { getStoryblokApi } from "@/lib/storyblok";
import NotFoundPage from "@/app/404";
import { StoryblokStory } from "@storyblok/react/rsc";

const fetchProductPage = async (lang: string, slug: string) => {
  try {
    const productResponse = await fetch(`http://aa1df0c726915438cba6057483f83693-1907848014.us-east-1.elb.amazonaws.com/api/recipes/${slug}`);
    const productData = await productResponse.json();

    const client = getStoryblokApi();
    const productRelated = await client.get(`cdn/stories/ricekrispies/${lang}/recipes/${slug}`, {
      version: process.env.VERSION === "preview" ? "draft" : "published",
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
        <CookingInstructions instructions={data.product.recipeDirections} />
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