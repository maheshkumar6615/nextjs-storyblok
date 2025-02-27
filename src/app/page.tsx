
import { getStoryblokApi } from "@/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";

const fetchHomePage = async () => {
  const client = getStoryblokApi();
  const response = await client.get(`cdn/stories/en-us/home`, {
    version: "draft",
    cv: Date.now(),
  });
  return response?.data?.story;
};
  
  const HomePage = async () => {
    const story = await fetchHomePage();
    return (
      <StoryblokStory story={story}/>
    );
  };

  export default HomePage;