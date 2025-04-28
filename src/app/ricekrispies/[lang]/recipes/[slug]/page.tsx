import React from "react";
import { getStoryblokApi } from "@/lib/storyblok";
import NotFoundPage from "@/app/404";
import { StoryblokStory } from "@storyblok/react/rsc";

const fetchRecipePage = async (slug: string) => {
  try {
    const baseUrl = process.env.AWS_IPADDRESS; 

    const recipeResponse = await fetch(`${baseUrl}/api/recipes/${slug}`);
    const recipeData = await recipeResponse.json();

    const client = getStoryblokApi();
    const storyResponse = await client.get(`cdn/stories/ricekrispies/templates/recipe-template`, {
      version: process.env.VERSION === "preview" ? "draft" : "published",
      cv: Date.now(),
    });

    return {
      recipe: recipeData,
      story: storyResponse?.data?.story,
    };
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
};

const RecipePage = async ({ params }: { params: { lang: string; slug: string } }) => {
  const data = await fetchRecipePage(params.slug);

  if (!data || !data.recipe || !data.story) {
    return <NotFoundPage />;
  }

  const modifiedStory = {
    content: {
      ...data.story.content,
      body: Array.isArray(data.story.content.body)
        ? data.story.content.body.map((blok: any) => ({
            ...blok,
            recipe: data.recipe
          }))
        : [],
    },
  };
  return (
    <div className="p-8">
      <StoryblokStory story={modifiedStory} />
    </div>
  );
};

export async function generateStaticParams() {
  const baseUrl = process.env.AWS_IPADDRESS;
  const languages = ["en-us", "es-us"];

  const recipeResponse = await fetch(`${baseUrl}/api/recipes`);
  const recipes = await recipeResponse.json();

  const paths = [];
  for (const lang of languages) {
    for (const recipe of recipes) {
      paths.push({ lang, slug: recipe.seoName });
    }
  }

  return paths;
}

export default RecipePage;