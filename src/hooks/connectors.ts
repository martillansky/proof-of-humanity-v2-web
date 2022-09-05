import { Web3ReactHooks, initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { Network } from "@web3-react/network";
import { Connector } from "@web3-react/types";
import { FALLBACK_CHAIN, RPC_ENDPOINT } from "constants/chains";

export enum ConnectionType {
  INJECTED = "INJECTED",
  NETWORK = "NETWORK",
}

export interface Connection {
  connector: Connector;
  hooks: Web3ReactHooks;
  type: ConnectionType;
}

const [web3Network, networkHooks] = initializeConnector<Network>(
  (actions) =>
    new Network({
      actions,
      urlMap: RPC_ENDPOINT,
      defaultChainId: FALLBACK_CHAIN,
    })
);

export const network: Connection = {
  connector: web3Network,
  hooks: networkHooks,
  type: ConnectionType.NETWORK,
};

const [web3Injected, web3InjectedHooks] = initializeConnector<MetaMask>(
  (actions) =>
    new MetaMask({
      actions,
      onError: (err: Error) => console.debug(`Metamask error: ${err}`),
    })
);

export const injected: Connection = {
  connector: web3Injected,
  hooks: web3InjectedHooks,
  type: ConnectionType.INJECTED,
};

export const getIsInjected = () => Boolean(window.ethereum);
export const getIsMetaMask = () => window.ethereum?.isMetaMask ?? false;
