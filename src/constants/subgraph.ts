import { ChainId } from "./chains";

export const SUBGRAPH_ENDPOINTS: { [key in ChainId]: string } = {
  [ChainId.MAINNET]:
    "https://api.thegraph.com/subgraphs/name/kleros/proof-of-humanity-mainnet",
  [ChainId.KOVAN]:
    "https://api.thegraph.com/subgraphs/name/kleros/proof-of-humanity-kovan",
};
