import { storyblokEditable } from "@storyblok/react/rsc";

const PromoTiles = (params: any) => {
  return (
    <div className="promotions-featured">
      <div className="content_wrapper">
        <section>
          <div className="promotions-featured-row">
            {params.blok.promoTile?.map((tile: any) => (
              <div
                key={tile._uid}
                className={`promotions-featured-column ${tile.customClassName || ""}`}
              >
                {/* PriceSpider SKU Modal */}
                {tile.priceSpiderSKu && (
                  <div
                    className="promomodal-box"
                    style={{ display: "none", visibility: "hidden" }}
                  >
                    <div className="ps-widget" ps-sku={tile.priceSpiderSKu}></div>
                  </div>
                )}

                {/* Promo Tile Link */}
                <a
                  href={tile.ctaDestination.cached_url || tile.ctaDestination}
                  target={tile.openLinkInNewTab ? "_blank" : "_self"}
                  aria-label={tile.title || tile.ctaText}
                  data-event={tile.eventTrigger}
                  data-ps-trigger-sku={tile.priceSpiderSKu}
                  className="promo-tile-link"
                  {...storyblokEditable(tile)}
                >
                  <div className="rich-text">
                    {/* Image */}
                    {tile.image?.filename && (
                      <picture>
                        <img
                          src={tile.image.filename}
                          alt={tile.image.alt || tile.title || "Promo Image"}
                        />
                      </picture>
                    )}

                    {/* Description */}
                    <div className="promotions-description">
                      {tile.title && <h2>{tile.title}</h2>}
                      {tile.description?.content?.map((desc: any, index: number) => (
                        <p key={index}>{desc.content?.[0]?.text}</p>
                      ))}
                      {tile.ctaText && (
                        <span className="button-cta">{tile.ctaText}</span>
                      )}
                    </div>
                  </div>
                </a>

                {/* Disclaimer */}
                {tile.disclaimer && (
                  <div
                    className="promo-disclaimer"
                    dangerouslySetInnerHTML={{ __html: tile.disclaimer }}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PromoTiles;