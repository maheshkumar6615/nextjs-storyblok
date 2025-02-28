import { getSiteConfig } from "@/lib/getSiteConfig";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Theme from "../components/Theme";
import { notFound } from "next/navigation";

export default async function SiteConfigPage() {
  // Allow access only in development or when Storyblok editor is active
  if (process.env.NODE_ENV === "production" && !checkStoryblokPreview()) {
    notFound(); // This will render the Next.js 404 page
  }

  const siteConfig = await getSiteConfig();
  const blok = siteConfig?.content?.blok;

  if (!siteConfig) return <p>No configuration found!</p>;

  return (
    <div>
      <Theme />
      <Nav links={siteConfig?.content?.navigation} blok={blok} />
      <main className="container mx-auto p-4">
        <h1>Site Configuration Page</h1>
        <p>Edit the navigation, footer, and theme in the Storyblok Visual Editor.</p>
      </main>
      <Footer text={siteConfig?.content?.footerBlocks} blok={blok} />
    </div>
  );
}

function checkStoryblokPreview() {
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has("_storyblok");
  }
  return false;
}

