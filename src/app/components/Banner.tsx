import { storyblokEditable } from "@storyblok/react/rsc";

const Banner = (params: any) => {
  return (
    <div
      className="banner flex flex-col items-center justify-center text-white text-center"
      style={{
        backgroundImage: `url(${params.blok.backgroundImage.filename})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "400px",
      }}
      {...storyblokEditable(params.blok)}
    >
      <h3 className="text-3xl font-bold">{params.blok.title}</h3>
      <a
        href={params.blok.button.url}
        className="mt-5 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Explore Recipes
      </a>
    </div>
  );
};

export default Banner;