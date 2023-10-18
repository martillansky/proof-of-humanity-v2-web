"use client";

import { useWeb3Modal } from "@web3modal/react";
import ChainLogo from "components/ChainLogo";
import ExternalLink from "components/ExternalLink";
import Popover from "components/Popover";
import withClientConnected from "components/high-order/withClientConnected";
import { supportedChains } from "config/chains";
import { sdk } from "config/subgraph";
import useWeb3Loaded from "hooks/useWeb3Loaded";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import { shortenAddress } from "utils/address";
import { prettifyId } from "utils/identifier";
import { sepolia } from "viem/chains";
import { useAccount, usePublicClient } from "wagmi";

export const getMyData = async (account: string) => {
  const res = await Promise.all(
    supportedChains.map((chain) => sdk[chain.id].Me({ id: account }))
  );

  const homeChain = supportedChains.find(
    (_, i) => res[i].claimer?.registration
  );
  const requestChain = supportedChains.find(
    (_, i) => res[i].claimer?.currentRequest
  );

  return {
    homeChain,
    pohId:
      homeChain &&
      res[supportedChains.indexOf(homeChain)].claimer!.registration!.id,
    currentRequest: requestChain && {
      chain: requestChain,
      ...res[supportedChains.indexOf(requestChain)].claimer!.currentRequest!,
    },
  };
};

interface HeaderProps extends JSX.IntrinsicAttributes {
  policy: string;
}

export default withClientConnected<HeaderProps>(function Header({ policy }) {
  const pathname = usePathname();
  const modal = useWeb3Modal();
  const { isConnected, address } = useAccount();
  const { chain } = usePublicClient();
  const web3Loaded = useWeb3Loaded();

  const { data: me } = useSWR(address, getMyData);

  return (
    <header className="px-8 pb-2 sm:pt-2 w-full flex justify-between items-center text-white text-lg gradient shadow-sm">
      <Link href="/" className="flex items-center">
        <Image
          alt="proof of humanity logo"
          src="/logo/poh-text-white.svg"
          height={48}
          width={156}
        />
      </Link>

      <div className="flex flex-col sm:flex-row">
        <div className="my-2 sm:mr-12 flex gap-12 whitespace-nowrap">
          {web3Loaded && chain.id === sepolia.id && (
            <ExternalLink href={"https://docs.scroll.io/en/user-guide/faucet/"}>
              SEP Faucet
            </ExternalLink>
          )}
          {pathname !== "/" && <Link href="/">Requests</Link>}
          {me &&
            (me.pohId ? (
              <Link href={`/${prettifyId(me.pohId)}`}>PoH ID</Link>
            ) : (
              !pathname.endsWith("/claim") && (
                <Link
                  href={
                    me.currentRequest
                      ? `/${prettifyId(me.currentRequest.humanity.id)}/${
                          me.currentRequest.chain.name
                        }/${me.currentRequest.index}`
                      : `/${prettifyId(address!)}/claim`
                  }
                >
                  Claim
                </Link>
              )
            ))}
          <ExternalLink href={policy}>Policy</ExternalLink>
        </div>

        <div className="justify-self-center sm:w-fit sm:justify-self-end col-span-2 sm:col-span-1 flex items-center">
          {web3Loaded && isConnected && address ? (
            <div className="flex">
              <button
                className="px-2 h-8 centered border-2 border-r-0 border-white/20 rounded-l bg-white/10 hover:bg-white/40 text-white"
                onClick={() => modal.open({ route: "SelectNetwork" })}
              >
                <ChainLogo
                  chainId={chain.id}
                  className="w-4 h-4 mr-1 fill-white"
                />
                {chain.name}
              </button>
              <button
                className="mr-2 px-2 h-8 centered border-2 border-white/50 rounded-r bg-white/10 hover:bg-white/40 text-white"
                onClick={() => modal.open({ route: "Account" })}
              >
                {shortenAddress(address)}
              </button>
            </div>
          ) : (
            <button
              className="mr-2 px-2 h-8 centered border-2 border-white rounded bg-white/10 text-white"
              onClick={() => modal.open({ route: "ConnectWallet" })}
            >
              Connect Wallet
            </button>
          )}

          <ExternalLink href="https://snapshot.org/#/poh.eth/">
            <Image
              alt="snapshot"
              src="/logo/snapshot.svg"
              height={16}
              width={16}
            />
          </ExternalLink>

          <Popover
            trigger={
              <button className="w-6 h-6 ml-2 border-2 border-white rounded-full font-bold text-sm">
                ?
              </button>
            }
          >
            <div className="p-2 h-fit grid grid-cols-1 gap-2">
              <ExternalLink href="https://t.me/proofhumanity">
                Get Help (English)
              </ExternalLink>
              <ExternalLink href="https://t.me/proofhumanity">
                Get Help (Spanish)
              </ExternalLink>
              <ExternalLink href="https://gov.proofofhumanity.id/">
                Forums
              </ExternalLink>
              <ExternalLink href="https://github.com/Proof-Of-Humanity/proof-of-humanity-web/issues">
                Report a bug
              </ExternalLink>
              <ExternalLink href="https://github.com/Proof-Of-Humanity/proof-of-humanity-web/issues">
                Tutorial
              </ExternalLink>
              <ExternalLink href="https://kleros.gitbook.io/docs/products/proof-of-humanity/proof-of-humanity-tutorial">
                Report a bug
              </ExternalLink>
              <ExternalLink href="https://ethereum.org/en/wallets">
                Crypto Beginner's Guide
              </ExternalLink>
              <ExternalLink href="https://kleros.gitbook.io/docs/products/proof-of-humanity/poh-faq">
                FAQ
              </ExternalLink>
            </div>
          </Popover>
        </div>
      </div>
    </header>
  );
});
