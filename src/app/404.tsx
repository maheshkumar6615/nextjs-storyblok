import React from 'react';
import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";

const fetchNotFoundPage = async () => {
  try {
    const client = getStoryblokApi();
    const response = await client.get('cdn/stories/404-notfound', {
      version: "draft",
      cv: Date.now(),
    });
    return response?.data?.story;
  } catch (error) {
    console.error("Error fetching 404 page:", error);
    return null;
  }
};

const NotFoundPage = async () => {
  const story = await fetchNotFoundPage();

  if (!story) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-8">Sorry, the page you are looking for does not exist.</p>
        <a href="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Go to Home
        </a>
      </div>
    );
  }

  return <StoryblokStory story={story} />;
};

export default NotFoundPage;