import { getStoryblokApi } from "@/lib/storyblok";

export const getSiteConfig = async () => {
    try {
      const client = getStoryblokApi();
      const response = await client.get('cdn/stories/en-us/site-config', {
        version: "draft",
        cv: Date.now(),
      });
      return response?.data?.story;
    } catch (error) {
      console.error("Error fetching 404 page:", error);
      return null;
    }
  };