import { ChainId } from "enums/ChainId";
import { PoHContract } from "enums/PoHContract";
import { ContractInterface } from "ethers";
import CrossChainProofOfHumanityABI from "../assets/contracts/CrossChainProofOfHumanity.json";
import KlerosLiquidABI from "../assets/contracts/KlerosLiquid.json";
import ProofOfHumanityABI from "../assets/contracts/ProofOfHumanity.json";

export const CONTRACT: Record<
  PoHContract,
  { ABI: ContractInterface } & Record<number, string>
> = {
  [PoHContract.PROOF_OF_HUMANITY]: {
    ABI: ProofOfHumanityABI,
    [ChainId.GOERLI]: "0x1B3dE9B7929870e66F8F7FBe8868622Ed3bB0C7c",
    [ChainId.OPGOERLI]: "0x363Fa6B255B9C3F7E548652075d65c62fE4E46Aa",
    // [ChainId.GNOSIS]: "0x31B679253D53A18Eb793e023e7EFCed5160d7fD6",
  },
  [PoHContract.CROSS_CHAIN_POH]: {
    ABI: CrossChainProofOfHumanityABI,
    [ChainId.GOERLI]: "0x27c9C7EC137229EEb8E22d9f03084D385b424C78",
    [ChainId.OPGOERLI]: "0xE4885BDd3dbCa86Bca7A55c0D24F73Bc2A3069EA",
    // [ChainId.GNOSIS]: "0x566cE77b009534F18928857B6F1BFAc2aC68a37e",
  },
  [PoHContract.ARBITRATOR]: {
    ABI: KlerosLiquidABI,
    [ChainId.GOERLI]: "0x08db8fd559cb4e3668f994553871c7eba7c3941a",
    [ChainId.OPGOERLI]: "0xf22c6c228e4240199b4c645d06903723df606768",
    // [ChainId.GNOSIS]: "0x9de81cf9b4b46046c1a87fdc71ae55566919be64",
  },
};
