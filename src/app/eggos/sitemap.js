import { getStoryblokApi } from "@/lib/storyblok";

const fetchAllPages = async () => {
  try{
    const client = getStoryblokApi();
    const response = await client.get(`cdn/stories`, {
      version: "draft",
      cv: Date.now(),
      starts_with: "eggos",
    });
    return response?.data?.stories || [];
  }catch(error){
    console.error("Error fetching page:", error);
    return null;
  }
};


export default async function sitemap() {
  const pages = await fetchAllPages();
  console.log("pages", pages);
  pages.forEach((page) => {
    console.log("page", page);
  });

  const sitemapEntries = pages.map((page) => ({
    url: `http://localhost:3000/${page.full_slug}`,
    lastModified: new Date(page.published_at),
    changeFrequency: 'daily',
    priority: 1.0,
  }));

  return [
    ...sitemapEntries,
  ];
}