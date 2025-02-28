import { render } from "storyblok-rich-text-react-renderer";
import { storyblokEditable } from "@storyblok/react/rsc";

const Text = (params: any) => {
  //console.log(params.blok);
  return (
    <div {...storyblokEditable(params.blok)}>{render(params.blok.Text)}</div>
  );
};

export default Text;
