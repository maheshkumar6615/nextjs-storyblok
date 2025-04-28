import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";

const fetchPageData = async (lang: string, slug: string) => {
  try {
    const client = getStoryblokApi();
    const storyResponse = await client.get(`cdn/stories/ricekrispies/${lang}/${slug}`, {
      version: process.env.VERSION === "preview" ? "draft" : "published",
      cv: Date.now(),
    });

    const story = storyResponse?.data?.story;
    const hasProductList = story?.content?.body?.some((blok: any) => blok.component === "productList");

    let products = [];
    if (hasProductList) {
      const baseUrl = process.env.AWS_IPADDRESS;
      const productResponse = await fetch(`${baseUrl}/api/get-products-by-category/${slug}`);
      if (!productResponse.ok) {
        throw new Error("Failed to fetch products");
      }
      products = await productResponse.json();
    }

    // Check for recipeList component and use its category field
    const recipeListBlok = story?.content?.body?.find((blok: any) => blok.component === "recipeList");
    let recipes = [];
    if (recipeListBlok?.category) {
      const baseUrl = process.env.AWS_IPADDRESS;
      const recipeResponse = await fetch(`${baseUrl}/api/get-recipes-by-category/${recipeListBlok.category}`);
      if (!recipeResponse.ok) {
        throw new Error("Failed to fetch recipes");
      }
      recipes = await recipeResponse.json();
    }

    return {
      story: storyResponse?.data?.story,
      products,
      recipes,
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
            lang: params.lang,
          };
        }
        if (blok.component === "recipeList") {
          return {
            ...blok,
            recipes: data.recipes,
            lang: params.lang,
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