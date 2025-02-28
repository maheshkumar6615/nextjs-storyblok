import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";

interface NavProps {
  links: {
    _uid: string;
    link: { url: string };
    title: string;
    component: string;
    _editable: string;
  }[];
  blok: any; // Add the blok prop
}

const Nav = ({ links, blok }: NavProps) => (
  <nav className="bg-gray-900 text-white p-4 text-center" {...storyblokEditable(blok)}>
    {links.map((linkItem) => (
      <Link key={linkItem._uid} href={linkItem.link.url} className="mr-4 hover:text-gray-300">
        {linkItem.title}
      </Link>
    ))}
  </nav>
);

export default Nav;