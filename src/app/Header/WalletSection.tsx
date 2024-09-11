import { useWeb3Modal } from "@web3modal/react";
import ChainLogo from "components/ChainLogo";
import { shortenAddress } from "utils/address";

interface WalletSectionProps {
  web3Loaded: boolean;
  isConnected: boolean;
  address?: `0x${string}`;
  chain: { id: number; name: string };
}

const WalletSection = ({
  web3Loaded,
  isConnected,
  address,
  chain,
}: WalletSectionProps) => {
  const modal = useWeb3Modal();

  return (
    <div className="md:flex justify-self-center md:w-fit md:justify-self-end col-span-2 md:col-span-1 flex flex-wrap items-center gap-y-[12px] md:gap-y-0">
      {web3Loaded && isConnected && address ? (
        <div className="flex">
          <button
            className="px-2 h-8 centered border-2 border-r-0 border-white/20 rounded-l bg-white/10 hover:bg-white/40 text-white"
            onClick={() => modal.open({ route: "SelectNetwork" })}
          >
            <ChainLogo chainId={chain.id} className="w-4 h-4 mr-1 fill-white" />
            {chain.name.split(" ").at(-1)}
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
          Connect
        </button>
      )}
    </div>
  );
};

export default WalletSection;
