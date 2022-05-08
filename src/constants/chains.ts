export enum ChainID {
  MAINNET = 1,
  KOVAN = 42,
}

export const CHAIN_ID_TO_NAME = {
  [ChainID.MAINNET]: "mainnet",
  [ChainID.KOVAN]: "kovan",
};

export const SUPPORTED_CHAIN_IDS = [ChainID.MAINNET, ChainID.KOVAN];
