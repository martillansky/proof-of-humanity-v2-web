import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { ChainID, SUPPORTED_CHAIN_IDS } from "constants/chains";
import { RPC_ENDPOINTS } from "constants/rpcs";

export const network = new NetworkConnector({
  urls: RPC_ENDPOINTS,
  defaultChainId: ChainID.MAINNET,
});

export const injected = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAIN_IDS,
});
