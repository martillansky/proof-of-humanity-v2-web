import { ChainID } from "./chains";

const INFURA_KEY = process.env.INFURA_KEY;

export const RPC_ENDPOINTS: { [key in ChainID]: string } = {
  [ChainID.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  [ChainID.KOVAN]: `https://kovan.infura.io/v3/${INFURA_KEY}`,
};
