import multicall3 from "./multicall3";
import klerosLiquid from "./kleros-liquid";
import gnosisAMBHelper from "./gnosis-amb-helper";
import ethereumAMBBridge from "./ethereum-amb-bridge";
import { ChainSet, configSetSelection } from "contracts";
import abisMainnets from "./mainnets";
import abisTestnets from "./testnets";

const abis = (configSetSelection.chainSet === ChainSet.MAINNETS)? {
  ProofOfHumanity: abisMainnets.ProofOfHumanity,
  KlerosLiquid: klerosLiquid,
  CrossChainProofOfHumanity: abisMainnets.CrossChainProofOfHumanity,
  GnosisAMBHelper: gnosisAMBHelper,
  EthereumAMBBridge: ethereumAMBBridge,
  Multicall3: multicall3,
} : {
  ProofOfHumanity: abisTestnets.ProofOfHumanity,
  KlerosLiquid: klerosLiquid,
  CrossChainProofOfHumanity: abisTestnets.CrossChainProofOfHumanity,
  GnosisAMBHelper: gnosisAMBHelper,
  EthereumAMBBridge: ethereumAMBBridge,
  Multicall3: multicall3,
} as const;

export default abis;
