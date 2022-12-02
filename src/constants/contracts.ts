import { ContractInterface } from "ethers";
import CrossChainProofOfHumanityABI from "../assets/contracts/CrossChainProofOfHumanity.json";
import KlerosLiquidABI from "../assets/contracts/KlerosLiquid.json";
import ProofOfHumanityABI from "../assets/contracts/ProofOfHumanity.json";
import { ChainId } from "./chains";

export enum Contracts {
  PROOF_OF_HUMANITY,
  CROSS_CHAIN_POH,
  ARBITRATOR,
}

export const CONTRACT: Record<
  Contracts,
  { ABI: ContractInterface } & Record<number, string>
> = {
  [Contracts.PROOF_OF_HUMANITY]: {
    ABI: ProofOfHumanityABI,
    [ChainId.GOERLI]: "0x463c5e670e90F2039819c3213C1878f72Af1e005",
    [ChainId.OPGOERLI]: "0x9De81Cf9b4B46046C1A87FdC71Ae55566919bE64",
    // [ChainId.GNOSIS]: "0x31B679253D53A18Eb793e023e7EFCed5160d7fD6",
  },
  [Contracts.CROSS_CHAIN_POH]: {
    ABI: CrossChainProofOfHumanityABI,
    [ChainId.GOERLI]: "0x612b1e73D04f0Ef66d72A0D3267f1884837D9a46",
    [ChainId.OPGOERLI]: "0xEb457616C5dcd17e49e92Fc55F557dD1262a8835",
    // [ChainId.GNOSIS]: "0x566cE77b009534F18928857B6F1BFAc2aC68a37e",
  },
  [Contracts.ARBITRATOR]: {
    ABI: KlerosLiquidABI,
    [ChainId.GOERLI]: "0x875456fBCE51B5c66DE7a3DCB30D24d0630344bC",
    [ChainId.OPGOERLI]: "0x60121D386BD939c864c234C1086a3f47614f8bc1",
    // [ChainId.GNOSIS]: "0x9de81cf9b4b46046c1a87fdc71ae55566919be64",
  },
};
