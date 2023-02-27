import { UAuthConnector } from "@uauth/web3-react";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { RPC, supportedChainIds } from "constants/chains";
import { getNetworkConnector } from "./network";

export const network = getNetworkConnector();

export const injected = new InjectedConnector({
  supportedChainIds: supportedChainIds,
});

export const walletConnect = new WalletConnectConnector({
  rpc: RPC,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  supportedChainIds: supportedChainIds,
});

export const uAuth = new UAuthConnector({
  clientID: "uauth_example_spa_id",
  redirectUri: "http://localhost:1234/callback",
  postLogoutRedirectUri: "http://localhost:1234",

  // Scope must include openid and wallet
  scope: "openid wallet",

  // Injected and walletconnect connectors are required.
  connectors: { injected, walletconnect: walletConnect },
});

export interface WalletInfo {
  connector?: AbstractConnector;
  name: string;
  mobile?: true;
}

export const SupportedWallets: Record<string, WalletInfo> = {
  INJECTED: {
    connector: injected,
    name: "Injected",
  },
  METAMASK: {
    connector: injected,
    name: "MetaMask",
  },
  METAMASK_MOBILE: {
    name: "MetaMask",
    mobile: true,
  },
  WALLET_CONNECT: {
    connector: walletConnect,
    name: "WalletConnect",
    mobile: true,
  },
  UNSTOPPABLE: {
    connector: uAuth,
    name: "UnstoppableDomains",
    mobile: true,
  },
};

export const WALLET_LIST = Object.keys(
  SupportedWallets
) as (keyof typeof SupportedWallets)[];

export const getIsInjected = () => Boolean(window.ethereum);
export const getIsMetaMask = () => window.ethereum?.isMetaMask ?? false;
