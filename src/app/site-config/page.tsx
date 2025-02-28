import { getSiteConfig } from '@/lib/getSiteConfig';
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Theme from "../components/Theme";

export default async function SiteConfigPage() {
  const siteConfig = await getSiteConfig();

  if (!siteConfig) return <p>No configuration found!</p>;

  return (
    <div>
      <Theme />
      <Nav links={siteConfig?.content?.navigation} />
      <main className="container mx-auto p-4">
        <h1>Site Configuration Page</h1>
        <p>Edit the navigation, footer, and theme in the Storyblok Visual Editor.</p>
      </main>
      <Footer text={siteConfig?.content?.footerBlocks || "Default Footer"} />
    </div>
  );
}
