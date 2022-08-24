import { ChainId } from "./chains";

export const SUBGRAPH_ENDPOINTS: { [key in ChainId]: string } = {
  [ChainId.RINKEBY]: "https://api.thegraph.com/subgraphs/name/andreimvp/poh-v2",
};
