import React from "react";
import ProductDetails from "@/app/components/ProductDetails";
import { getStoryblokApi } from "@/storyblok";
import { StoryblokProvider } from "@/app/components/StoryblokProvider";
import NotFoundPage from "@/app/404";

const fetchProductPage = async (lang: string, slug: string) => {
  try{
    const client = getStoryblokApi();
    const response = await client.get(`cdn/stories/${lang}/products/${slug}`, {
      version: "draft",
      cv: Date.now(),
    });
    return response?.data?.story;
  }catch(error){
    console.error("Error fetching page:", error);
    return null;
  }
};

const ProductPage = async ({ params }: { params: { lang: string; slug: string } }) => {
  const story = await fetchProductPage(params.lang, params.slug);

  if (!story) {
    return <NotFoundPage />;
  }

  return (
    <StoryblokProvider>
      <div className="p-8">
        <ProductDetails
          image={story.content.Image.filename}
          title={story.content.Title}
          description={story.content.Description}
        />
      </div>
    </StoryblokProvider>
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