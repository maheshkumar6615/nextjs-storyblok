import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import Banner from "@/components/Banner";
import Grid from "@/components/Grid";
import Text from "@/components/Text";
import Page from "@/components/Page";
import Card from "@/components/Card";
import Product from "@/components/Product";
import PromotionCard from "@/components/PromotionCard";
import CategoryGrid from "@/components/CategoryGrid";
import PromoTiles from "@/components/PromoTiles";

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
    categoryGrid: CategoryGrid,
    promoTiles: PromoTiles
  },
  enableFallbackComponent: true,
});