import { storyblokEditable, renderRichText, ISbRichtext } from '@storyblok/react/rsc';

// Define the props structure based on Storyblok schema
interface TextProps {
  blok: {
    text?: ISbRichtext; // Rich text content from Storyblok
    _uid: string;
  };
}

const Text = ({ blok }: TextProps) => {
  // Render the rich text content if available
  const renderedRichText = blok.text ? renderRichText(blok.text) : '';
  
  return (
    <div 
      className="rich-text-container prose max-w-none my-6"
      {...storyblokEditable(blok)}
      dangerouslySetInnerHTML={{ __html: renderedRichText as string }}
    />
  );
};

export default Text;