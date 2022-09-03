import { ContractInterface } from "ethers";
import KlerosLiquidABI from "../assets/contracts/KlerosLiquid.json";
import ProofOfHumanityABI from "../assets/contracts/ProofOfHumanity.json";
import { ChainId } from "./chains";

export enum Contracts {
  PROOF_OF_HUMANITY,
  KLEROS_LIQUID,
}

export const ABI: Record<Contracts, ContractInterface> = {
  [Contracts.PROOF_OF_HUMANITY]: ProofOfHumanityABI,
  [Contracts.KLEROS_LIQUID]: KlerosLiquidABI,
};

export const CONTRACT_ADDRESS: Record<Contracts, Record<ChainId, string>> = {
  [Contracts.PROOF_OF_HUMANITY]: {
    [ChainId.RINKEBY]: "0x801C5D176A853c19e92A753aA43eab6c65797927",
    [ChainId.MAINNET]: "0x801C5D176A853c19e92A753aA43eab6c65797927",
    [ChainId.GNOSIS]: "0xC986062173bed7ee228FfBcaD22951856a625998",
  },
  [Contracts.KLEROS_LIQUID]: {
    [ChainId.RINKEBY]: "0x6e376E049BD375b53d31AFDc21415AeD360C1E70",
    [ChainId.MAINNET]: "0x6e376E049BD375b53d31AFDc21415AeD360C1E70",
    [ChainId.GNOSIS]: "0x9C1dA9A04925bDfDedf0f6421bC7EEa8305F9002",
  },
};
