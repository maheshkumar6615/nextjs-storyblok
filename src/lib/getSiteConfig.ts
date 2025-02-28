import { getStoryblokApi } from "@/lib/storyblok";

export const getSiteConfig = async (lang: string) => {
  try {
    const client = getStoryblokApi();
    const response = await client.get(`cdn/stories/${lang}/site-config`, {
      version: "draft",
      cv: Date.now(),
    });
    return response?.data?.story;
  } catch (error) {
    console.error("Error fetching site configuration:", error);
    return null;
  }
};