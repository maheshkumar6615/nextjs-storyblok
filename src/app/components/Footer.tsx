import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";

interface FooterProps {
  text: {
    _uid: string;
    link: { url: string };
    label: string;
    component: string;
    _editable: string;
  }[];
  blok: any;
}

const Footer = ({ text, blok }: FooterProps) => (
  <footer className="bg-gray-900 text-white p-4 text-center" {...storyblokEditable(blok)}>
    {text.map((textItem) => (
      <Link key={textItem._uid} href={textItem.link.url} className="mr-4 hover:text-gray-300">
        {textItem.label}
      </Link>
    ))}
  </footer>
);

export default Footer;