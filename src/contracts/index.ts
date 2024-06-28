import { gnosis, sepolia, gnosisChiado, mainnet } from "viem/chains";

export const configSet: string = 
  "testOld";
  //"testNew";
  //"main";

export const Contract = {
  ProofOfHumanity: 
  (configSet === "testOld") ? 
  {
    [mainnet.id]: "0x29defF3DbEf6f79ef20d3fe4f9CFa0547acCeC0D", // OLD
    [sepolia.id]: "0x29defF3DbEf6f79ef20d3fe4f9CFa0547acCeC0D", // OLD
    [gnosisChiado.id]: "0x2505C87AA36d9ed18514Ea7473Ac58aeDeb50849", // OLD
    //[gnosis.id]: "0xB6412c84eC958cafcC80B688d6F473e399be488f",
    [gnosis.id]: "0x4a594f0e73223c9a1CE0EfC16da92fFaA193a612",
  } : (configSet === "testNew")? {
    [gnosis.id]: "0x4a594f0e73223c9a1CE0EfC16da92fFaA193a612",
    [mainnet.id]: "0x0D4674De96459e00A101656b799ba016fBc45dC1",
    [sepolia.id]: "0x0D4674De96459e00A101656b799ba016fBc45dC1",
    [gnosisChiado.id]: "0x2F0f39c3CF5cffc0DeACEb69d3fD883734D67687",
  } : {},
  CrossChainProofOfHumanity:
  (configSet === "testOld") ? 
  {
    [mainnet.id]: "0xd134748B972A320a73EfDe3AfF7a68718F6bA92c", //OLD
    [sepolia.id]: "0xd134748B972A320a73EfDe3AfF7a68718F6bA92c", //OLD
    [gnosisChiado.id]: "0xBEd896A3DEa0E065F05Ba83Fa63322c7b9d67838", //OLD
    [gnosis.id]: "0x2C692919Da3B5471F9Ac6ae1C9D1EE54F8111f76",
  } : (configSet === "testNew")? {
    [gnosis.id]: "0x2C692919Da3B5471F9Ac6ae1C9D1EE54F8111f76",
    [mainnet.id]: "0xDb7070C1AE12f83E709FF22c4c51993a570FDF84", 
    [sepolia.id]: "0xDb7070C1AE12f83E709FF22c4c51993a570FDF84",
    [gnosisChiado.id]: "0x2f33051DF37Edf2286E3b2B3c7883E1A13D82071",
  } : {},
  Multicall3: {
    [mainnet.id]: mainnet.contracts.multicall3.address,
    [sepolia.id]: sepolia.contracts.multicall3.address,
    [gnosis.id]: gnosis.contracts.multicall3.address,
    [gnosisChiado.id]: gnosisChiado.contracts.multicall3.address,
  },
} as const;

export type ContractName = keyof typeof Contract;
