export const subgraphEndpoints = {
  [1]: "https://api.thegraph.com/subgraphs/name/kleros/proof-of-humanity-mainnet",
  [42]: "https://api.thegraph.com/subgraphs/name/kleros/proof-of-humanity-kovan",
};

export const DISPLAY_BATCH = 12;

export const supportedChains = { [1]: "Mainnet", [42]: "Kovan" };

export const chainIDs = Object.keys(supportedChains);
export type ChainID = keyof typeof supportedChains;
