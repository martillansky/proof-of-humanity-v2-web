import ExternalLink from "components/ExternalLink";

const Footer: React.FC = () => (
  <nav className="absolute bottom-0 w-full flex justify-between items-center text-white text-lg gradient shadow-sm px-8 py-4">
    <ExternalLink href="https://proofofhumanity.id/">Learn More</ExternalLink>
    <ExternalLink href="https://kleros.io/">SECURED BY KLEROS</ExternalLink>
    <span>...Social Media Links</span>
  </nav>
);

export default Footer;
