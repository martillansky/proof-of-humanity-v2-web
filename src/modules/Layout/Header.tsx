import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ALink from "components/ALink";
import Popover from "components/Popover";
import ProofOfHumanityLogo from "../../assets/svg/ProofOfHumanityLogo.svg";
import { useWeb3React } from "@web3-react/core";
import { injected } from "utils/connectors";
import { shortenAddress } from "utils/address";
import { Web3Provider } from "@ethersproject/providers";
import { RPCMethod, Web3ErrorCode } from "constants/web3";
import {
  ChainId,
  CHAIN_ID_TO_NAME,
  CHAIN_SETTING,
  SUPPORTED_CHAIN_IDS,
} from "constants/chains";
import { hexValue } from "ethers/lib/utils";

const DISPLAYED_CHAINS = SUPPORTED_CHAIN_IDS;

const Header: React.FC = () => {
  const { account, activate, library, chainId } = useWeb3React<Web3Provider>();
  const [ens, setENS] = useState<string | null>(null);

  const getENS = async () => {
    if (!library || !account) return;
    setENS(await library.lookupAddress(account));
  };

  useEffect(() => {
    getENS();
  }, [account]);

  const switchChain = useCallback(
    (desiredChainId: number) => {
      if (!library) return;

      try {
        library.send(RPCMethod.SWITCH_CHAIN, [
          { chainId: hexValue(desiredChainId) },
        ]);
      } catch (err) {
        if (err && err.code === Web3ErrorCode.CHAIN_NOT_ADDED)
          library.send(RPCMethod.ADD_CHAIN, [CHAIN_SETTING[desiredChainId]]);
      }
    },
    [library]
  );

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
        <Link to="/requests">Requests</Link>
        <Link to="/souls">Souls</Link>
        {account && <Link to={`/soul/${account}`}>Soul</Link>}
        <Link to="/claim">Claim</Link>
        {/* <ALink href="https://pools.proofofhumanity.id/">Pools</ALink> */}
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
              {CHAIN_ID_TO_NAME[chainId || ChainId.RINKEBY]}
            </button>
          }
        >
          <div className="flex flex-col">
            {DISPLAYED_CHAINS.map((chainId) => (
              <button
                key={chainId}
                className="cursor-pointer"
                onClick={() => switchChain(chainId)}
              >
                {CHAIN_ID_TO_NAME[chainId]}
              </button>
            ))}
          </div>
        </Popover>

        <button
          className="mr-2 py-1 px-4
                     border border-white rounded
                     text-white text-sm"
          onClick={() => activate(injected)}
        >
          {!!account ? (ens ? ens : shortenAddress(account)) : "Connect"}
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
