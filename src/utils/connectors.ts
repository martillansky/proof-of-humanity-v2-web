import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { isNumber } from "lodash";
import { ChainId, FALLBACK_CHAIN, RPC_ENDPOINTS } from "constants/chains";

export const network = new NetworkConnector({
  urls: RPC_ENDPOINTS,
  defaultChainId: FALLBACK_CHAIN,
});

export const injected = new InjectedConnector({
  supportedChainIds: Object.keys(ChainId)
    .map((c) => Number(c))
    .filter((c) => isNumber(c)),
});
