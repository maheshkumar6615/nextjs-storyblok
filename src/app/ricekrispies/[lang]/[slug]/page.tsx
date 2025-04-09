import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";

const fetchPageData = async (lang: string, slug: string) => {
  try {
    const client = getStoryblokApi();
    const storyResponse = await client.get(`cdn/stories/ricekrispies/${lang}/${slug}`, {
      version: process.env.VERSION === "preview" ? "draft" : "published",
      cv: Date.now(),
    });

    const productResponse = await fetch(
      `http://a6ea4395e957e4f238c70d2fe5eac49c-1561507186.us-east-1.elb.amazonaws.com/api/get-products-by-category/${slug}`
    );
    if (!productResponse.ok) {
      throw new Error("Failed to fetch products");
    }
    const products = await productResponse.json();

    return {
      story: storyResponse?.data?.story,
      products,
    };
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null;
  }
};

const Page = async ({ params }: { params: { lang: string; slug: string } }) => {
  const data = await fetchPageData(params.lang, params.slug);

  if (!data || !data.story) {
    return <div>Page not found</div>;
  }

  const modifiedStory = {
    ...data.story,
    content: {
      ...data.story.content,
      body: data.story.content.body.map((blok: any) => {
        if (blok.component === "productList") {
          return {
            ...blok,
            products: data.products,
          };
        }
        return blok;
      }),
    },
  };

  return (
    <div>
      <StoryblokStory story={modifiedStory} />
    </div>
  );
};

export default Page;