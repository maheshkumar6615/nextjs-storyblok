import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import Banner from "../app/components/Banner";
import Grid from "../app/components/Grid";
import Text from "../app/components/Text";
import Page from "../app/components/Page";
import Card from "../app/components/Card";
import Product from "../app/components/Product";
import PromotionCard from "@/app/components/PromotionCard";

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN,
  apiOptions: {
    region: "us",
  },
  use: [apiPlugin],
  components: {
    page: Page,
    banner: Banner,
    text: Text,
    grid: Grid,
    card: Card,
    promotionCard: PromotionCard,
    product: Product,
  },
  enableFallbackComponent: true,
});