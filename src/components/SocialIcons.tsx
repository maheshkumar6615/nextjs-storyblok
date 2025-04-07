import Image from "next/image";

interface SocialIcon {
  _uid: string;
  platform: string; // Format: "https://www.platform.com@PlatformName@iconBase64"
  userName: string;
}

interface SocialIconsProps {
  socialIcons: SocialIcon[];
  copyRightSymbol?: string;
  copyRightDescription?: string;
}

const SocialIcons = ({
  socialIcons,
  copyRightSymbol,
  copyRightDescription,
}: SocialIconsProps) => {
  return (
    <div className="content_wrapper">
      <p className="copyright text-gray-500 text-sm mt-4">
        {copyRightSymbol} {copyRightDescription}
      </p>

      {/* Social Links */}
      <div id="sociallinks" className="social_icons">
        {socialIcons.map((socialIcon) => {
          const [link, title, icon] = socialIcon.platform.split("@");

          return (
            <a
              key={socialIcon._uid}
              href={`${link}/${socialIcon.userName}`}
              aria-label={title}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon">
              <Image src={icon} alt={title} className="social-icon-img" width={24} height={24} />
              <span className={`${title.toLowerCase()}-icon-span`}>
                {title}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SocialIcons;
