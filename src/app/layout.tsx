import { getStoryblokApi } from '@storyblok/react';
import type { Metadata } from "next";
import "./globals.css";
import "../storyblok";
// Define layout props
interface LayoutProps {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug || 'home';
  const storyblokApi = getStoryblokApi();
  
  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: 'published',
    });
    
    if (!data?.story) {
      return {
        title: 'Page Not Found',
      };
    }
    
    const story = data.story;
    
    return {
      title: story.content.title || story.name,
      description: story.content.description || '',
      // You can add more metadata properties here
    };
  } catch (error) {
    console.error(`Error fetching metadata for slug "${slug}":`, error);
    return {
      title: 'Page',
    };
  }
}

// Layout component
export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
          <div className="storyblok-page-wrapper">
          {/* You can add global page elements here like header, footer, etc. */}
          <main>
            {children}
          </main>
          </div>
      </body>
      </html>
    
  );
}