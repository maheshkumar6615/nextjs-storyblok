import React from "react";
import ProductDetails from "../../components/ProductDetails";
import { getStoryblokApi } from "@/storyblok";
import { StoryblokProvider } from "@/app/components/StoryblokProvider";

const fetchProductPage = async (slug: string) => {
  const client = getStoryblokApi();
  const response = await client.get(`cdn/stories/products/${slug}`, {
    version: "draft",
  });
  return response?.data?.story;
};

// No need for PageProps interface anymore

const ProductPage = async ({ params }: { params: { slug: string } }) => { 
  const story = await fetchProductPage(params.slug);

  if (!story) {
    return <div>Product not found</div>;
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

export default ProductPage;