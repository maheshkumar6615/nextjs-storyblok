import { getStoryblokApi } from "@storyblok/react/rsc";
import { notFound } from 'next/navigation';
import { StoryblokStory } from "@storyblok/react/rsc";

// Define the component props
interface PageProps {
  params: {
    slug: string;
  };
}

// Set revalidation time (optional)
export const revalidate = 3600; // Revalidate content every hour

// Generate static params for static pages (optional)
export async function generateStaticParams() {
  const storyblokApi = getStoryblokApi();
  
  try {
    const { data } = await storyblokApi.get('cdn/links', {
      version: 'published',
    });
    
    if (!data || !data.links) {
      return [];
    }
    
    const paths = [];
    // Correctly iterate through the links object
    for (const linkKey in data.links) {
      const link = data.links[linkKey];
      
      // Skip home page as it's handled separately
      if (link.slug === 'home') continue;
      
      // Create the slug parameter for Next.js dynamic routing
      paths.push({
        slug: link.slug,
      });
    }
    
    return paths;
  } catch (error) {
    console.error('Error generating static paths:', error);
    return [];
  }
}

// Main page component that fetches and renders Storyblok content
export default async function Page({ params }: PageProps) {
  const slug = params.slug || 'home';
  const storyblokApi = getStoryblokApi();
  
  try {
    // Fetch the story from Storyblok
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
      resolve_relations: 'featured_posts.posts',
    });
    
    if (!data?.story) {
      return notFound();
    }
    
    // Get the story content and pass it to the client component
    return <StoryblokStory story={data.story} />;
  } catch (error) {
    console.error(`Error fetching Storyblok content for slug "${slug}":`, error);
    return notFound();
  }
}