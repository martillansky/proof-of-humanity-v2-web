import ProofOfHumanityABI from "../assets/contracts/ProofOfHumanity.json";
import KlerosLiquidABI from "../assets/contracts/KlerosLiquid.json";
import { ChainId } from "./chains";
import { ContractInterface } from "ethers";

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
    [ChainId.RINKEBY]: "0x875456fBCE51B5c66DE7a3DCB30D24d0630344bC",
  },
  [Contracts.KLEROS_LIQUID]: {
    [ChainId.RINKEBY]: "0x6e376E049BD375b53d31AFDc21415AeD360C1E70",
  },
};
