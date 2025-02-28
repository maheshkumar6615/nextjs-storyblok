import Link from "next/link";

interface FooterProps {
  text: {
    _uid: string;
    link: { url: string };
    label: string;
    component: string;
    _editable: string;
  }[];
}

const Footer = ({ text }: FooterProps) => (
  <footer className="bg-gray-900 text-white p-4 text-center">
    {text.map((textItem) => (
      <Link key={textItem._uid} href={textItem.link.url} className="mr-4">
        {textItem.label}
      </Link>
    ))}
  </footer>
);

export default Footer;