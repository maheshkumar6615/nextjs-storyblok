import { getSiteConfig } from "@/lib/getSiteConfig";
import NotFoundPage from "@/app/404";

export default async function SiteConfigPage({ params }: { params: { lang: string } }) {
  if (process.env.NODE_ENV === "development" && !checkStoryblokPreview()) {
    return <NotFoundPage />;
  }
  console.log("params", params.lang);
  const siteConfig = await getSiteConfig(params.lang);

  if (!siteConfig) return <p>No configuration found!</p>;

  return (
    <div>
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Site Configuration Page</h1>
        <p className="mt-4">Edit the navigation, footer, and theme in the Storyblok Visual Editor.</p>
      </main>
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