import { ChainId } from "./chains";

export const SUBGRAPH_ENDPOINTS = {
  [ChainId.RINKEBY]: "https://api.thegraph.com/subgraphs/name/andreimvp/poh-v2",
  [ChainId.MAINNET]:
    "https://api.thegraph.com/subgraphs/name/andreimvp/poh-v1-in-v2-shoes",
  [ChainId.GNOSIS]: "https://api.thegraph.com/subgraphs/name/andreimvp/poh-v2",
};
