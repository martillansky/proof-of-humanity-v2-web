import multicall3 from "./multicall3";
import klerosLiquid from "./kleros-liquid";
import crossChainProofOfHumanity from "./cross-chain-proof-of-humanity";
import proofOfHumanity from "./proof-of-humanity";
import gnosisAMBHelper from "./gnosis-amb-helper";
import ethereumAMBBridge from "./ethereum-amb-bridge";

const abis = {
  ProofOfHumanity: proofOfHumanity,
  KlerosLiquid: klerosLiquid,
  CrossChainProofOfHumanity: crossChainProofOfHumanity,
  GnosisAMBHelper: gnosisAMBHelper,
  EthereumAMBBridge: ethereumAMBBridge,
  // CirclesHub: ProofOfHumanityAbi,
  // PoHGroupCurrencyManager: ProofOfHumanityAbi,
  // GroupCurrencyToken: ProofOfHumanityAbi,
  Multicall3: multicall3,
} as const;

export default abis;
