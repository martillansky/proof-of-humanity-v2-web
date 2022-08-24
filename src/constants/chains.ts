import { hexValue } from "ethers/lib/utils";

export enum ChainId {
  // MAINNET = 1,
  RINKEBY = 4,
}

const INFURA_KEY = process.env.INFURA_KEY;

export const RPC_ENDPOINTS: { [key in ChainId]: string } = {
  // [ChainId.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  [ChainId.RINKEBY]: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
};

export const CHAIN_ID_TO_NAME = {
  // [ChainId.MAINNET]: "mainnet",
  [ChainId.RINKEBY]: "Rinkeby",
};

export const SUPPORTED_CHAIN_IDS = [ChainId.RINKEBY];
export const FALLBACK_CHAIN = ChainId.RINKEBY;

export const CHAIN_SETTING = {
  // [ChainId.MAINNET]: {
  //   chainId: hexValue(ChainId.MAINNET),
  //   chainName: CHAIN_ID_TO_NAME[ChainId.MAINNET],
  //   nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  //   rpcUrls: [RPC_ENDPOINTS[ChainId.MAINNET]],
  //   blockExplorerUrls: ["https://etherscan.io"],
  // },
  [ChainId.RINKEBY]: {
    chainId: hexValue(ChainId.RINKEBY),
    chainName: CHAIN_ID_TO_NAME[ChainId.RINKEBY],
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
    rpcUrls: [RPC_ENDPOINTS[ChainId.RINKEBY]],
    blockExplorerUrls: ["https://rinkeby.etherscan.io"],
  },
};
