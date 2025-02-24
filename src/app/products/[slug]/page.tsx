import React from "react";
import ProductDetails from "../../components/ProductDetails";
import { getStoryblokApi } from "@storyblok/react/rsc";

const fetchProductPage = async (slug: string) => {
  const client = getStoryblokApi();
  const response = await client.get(`cdn/stories/products/${slug}`, {
    version: "draft",
  });
  return response?.data?.story;
};

// No need for PageProps interface anymore

const ProductPage = async ({ params }: { params: { slug: string } }) => {  // Correct type for params
  const slug = params.slug; // Extract the slug

  const story = await fetchProductPage(slug);

  if (!story) {
    return <div>Product not found</div>;
  }

  return (
    <div className="p-8">
      <ProductDetails
        image={story.content.Image.filename}
        title={story.content.Title}
        description={story.content.Description}
      />
    </div>
  );
};

export default ProductPage;