import { Link } from "react-router-dom";
import ALink from "components/ALink";
import Popover from "components/Popover";
import { CHAIN, ChainId, SUPPORTED_CHAIN_IDS } from "constants/chains";
import { injected } from "hooks/connectors";
import useChangeChain from "hooks/useChangeChain";
import useConnect from "hooks/useConnect";
import useWeb3 from "hooks/useWeb3";
import { shortenAddress } from "utils/address";
import ProofOfHumanityLogo from "../../assets/svg/ProofOfHumanityLogo.svg";

const DISPLAYED_CHAINS = SUPPORTED_CHAIN_IDS;

const Header: React.FC = () => {
  useConnect();
  const { chainId, account, ENSName } = useWeb3(false);
  const changeChain = useChangeChain();

  return (
    <nav
      className="px-8 pb-2 sm:pt-2
                 w-full
                 grid grid-cols-2 sm:grid-cols-3
                 text-white text-lg
                 gradient shadow-sm"
    >
      <Link to="/" className="flex items-center">
        <ProofOfHumanityLogo height={32} width={32} />
        <div className="mx-2 flex flex-col font-thin leading-5">
          <span>PROOF OF</span>
          <span>HUMANITY</span>
        </div>
      </Link>

      <div
        className="my-2
                   grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-16 xl:gap-32
                   justify-items-center
                   font-bold whitespace-nowrap"
      >
        <Link to="/">Requests</Link>
        <Link to="/humanities">Humanities</Link>
        {/* {account && <Link to={`/humanity/${account}`}>Humanity</Link>} */}
        {account && <Link to="/claim">Claim</Link>}
      </div>

      <div
        className="justify-self-center sm:justify-self-end col-span-2 sm:col-span-1
                   flex items-center"
      >
        <Popover
          trigger={
            <button
              className="mr-2 py-1 px-4
                         bg-white mix-blend-lighten
                         rounded
                         text-black text-sm"
            >
              {SUPPORTED_CHAIN_IDS.find((c) => c === chainId)
                ? CHAIN[chainId as ChainId].NAME
                : "SWITCH"}
            </button>
          }
        >
          <div className="flex flex-col">
            {DISPLAYED_CHAINS.map((chainId: ChainId) => (
              <button
                key={chainId}
                className="cursor-pointer"
                onClick={() => changeChain(chainId)}
              >
                {CHAIN[chainId].NAME}
              </button>
            ))}
          </div>
        </Popover>

        <button
          className="mr-2 py-1 px-4
                     border border-white rounded
                     text-white text-sm"
          onClick={() => injected.connector.activate()}
        >
          {!!account ? ENSName ?? shortenAddress(account) : "Connect"}
        </button>

        <button
          className="mr-2 w-6 h-6
                     grid place-content-center
                     bg-white
                     border-2 border-white rounded-full"
        >
          <ALink href="https://snapshot.org/#/poh.eth/">
            <ProofOfHumanityLogo height={16} width={16} />
          </ALink>
        </button>

        <Popover
          trigger={
            <button
              className="w-6 h-6
                         border-2 border-white rounded-full
                         font-bold text-sm"
            >
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
};

export default Header;
