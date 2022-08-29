import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import {
  FALLBACK_CHAIN,
  RPC_ENDPOINTS,
  WATCH_CHAIN_IDS,
} from "constants/chains";

export const network = new NetworkConnector({
  urls: RPC_ENDPOINTS,
  defaultChainId: FALLBACK_CHAIN,
});

export const injected = new InjectedConnector({
  supportedChainIds: WATCH_CHAIN_IDS,
});
