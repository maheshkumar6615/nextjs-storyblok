import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import Banner from "./app/components/Banner/Banner";
import ProductDetails from "./app/components/ProductDetails/ProductDetails";
import Grid from "./app/components/Grid/Grid";
import Text from "./app/components/Text/Text";

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN,
  apiOptions: {
    region: "us",
  },
  use: [apiPlugin],
  components: {
    banner: Banner,
    product: ProductDetails,
    text: Text,
    grid: Grid,
  },
  enableFallbackComponent: true,
});