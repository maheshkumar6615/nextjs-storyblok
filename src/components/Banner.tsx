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
        marginBottom: "3rem",
      }}
      {...storyblokEditable(params.blok)}
    >
      <h1 className="text-3xl font-bold">{params.blok.title}</h1>
      <a
        href={params.blok.button.url}
        className="mt-5 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Explore Products
      </a>
    </div>
  );
};

export default Banner;