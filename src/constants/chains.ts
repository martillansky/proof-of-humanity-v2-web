import { hexValue } from "ethers/lib/utils";

export enum ChainId {
  MAINNET = 1,
  KOVAN = 42,
}

const INFURA_KEY = process.env.INFURA_KEY;

export const RPC_ENDPOINTS: { [key in ChainId]: string } = {
  [ChainId.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  [ChainId.KOVAN]: `https://kovan.infura.io/v3/${INFURA_KEY}`,
};

export const CHAIN_ID_TO_NAME = {
  [ChainId.MAINNET]: "mainnet",
  [ChainId.KOVAN]: "kovan",
};

export const SUPPORTED_CHAIN_IDS = [ChainId.MAINNET, ChainId.KOVAN];

export const CHAIN_SETTING = {
  [ChainId.MAINNET]: {
    chainId: hexValue(ChainId.MAINNET),
    chainName: CHAIN_ID_TO_NAME[ChainId.MAINNET],
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
    rpcUrls: [RPC_ENDPOINTS[ChainId.MAINNET]],
    blockExplorerUrls: ["https://etherscan.io"],
  },
  [ChainId.KOVAN]: {
    chainId: hexValue(ChainId.KOVAN),
    chainName: CHAIN_ID_TO_NAME[ChainId.KOVAN],
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
    rpcUrls: [RPC_ENDPOINTS[ChainId.KOVAN]],
    blockExplorerUrls: ["https://kovan.etherscan.io"],
  },
};
