import { Web3ReactHooks, initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { Network } from "@web3-react/network";
import { Connector } from "@web3-react/types";
import { WalletConnect } from "@web3-react/walletconnect";
import { FALLBACK_CHAIN, RPC_ENDPOINT } from "constants/chains";

export enum ConnectionType {
  NETWORK = "NETWORK",
  INJECTED = "INJECTED",
  WALLET_CONNECT = "WALLET_CONNECT",
}

export interface Connection {
  connector: Connector;
  hooks: Web3ReactHooks;
  type: ConnectionType;
}

const [web3Network, web3NetworkHooks] = initializeConnector<Network>(
  (actions) =>
    new Network({
      actions,
      urlMap: RPC_ENDPOINT,
      defaultChainId: FALLBACK_CHAIN,
    })
);

export const network: Connection = {
  connector: web3Network,
  hooks: web3NetworkHooks,
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

const [web3WalletConnect, web3WalletConnectHooks] =
  initializeConnector<WalletConnect>(
    (actions) =>
      new WalletConnect({
        actions,
        options: { rpc: RPC_ENDPOINT, qrcode: true },
        onError: (err) => console.debug("WalletConnect error:", err),
      })
  );

export const walletConnect: Connection = {
  connector: web3WalletConnect,
  hooks: web3WalletConnectHooks,
  type: ConnectionType.WALLET_CONNECT,
};

export const getIsInjected = () => Boolean(window.ethereum);
export const getIsMetaMask = () => window.ethereum?.isMetaMask ?? false;

export const isNetwork = (c: Connector) => c === network.connector;

const SUPPORTED_CONNECTIONS = [
  ConnectionType.NETWORK,
  ConnectionType.INJECTED,
  ConnectionType.WALLET_CONNECT,
];

export const SHOWN_CONNECTIONS = [
  ConnectionType.INJECTED,
  ConnectionType.WALLET_CONNECT,
];

export const ConnectionMapping = {
  [ConnectionType.NETWORK]: network,
  [ConnectionType.INJECTED]: injected,
  [ConnectionType.WALLET_CONNECT]: walletConnect,
};

export const getConnection = (c: Connector) => {
  const connection = SUPPORTED_CONNECTIONS.find(
    (conn) => ConnectionMapping[conn].connector === c
  );
  if (!connection) throw Error("unsupported connector");
  return connection;
};

export function getConnectionName(
  connectionType: ConnectionType,
  isMetaMask?: boolean
) {
  switch (connectionType) {
    case ConnectionType.INJECTED:
      return isMetaMask ? "MetaMask" : "Injected";
    case ConnectionType.WALLET_CONNECT:
      return "WalletConnect";
    case ConnectionType.NETWORK:
      return "Network";
  }
}
