import Image from 'next/image';
import Link from 'next/link';
import { storyblokEditable } from '@storyblok/react/rsc';

// Define the props structure based on Storyblok schema
interface BannerProps {
  blok: {
    title: string;
    button_text?: string;
    button_link?: string;
    image?: {
      filename: string;
      alt?: string;
    };
    _uid: string;
  };
}

const Banner = ({ blok }: BannerProps) => {
  return (
    <section 
      className="relative w-full py-12 overflow-hidden bg-gray-100"
      {...storyblokEditable(blok)}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold leading-tight">{blok.title}</h1>
          
          {blok.button_text && blok.button_link && (
            <Link 
              href={blok.button_link}
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              {blok.button_text}
            </Link>
          )}
        </div>
        
        {blok.image && blok.image.filename && (
          <div className="w-full md:w-1/2 relative">
            <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src={blok.image.filename}
                alt={blok.image.alt || blok.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Banner;