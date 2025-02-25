import { storyblokEditable, StoryblokServerComponent } from '@storyblok/react/rsc';

// Define the type for nested Storyblok blocks
interface StoryblokBlock {
  _uid: string;
  component: string;
  [key: string]: unknown; // Allow additional properties
}

// Define the props structure based on Storyblok schema
interface GridProps {
  blok: {
    columns?: number;
    items?: StoryblokBlock[]; // Use specific type instead of `any[]`
    _uid: string;
  };
}

const Grid = ({ blok }: GridProps) => {
  // Default to 3 columns if not specified
  const columns = blok.columns || 3;
  
  // Determine grid columns class based on the columns setting
  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns] || 'grid-cols-1 md:grid-cols-3';
  
  return (
    <div 
      className="w-full py-8"
      {...storyblokEditable(blok)}
    >
      <div className={`grid ${gridClass} gap-6`}>
        {blok.items?.map((nestedBlok) => (
          <StoryblokServerComponent 
            blok={nestedBlok} 
            key={nestedBlok._uid} 
          />
        ))}
      </div>
    </div>
  );
};

export default Grid;
