import { StoryblokServerComponent } from "@storyblok/react/rsc";
 
const Page = ( params : any) => (
  <main className="container">
    {params.blok.body.map((blok: any) => (
      <StoryblokServerComponent blok={blok} key={blok._uid} />
    ))}
  </main>
);
 
export default Page;