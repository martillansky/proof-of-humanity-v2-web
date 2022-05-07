import React from "react";
import { Link } from "react-router-dom";
import ALink from "components/ALink";
import Popover from "components/Popover";
import ProofOfHumanityLogo from "../../assets/svg/ProofOfHumanityLogo.svg";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => (
  <nav className="flex flex-col md:flex-row justify-between items-center text-white text-lg bg-gradient-to-r from-orange via-orange to-pink shadow-sm px-8 py-4">
    <Link to="/" className="flex">
      <ProofOfHumanityLogo height={32} width={32} />
      <div className="mx-2 flex flex-col font-thin leading-5">
        <span>PROOF OF</span>
        <span>HUMANITY</span>
      </div>
    </Link>

    <div className="flex my-2 flex-col sm:flex-row items-center font-bold whitespace-nowrap">
      <Link to="/">Profiles</Link>
      <Link to="/profile/x" className="mx-12 lg:mx-36 xl:mx-64">
        Submit Profile
      </Link>
      <ALink href="https://pools.proofofhumanity.id/">Pools</ALink>
    </div>

    <div>
      {/* <Popover
        trigger={
          <button className="py-2 px-4 rounded-full bg-white text-black mix-blend-lighten font-medium">
            Mainnet
          </button>
        }
      /> */}
      <Popover
        trigger={
          <button className="w-6 h-6 border-2 border-white rounded-full font-bold text-sm">
            ?
          </button>
        }
      >
        <div className="p-2 h-fit grid grid-cols-1 gap-2">
          <ALink href="https://t.me/proofhumanity">Get Help (English)</ALink>
          <ALink href="https://t.me/proofhumanity">Get Help (Spanish)</ALink>
          <ALink href="https://gov.proofofhumanity.id/">Forums</ALink>
          <ALink href="https://github.com/Proof-Of-Humanity/proof-of-humanity-web/issues">
            Report a bug
          </ALink>
          <ALink href="https://github.com/Proof-Of-Humanity/proof-of-humanity-web/issues">
            Tutorial
          </ALink>
          <ALink href="https://kleros.gitbook.io/docs/products/proof-of-humanity/proof-of-humanity-tutorial">
            Report a bug
          </ALink>
          <ALink href="https://ethereum.org/en/wallets">
            Crypto Beginner's Guide
          </ALink>
          <ALink href="https://kleros.gitbook.io/docs/products/proof-of-humanity/poh-faq">
            FAQ
          </ALink>
        </div>
      </Popover>
    </div>
  </nav>
);

export default Header;
