import { UAuthConnector } from "@uauth/web3-react";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import MetamaskIcon from "assets/svg/wallets/Metamask.svg";
import UnstoppableDomainsIcon from "assets/svg/wallets/UnstoppableDomains.svg";
import WalletConnectIcon from "assets/svg/wallets/WalletConnect.svg";
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
  icon: React.FC<React.SVGAttributes<SVGElement>>;
  mobile?: true;
}

export const SupportedWallets: Record<string, WalletInfo> = {
  INJECTED: {
    connector: injected,
    name: "Injected",
    icon: MetamaskIcon,
  },
  METAMASK: {
    connector: injected,
    name: "MetaMask",
    icon: MetamaskIcon,
  },
  METAMASK_MOBILE: {
    name: "MetaMask",
    mobile: true,
    icon: MetamaskIcon,
  },
  WALLET_CONNECT: {
    connector: walletConnect,
    name: "WalletConnect",
    icon: WalletConnectIcon,
    mobile: true,
  },
  UNSTOPPABLE: {
    connector: uAuth,
    name: "UnstoppableDomains",
    icon: UnstoppableDomainsIcon,
    mobile: true,
  },
};

export const WALLET_LIST = [
  SupportedWallets.INJECTED,
  SupportedWallets.WALLET_CONNECT,
  SupportedWallets.UNSTOPPABLE,
];

export const getIsInjected = () => Boolean(window.ethereum);
export const getIsMetaMask = () => window.ethereum?.isMetaMask ?? false;
