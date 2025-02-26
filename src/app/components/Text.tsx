import { render } from "storyblok-rich-text-react-renderer";

const Text = (params : any) => {   
  return (
    <div>{render(params.blok.Text)}</div>
  );
};

export default Text;