import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";

const CategoryGrid = (params: any) => {
  return (
    <div className="products-featured" {...storyblokEditable(params.blok)}>
      <section>
        <div className="content_wrapper">
          <div className="products-featured-row">
            {params.blok.categoryTile?.map((tile: any) => (
              <a
                key={tile._uid}
                href={tile.ctaDestination.cached_url}
                target={tile.openLinkInNewTab ? "_blank" : "_self"}
                aria-label={tile.title}
                className="product-category"
                {...storyblokEditable(tile)}
              >
                {/* Primary Image */}
                <div className="product-primary-image">
                  <picture>
                    <Image
                      src={tile.selectImage.filename}
                      alt={tile.selectImage.alt || tile.title}
                      width={300} // Replace with appropriate width
                      height={200} // Replace with appropriate height
                      layout="responsive" // Ensures responsive behavior
                    />
                  </picture>
                </div>

                {/* Secondary Image */}
                {tile.selectForegroundImage?.filename && (
                  <div className="product-secondary-image">
                    <Image
                      src={tile.selectForegroundImage.filename}
                      alt={tile.selectForegroundImage.alt || tile.title}
                      width={300} // Replace with appropriate width
                      height={200} // Replace with appropriate height
                      layout="responsive" // Ensures responsive behavior
                    />
                  </div>
                )}

                {/* Description */}
                <div className="product-category-description">
                  <h2>{tile.title}</h2>
                  {tile.description?.content?.map((desc: any, index: number) => (
                    <p key={index}>{desc.content[0]?.text}</p>
                  ))}
                  <span className="button-cta">{tile.ctaText}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryGrid;