import { storyblokEditable } from "@storyblok/react/rsc";

const Wytiwg = (params: any) => {
  // Extract the HTML content from the JSON
  const htmlContent = params.blok.html?.content
    ?.map((block: any) => block.content?.[0]?.text)
    .join("") || "";

  return (
    <div
      {...storyblokEditable(params.blok)}
      style={{ marginBottom: "1rem" }}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    ></div>
  );
};

export default Wytiwg;
