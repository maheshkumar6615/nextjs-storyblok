import Link from "next/link";

interface LinkItem {
  _uid: string;
  linkPath: {
    cached_url: string;
    linktype: string;
  };
  ariaLabel: string;
  linkTitle: string;
  eventTrigger: string;
  openLinkInNewTab: boolean;
}

interface FooterBlock {
  _uid: string;
  linkItem: LinkItem[];
  backToTopLabel: string;
  displayBackToTop: boolean;
  _editable: string;
}

interface FooterProps {
  footerBlocks: FooterBlock[];
}

const FooterNavigation = ({ footerBlocks }: FooterProps) => (
  <footer className="bg-gray-900 text-white p-4 text-center">
    <div className="content_wrapper">
      {/* Back to Top */}
      {footerBlocks.some((block) => block.displayBackToTop) && (
        <a
          href="#top"
          id="back-to-top"
          aria-label={footerBlocks[0].backToTopLabel}
          title={footerBlocks[0].backToTopLabel}
          className="text-blue-500 hover:underline"
          tabIndex={0}
        >
          {footerBlocks[0].backToTopLabel}
        </a>
      )}

      {/* Footer Navigation */}
      <nav className="footer-nav--main" aria-label="footer main navigation">
        <ul>
          {footerBlocks.map((block) =>
            block.linkItem.map((linkItem) => {
              // Ensure the href starts with "/" if it's a relative path
              const href = linkItem.linkPath.cached_url.startsWith("/")
                ? linkItem.linkPath.cached_url
                : `/${linkItem.linkPath.cached_url}`;

              return (
                <li key={linkItem._uid}>
                  <Link
                    href={href}
                    target={linkItem.openLinkInNewTab ? "_blank" : "_self"}
                    aria-label={linkItem.ariaLabel}
                    data-event={linkItem.eventTrigger}
                    className="hover:text-gray-300"
                  >
                    {linkItem.linkTitle}
                  </Link>
                </li>
              );
            })
          )}
        </ul>
      </nav>
    </div>
  </footer>
);

export default FooterNavigation;