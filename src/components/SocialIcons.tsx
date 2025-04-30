import Image from "next/image";

interface SocialIcon {
  _uid: string;
  platform: string;
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
    <div className="social-icons-wrapper">
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
              className="social-icon"
            >
              <Image
                src={icon}
                alt={title}
                className="social-icon-img"
                width={24}
                height={24}
              />
              <span className={`${title.toLowerCase()}-icon-span`}>
                {title}
              </span>
            </a>
          );
        })}
      </div>
      <p className="copyright">
        {copyRightSymbol} {copyRightDescription}
      </p>
    </div>
  );
};

export default SocialIcons;