import cn from "classnames";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMeQuery } from "api/useMeQuery";
import ALink from "components/ALink";
import Modal from "components/Modal";
import Popover from "components/Popover";
import { CHAIN, ChainId, SUPPORTED_CHAIN_IDS } from "constants/chains";
import useChangeChain from "hooks/useChangeChain";
import useWeb3 from "hooks/useWeb3";
import { shortenAddress } from "utils/address";
import {
  ConnectionMapping,
  ConnectionType,
  SHOWN_CONNECTIONS,
  getConnection,
  getConnectionName,
  getIsMetaMask,
  injected,
  isNetwork,
} from "utils/connectors";
import { prettifyId } from "utils/identifier";
import ProofOfHumanityLogo from "../../assets/svg/ProofOfHumanityLogo.svg";

const DISPLAYED_CHAINS = SUPPORTED_CHAIN_IDS;

const Header: React.FC = () => {
  const { chainId, isActive, account, ENSName, connector } = useWeb3();
  const changeChain = useChangeChain();
  const me = useMeQuery(account);

  const [humanity, setHumanity] = useState<string>();

  useEffect(() => {
    if (!me) return;

    const homeChain = SUPPORTED_CHAIN_IDS.find((chain) => me[chain]?.humanity);

    if (!homeChain) return;

    setHumanity(prettifyId(me[homeChain]!.humanity!.id));
  }, [!!me]);

  const currentConnection =
    isActive && ConnectionType[getConnection(connector)];
  const walletConnected = currentConnection && !isNetwork(connector);

  console.log({ me });

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
        <div className="ml-2 flex flex-col font-thin leading-5">
          <span>PROOF OF</span>
          <span>HUMANITY</span>
        </div>
      </Link>

      <div
        className="my-2
                   grid grid-cols-2 sm:grid-flow-col gap-2 sm:gap-16 xl:gap-32
                   justify-items-center
                   font-bold whitespace-nowrap"
      >
        <Link to="/">Requests</Link>
        <Link to="/humanities">Humans</Link>
        {/* {account && <Link to={`/humanity/${account}`}>Humanity</Link>} */}
        {humanity && <Link to={`/humanity/${humanity}`}>Me</Link>}
        {!humanity && account && <Link to="/claim">Claim</Link>}
      </div>

      <div
        className="justify-self-center sm:justify-self-end col-span-2 sm:col-span-1
                   flex items-center"
      >
        <Modal
          className="flex-col bg-white p-4 w-4/5 md:w-1/2"
          trigger={
            <button
              className="mr-2 px-2 h-8 centered
                         border-2 border-white rounded bg-white/10
                         text-white text-sm font-semibold"
              onClick={() => injected.connector.activate()}
            >
              {isActive && !!account ? (
                <>
                  <div className="dot mr-1 bg-white" />
                  {SUPPORTED_CHAIN_IDS.find((c) => c === chainId) ? (
                    CHAIN[chainId as ChainId].NAME
                  ) : (
                    <>Unsupported</>
                  )}
                  <div className="w-0.5 h-full mx-2 bg-white" />
                  {ENSName ?? shortenAddress(account)}
                </>
              ) : (
                <>Connect Wallet</>
              )}
            </button>
          }
        >
          {walletConnected ? (
            <>
              <span className="mb-2 centered uppercase font-semibold">
                Supported chains
              </span>
              <div className="grid grid-cols-2 gap-4">
                {DISPLAYED_CHAINS.map((chain) => {
                  const ChainLogo = CHAIN[chain].Logo;
                  return (
                    <button
                      key={chain}
                      className={cn(
                        "p-4 flex flex-col items-center border cursor-pointer",
                        { "bg-slate-100": chain === chainId }
                      )}
                      onClick={() => changeChain(chain)}
                    >
                      <ChainLogo className="w-8 h-8 mb-2" />
                      {CHAIN[chain].NAME}
                    </button>
                  );
                })}
              </div>

              <div className="p-4 mt-8 flex justify-between cursor-pointer">
                <span>
                  Connected with{" "}
                  {getConnectionName(currentConnection, getIsMetaMask())}
                </span>
                <button
                  className="text-red-500"
                  onClick={() => {
                    if (connector && connector.deactivate)
                      connector.deactivate();
                    connector.resetState();
                  }}
                >
                  Disconnect
                </button>
              </div>
            </>
          ) : (
            <>
              <span className="centered uppercase font-semibold">
                Choose a wallet to connect with
              </span>
              <div className="grid grid-cols-2">
                {SHOWN_CONNECTIONS.map((connection) => (
                  <button
                    key={connection}
                    className="p-4 m-2 border cursor-pointer"
                    onClick={() => {
                      console.log(isNetwork(connector));
                      return ConnectionMapping[connection].connector.activate();
                    }}
                  >
                    {getConnectionName(connection)}
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
