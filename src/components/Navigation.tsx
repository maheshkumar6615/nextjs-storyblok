import Link from "next/link";
import Image from "next/image";

interface SecondaryNavItem {
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

interface PrimaryNavItem {
  _uid: string;
  linkPath: {
    cached_url: string;
    linktype: string;
  };
  ariaLabel: string;
  linkTitle: string;
  eventTrigger: string;
  openLinkInNewTab: boolean;
  secondaryNavItems?: SecondaryNavItem[];
}

interface NavigationProps {
  navigation: {
    logo: {
      filename: string;
      meta_data: {
        alt: string;
      };
    };
    logoLink: {
      cached_url: string;
    };
    primaryNavItems: PrimaryNavItem[];
    searchIconLabel: string;
    searchFieldLabel: string;
    searchFieldPlaceHolder: string;
    searchResultsPage: {
      cached_url: string;
    };
  };
}

const Navigation = ({ navigation }: NavigationProps) => {
  const {
    logo,
    logoLink,
    primaryNavItems,
    searchIconLabel,
    searchFieldLabel,
    searchFieldPlaceHolder,
    searchResultsPage,
  } = navigation;

  return (
    <header className="header">
      <div className="content_wrapper">
        {/* Logo */}
        <Link href={`/${logoLink.cached_url}`}>
        <Image
            width={100}
            height={100}
            src={logo.filename}
            alt={logo.meta_data.alt}
            className="header-logo"
            priority
          />
        </Link>

        {/* Primary Navigation */}
        <nav className="nav--main" aria-label="menu">
          <ul className="topmenu">
            {primaryNavItems.map((primaryItem) => (
              <li key={primaryItem._uid} className="menu-dropdown">
                <Link
                  href={`/${primaryItem.linkPath.cached_url}`}
                  target={primaryItem.openLinkInNewTab ? "_blank" : "_self"}
                  aria-label={primaryItem.ariaLabel}
                >
                  {primaryItem.linkTitle}
                </Link>
                {/* Secondary Navigation */}
                {primaryItem.secondaryNavItems && (
                  <ul className="nav-dropdown">
                    {primaryItem.secondaryNavItems.map((secondaryItem) => (
                      <li key={secondaryItem._uid}>
                        <Link
                          href={`/${secondaryItem.linkPath.cached_url}`}
                          target={
                            secondaryItem.openLinkInNewTab ? "_blank" : "_self"
                          }
                          aria-label={secondaryItem.ariaLabel}
                        >
                          {secondaryItem.linkTitle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Search */}
        <div className="search-container">
          <form action={`/${searchResultsPage.cached_url}`}>
            <label htmlFor="search-q">{searchFieldLabel}</label>
            <input
              id="search-q"
              type="text"
              placeholder={searchFieldPlaceHolder}
            />
            <button type="submit" aria-label={searchFieldLabel}>
              {searchIconLabel}
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Navigation;