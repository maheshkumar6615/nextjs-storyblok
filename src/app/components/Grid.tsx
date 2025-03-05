import {
  StoryblokServerComponent,
  storyblokEditable,
} from "@storyblok/react/rsc";

const Grid = (params: any) => {
  return (
    <section {...storyblokEditable(params.blok)}>
      <div className="container mx-auto w-full px-4">
        <div className="grid md:grid-flow-col auto-cols-fr mt-12 gap-8">
          {params.blok.columns.map((blok: any) => (
            <StoryblokServerComponent blok={blok} key={blok._uid} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Grid;