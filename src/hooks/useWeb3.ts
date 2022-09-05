import { Web3Provider } from "@ethersproject/providers";
import { Connector } from "@web3-react/types";
import { ChainId } from "constants/chains";
import { injected, network } from "./connectors";

interface Web3Interface {
  connector: Connector;
  account?: string;
  chainId?: ChainId;
  isActive: boolean;
  provider?: Web3Provider;
  ENSName?: string;
}

const useWeb3 = (useNetwork: boolean = true): Web3Interface => {
  const networkState = {
    connector: network.connector,
    chainId: network.hooks.useChainId(),
    isActive: network.hooks.useIsActive(),
    provider: network.hooks.useProvider(),
  };

  const injectedState = {
    connector: injected.connector,
    ENSName: injected.hooks.useENSName(),
    account: injected.hooks.useAccount(),
    chainId: injected.hooks.useChainId(),
    isActive: injected.hooks.useIsActive(),
    provider: injected.hooks.useProvider(),
  };

  return useNetwork ? networkState : injectedState;
};

export default useWeb3;
