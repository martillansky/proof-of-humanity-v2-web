import Image from "next/image";
import ExternalLink from "components/ExternalLink";

const Footer: React.FC = () => (
  <div className="bottom-0 w-full flex flex-wrap justify-center sm:justify-between items-center gap-y-[20px] gap-x-[240px] text-white text-lg gradient shadow-sm px-8 py-4">
    <ExternalLink
      className="flex items-center gap-2 text-sm"
      href="https://kleros.io/"
    >
      BUILT BY{" "}
      <Image alt="kleros" src="/logo/kleros.svg" width={96} height={24} />
    </ExternalLink>

    <div className="flex items-center gap-4">
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
  </div>
);

export default Footer;
