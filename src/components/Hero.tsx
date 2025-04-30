import { storyblokEditable } from "@storyblok/react/rsc";

interface HeroBannerProps {
  blok: {
    image: {
      filename: string;
    };
    htmlcontent: string;
  };
}

const Hero = ({ blok }: HeroBannerProps) => {
  return (
    <div
      className="hero-banner flex flex-col items-center justify-center text-white text-center"
      style={{
        backgroundImage: `url(${blok.image.filename})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "400px",
        marginBottom: "3rem",
      }}
      {...storyblokEditable(blok)}
    >
    {blok.htmlcontent && (
        <div className="content_wrapper">
          <div
            className="rich-text"
            dangerouslySetInnerHTML={{ __html: blok.htmlcontent }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Hero;