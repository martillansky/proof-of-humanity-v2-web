import ExternalLink from "components/ExternalLink";
import Image from "next/image";

const Footer: React.FC = () => (
  <nav className="absolute bottom-0 w-full grid grid-cols-2 sm:grid-cols-3 text-white text-lg gradient shadow-sm px-8 py-4">
    <ExternalLink href="https://proofofhumanity.id/">Learn More</ExternalLink>
    <ExternalLink
      className="justify-self-end sm:place-self-center flex items-center gap-2 text-sm"
      href="https://kleros.io/"
    >
      SECURED BY{" "}
      <Image alt="kleros" src="/logo/kleros.svg" width={96} height={24} />
    </ExternalLink>
    <div className="mt-4 sm:mt-0 place-self-center col-span-2 sm:col-span-1 sm:justify-self-end flex items-center gap-4">
      <ExternalLink href="https://snapshot.org/#/poh.eth/">
        <Image alt="snapshot" src="/logo/snapshot.svg" width={20} height={20} />
      </ExternalLink>
      <ExternalLink href="https://github.com/proof-of-humanity">
        <Image alt="github" src="/logo/github.svg" width={20} height={20} />
      </ExternalLink>
      <ExternalLink href="https://twitter.com/proofofhumanity">
        <Image alt="twitter" src="/logo/twitter.svg" width={20} height={20} />
      </ExternalLink>
      <ExternalLink href="https://t.me/proofhumanity">
        <Image alt="telegram" src="/logo/telegram.svg" width={20} height={20} />
      </ExternalLink>
    </div>
  </nav>
);

export default Footer;
