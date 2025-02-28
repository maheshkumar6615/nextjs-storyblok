import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./styles/Banner.scss";
import "./styles/ProductDetails.scss";
import { StoryblokProvider } from "./components/StoryblokProvider";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Theme from "./components/Theme";
import { getSiteConfig } from "@/lib/getSiteConfig";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteConfig = await getSiteConfig();

  return (
    <StoryblokProvider>
      <html lang="en" data-theme={siteConfig?.content?.site || "eggos"}>
      <head>
          <link rel="icon" href={siteConfig?.content?.favicon?.filename || "favicon.ico"} />
        </head>
        <body className={`${inter.className} bg-blue-50`}>
          <Theme />
          <Nav links={siteConfig?.content?.navigation} />
          <main className="container mx-auto">{children}</main>
          <Footer text={siteConfig?.content?.footerBlocks || "Default Footer"} />
        </body>
      </html>
    </StoryblokProvider>
  );
}
