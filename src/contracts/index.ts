import { gnosis, sepolia } from "viem/chains";

export const Contract = {
  ProofOfHumanity: {
    [sepolia.id]: "0x566cE77b009534F18928857B6F1BFAc2aC68a37e",
    [gnosis.id]: "0x31c78674f3C97f3E88938DB18CC163a60Ba657BA",
  },
  CrossChainProofOfHumanity: {
    [sepolia.id]: "0x918E7d86D286bB1E9f77da621717c9BF0385992C",
    [gnosis.id]: "0x8C2858b87D98262fa79c7b10a47840a81E057B85",
  },
  Multicall3: {
    [sepolia.id]: sepolia.contracts.multicall3.address,
    [gnosis.id]: gnosis.contracts.multicall3.address,
  },
  // GroupCurrencyToken: {
  //   [sepolia.id]: "0x0000000000000000000000000000000000000000",
  //   [gnosis.id]: "0x0000000000000000000000000000000000000000",
  // },
  // CirclesHub: {
  //   [sepolia.id]: "0x0000000000000000000000000000000000000000",
  //   [gnosis.id]: "0x0000000000000000000000000000000000000000",
  // },
  // PoHGroupCurrencyManager: {
  //   [sepolia.id]: "0x0000000000000000000000000000000000000000",
  //   [gnosis.id]: "0x0000000000000000000000000000000000000000",
  // },
} as const;

export type ContractName = keyof typeof Contract;
