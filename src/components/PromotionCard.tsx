import { storyblokEditable } from "@storyblok/react/rsc";
import Link from "next/link";
import Image from "next/image";

const PromotionCard = (params: any) => {
  const { blok } = params;
  const isInternalLink = blok.promotionLink.linktype === 'story';

  return (
    <div className="promotion-card bg-white shadow-md rounded-lg overflow-hidden" {...storyblokEditable(blok)}>
      <Image src={blok.image.filename} alt={blok.image.title} width={600} height={600} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2" dangerouslySetInnerHTML={{ __html: blok.title }} />
        <p className="text-gray-700 mb-4">{blok.description}</p>
        {isInternalLink ? (
          <Link href={`/${blok.promotionLink.cached_url}`} legacyBehavior>
            <a className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              View Product
            </a>
          </Link>
        ) : (
          <a
            href={blok.promotionLink.url}
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Product
          </a>
        )}
      </div>
    </div>
  );
};

export default PromotionCard;