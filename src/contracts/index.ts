import { sepolia } from "viem/chains";

export const Contract = {
  ProofOfHumanity: {
    [sepolia.id]: "0xf22c6c228e4240199b4c645d06903723df606768",
  },
  // CrossChainProofOfHumanity: {
  //   [sepolia.id]: "0x0000000000000000000000000000000000000000",
  // },
  KlerosLiquid: {
    [sepolia.id]: "0x90992fb4E15ce0C59aEFfb376460Fda4Ee19C879",
  },
  // GroupCurrencyToken: {
  //   [sepolia.id]: "0x0000000000000000000000000000000000000000",
  // },
  // CirclesHub: {
  //   [sepolia.id]: "0x0000000000000000000000000000000000000000",
  // },
  // PoHGroupCurrencyManager: {
  //   [sepolia.id]: "0x0000000000000000000000000000000000000000",
  // },
  Multicall3: {
    [sepolia.id]: "0x0000000000000000000000000000000000000000",
  },
} as const;

export type ContractName = keyof typeof Contract;
