import Link from "next/link";

interface NavProps {
  links: {
    _uid: string;
    link: { url: string };
    title: string;
    component: string;
    _editable: string;
  }[];
}

const Nav = ({ links }: NavProps) => (
  <nav className="bg-gray-900 text-white p-4 text-center">
    {links.map((linkItem) => (
      <Link key={linkItem._uid} href={linkItem.link.url} className="mr-4">
        {linkItem.title}
      </Link>
    ))}
  </nav>
);

export default Nav;