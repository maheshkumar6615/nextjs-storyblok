import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";
import NotFoundPage from "@/app/404";

const fetchHomePage = async (lang: string) => {
  try{
    const client = getStoryblokApi();
    const response = await client.get(`cdn/stories/${lang}/home`, {
      version: "draft",
      cv: Date.now(),
    });
    return response?.data?.story;
  }catch(error){
    console.error("Error fetching page:", error);
    return null;
  }
};

const HomePage = async ({ params }: { params: { lang: string } }) => {
  const story = await fetchHomePage(params.lang);
  if (!story) {
    return <NotFoundPage />;
  }
  return <StoryblokStory story={story} />;
};

export async function generateStaticParams() {
  const languages = ["en-us", "es-us"];
  return languages.map((lang) => ({ lang }));
}

export default HomePage;