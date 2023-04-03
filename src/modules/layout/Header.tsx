import cn from "classnames";
import { ChainId } from "enums/ChainId";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useMeQuery } from "api/useMeQuery";
import ALink from "components/ALink";
import Modal from "components/Modal";
import Popover from "components/Popover";
import { CHAIN, supportedChainIds } from "constants/chains";
import { MeQuery } from "generated/graphql";
import useSwitchChain from "hooks/useSwitchChain";
import useWeb3 from "hooks/useWeb3";
import { shortenAddress } from "utils/address";
import { camelToTitle } from "utils/case";
import {
  SupportedWallets,
  WALLET_LIST,
  getIsMetaMask,
  injected,
} from "utils/connectors";
import { prettifyId } from "utils/identifier";
import ProofOfHumanityLogo from "../../assets/svg/ProofOfHumanityLogo.svg";

const Header: React.FC = () => {
  const { active, activate, chainId, account, connector, deactivate } =
    useWeb3();

  const switchChain = useSwitchChain();
  const me = useMeQuery(account);

  const [humanity, setHumanity] = useState<string>();
  const [currentRequest, setCurrentRequest] = useState<{
    chain: ChainId;
    data: NonNullable<NonNullable<MeQuery["claimer"]>["currentRequest"]>;
  }>();

  useEffect(() => {
    if (!me) return;

    const homeChain = supportedChainIds.find((chain) => me[chain]?.humanity);

    if (homeChain) return setHumanity(prettifyId(me[homeChain]!.humanity!.id));

    const requestChain = supportedChainIds.find(
      (chain) => me[chain]?.currentRequest
    );

    if (requestChain)
      setCurrentRequest({
        chain: requestChain,
        data: me[requestChain]!.currentRequest!,
      });
  }, [me]);

  const connectorName = useMemo(
    () =>
      Object.keys(SupportedWallets)
        .filter(
          (k) =>
            SupportedWallets[k].connector === connector &&
            (connector !== injected || getIsMetaMask() === (k === "METAMASK"))
        )
        .map((k) => SupportedWallets[k].name)[0],
    [connector]
  );

  return (
    <nav
      className="px-8 pb-2 sm:pt-2
                 w-full flex justify-between
                 text-white text-lg
                 gradient shadow-sm"
    >
      <Link to="/" className="flex items-center">
        <ProofOfHumanityLogo height={32} width={32} />
        <div className="ml-2 flex flex-col font-thin leading-5">
          <span>PROOF OF</span>
          <span>HUMANITY</span>
        </div>
      </Link>

      <div className="flex flex-col sm:flex-row">
        <div
          className="my-2 sm:mr-12 flex gap-12
                     font-bold whitespace-nowrap"
        >
          <Link to="/">Requests</Link>
          {humanity ? (
            <Link to={`/humanity/${humanity}`}>Me</Link>
          ) : currentRequest ? (
            <Link
              to={`/request/${CHAIN[
                currentRequest.chain
              ].NAME.toLowerCase()}/${prettifyId(
                currentRequest.data.humanity.id
              )}/${currentRequest.data.index}`}
            >
              Me
            </Link>
          ) : (
            account && <Link to="/claim">Claim</Link>
          )}
        </div>

        <div className="justify-self-center sm:w-fit sm:justify-self-end col-span-2 sm:col-span-1 flex items-center">
          <Modal
            className="flex-col bg-white p-4 w-4/5 md:w-1/2"
            trigger={
              <button
                className="mr-2 px-2 h-8 centered
                         border-2 border-white rounded bg-white/10
                         text-white text-sm font-semibold"
              >
                {active && !!account ? (
                  <>
                    <div className="dot mr-1 bg-white" />
                    {supportedChainIds.find((c) => c === chainId) ? (
                      CHAIN[chainId as ChainId].NAME
                    ) : (
                      <>Unsupported</>
                    )}
                    <div className="w-0.5 h-full mx-2 bg-white" />
                    {shortenAddress(account)}
                    {/* {ens ?? shortenAddress(account)} */}
                  </>
                ) : (
                  <>Connect Wallet</>
                )}
              </button>
            }
          >
            {active ? (
              <>
                {chainId && account && (
                  <div className="mb-2 centered uppercase font-semibold">
                    <span className="mr-4">{CHAIN[chainId].NAME}</span>
                    <span>{shortenAddress(account)}</span>
                  </div>
                )}
                <div className="grid grid-cols-3 gap-4">
                  {supportedChainIds.map((chain) => {
                    const ChainLogo = CHAIN[chain].Logo;
                    return (
                      <button
                        key={chain}
                        className={cn(
                          "p-4 flex flex-col items-center border cursor-pointer bg-shade-50 rounded",
                          { "border border-orange-500": chain === chainId }
                        )}
                        onClick={() => switchChain(chain)}
                      >
                        <ChainLogo className="w-8 h-8 mb-2" />
                        {CHAIN[chain].NAME}
                      </button>
                    );
                  })}
                </div>

                <div className="p-4 mt-8 flex justify-between cursor-pointer">
                  {connector && <span>Connected with {connectorName}</span>}
                  <button className="text-red-500" onClick={deactivate}>
                    Disconnect
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="centered uppercase font-semibold">
                  Choose a wallet to connect with
                </span>
                <div className="grid grid-cols-3">
                  {WALLET_LIST.map((wallet) => (
                    <button
                      key={wallet.name}
                      className="p-4 m-2 flex flex-col justify-center items-center bg-shade-50 rounded cursor-pointer"
                      onClick={async () =>
                        wallet.connector && activate(wallet.connector)
                      }
                    >
                      <wallet.icon className="mb-4 w-16 h-16 fill-sky-500" />
                      {camelToTitle(wallet.name)}
                    </button>
                  ))}
                </div>
              </>
            )}
          </Modal>

          <button
            className="mr-2 w-6 h-6
                     centered bg-white
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
              <ALink href="https://t.me/proofhumanity">
                Get Help (English)
              </ALink>
              <ALink href="https://t.me/proofhumanity">
                Get Help (Spanish)
              </ALink>
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
      </div>
    </nav>
  );
};

export default Header;
