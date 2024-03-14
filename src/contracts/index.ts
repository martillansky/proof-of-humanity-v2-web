import { gnosis, sepolia } from "viem/chains";

export const Contract = {
  ProofOfHumanity: {
    [sepolia.id]: "0x29defF3DbEf6f79ef20d3fe4f9CFa0547acCeC0D",
    //[gnosis.id]: "0xB6412c84eC958cafcC80B688d6F473e399be488f",
    [gnosis.id]: "0x4a594f0e73223c9a1CE0EfC16da92fFaA193a612",
  },
  CrossChainProofOfHumanity: {
    [sepolia.id]: "0xd134748B972A320a73EfDe3AfF7a68718F6bA92c",
    [gnosis.id]: "0x2C692919Da3B5471F9Ac6ae1C9D1EE54F8111f76",
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
