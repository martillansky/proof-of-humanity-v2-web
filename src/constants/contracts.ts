import ProofOfHumanityABI from "../assets/contracts/ProofOfHumanity.json";
import KlerosLiquidABI from "../assets/contracts/KlerosLiquid.json";
import { ChainId } from "./chains";
import { ContractInterface } from "ethers";

export enum Contracts {
  PROOF_OF_HUMANITY,
  KLEROS_LIQUID,
}

export const ABI: { [key in Contracts]: ContractInterface } = {
  [Contracts.PROOF_OF_HUMANITY]: ProofOfHumanityABI,
  [Contracts.KLEROS_LIQUID]: KlerosLiquidABI,
};

export const CONTRACT_ADDRESS: {
  [key in Contracts]: { [key in ChainId]: string };
} = {
  [Contracts.PROOF_OF_HUMANITY]: {
    [ChainId.MAINNET]: "0xc5e9ddebb09cd64dfacab4011a0d5cedaf7c9bdb",
    [ChainId.KOVAN]: "0x73BCCE92806BCe146102C44c4D9c3b9b9D745794",
  },
  [Contracts.KLEROS_LIQUID]: {
    [ChainId.MAINNET]: "0x988b3A538b618C7A603e1c11Ab82Cd16dbE28069",
    [ChainId.KOVAN]: "0x60B2AbfDfaD9c0873242f59f2A8c32A3Cc682f80",
  },
};
