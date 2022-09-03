import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { isNumber } from "lodash";
import { ChainId, RPC_ENDPOINT } from "constants/chains";

export const network = (chainId: ChainId) =>
  new NetworkConnector({
    urls: RPC_ENDPOINT,
    defaultChainId: chainId,
  });

export const injected = new InjectedConnector({
  supportedChainIds: Object.keys(ChainId)
    .map((c) => Number(c))
    .filter((c) => isNumber(c)),
});
