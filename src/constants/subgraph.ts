import { ChainId } from "./chains";

export const SUBGRAPH_ENDPOINTS = {
  [ChainId.GOERLI]:
    "https://api.thegraph.com/subgraphs/name/andreimvp/poh-goerli",
  [ChainId.OPGOERLI]:
    "https://api.thegraph.com/subgraphs/name/andreimvp/poh-opgoerli",
  [ChainId.MAINNET]:
    "https://api.thegraph.com/subgraphs/name/andreimvp/poh-v1-in-v2-shoes",
  [ChainId.GNOSIS]:
    "https://api.thegraph.com/subgraphs/name/andreimvp/poh-gnosis",
};
