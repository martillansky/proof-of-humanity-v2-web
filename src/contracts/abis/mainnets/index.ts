import crossChainProofOfHumanity from "./cross-chain-proof-of-humanity";
import proofOfHumanity from "./proof-of-humanity";

const abisMainnets = {
    ProofOfHumanity: proofOfHumanity,
    CrossChainProofOfHumanity: crossChainProofOfHumanity,
} as const;
  
export default abisMainnets;