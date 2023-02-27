import { ChainId } from "enums/ChainId";

export const SUBGRAPH_ENDPOINTS = {
  [ChainId.GOERLI]:
    "https://api.thegraph.com/subgraphs/name/andreimvp/poh-goerli-ext",
  // "https://api.thegraph.com/subgraphs/name/andreimvp/poh-goerli",
  [ChainId.OPGOERLI]:
    "https://api.thegraph.com/subgraphs/name/andreimvp/poh-opgoerli",
  // [ChainId.GNOSIS]:
  //   "https://api.thegraph.com/subgraphs/name/andreimvp/poh-gnosis",
};
