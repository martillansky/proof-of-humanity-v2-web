import { cache } from "react";
import { SupportedChainId, supportedChains } from "config/chains";
import { sdk } from "config/subgraph";
import { Address } from "viem";
import { ClaimerQuery } from "generated/graphql";
import { getTrasferringRequest } from "./request";
import { getHumanityData } from "./humanity";

export const getClaimerData = cache(async (id: Address) => {
  const res = await Promise.all(
    supportedChains.map((chain) => sdk[chain.id].Claimer({ id }))
  );

  const out = supportedChains.reduce(
    (acc, chain, i) => ({ ...acc, [chain.id]: res[i] }),
    {} as Record<SupportedChainId, ClaimerQuery>
  );

  const voucherEvidenceChain = supportedChains.find(
    (chain) => out[chain.id].claimer?.registration?.humanity.winnerClaim
  );

  if (voucherEvidenceChain) {
    const isClaimerIncomplete = out[voucherEvidenceChain.id].claimer!.registration!.humanity.winnerClaim.at(0)!.evidenceGroup.evidence.length===0;
    if (isClaimerIncomplete) {
      const transferringRequest = await getTrasferringRequest(voucherEvidenceChain.id, id);
      out[voucherEvidenceChain.id].claimer!.name = transferringRequest?.claimer.name;
      if (!!transferringRequest?.evidenceGroup.evidence) {
        out[voucherEvidenceChain.id].claimer!.registration!.humanity.winnerClaim.at(0)!.evidenceGroup.evidence = JSON.parse(JSON.stringify(transferringRequest?.evidenceGroup.evidence));
      }
    }
  } else { // If profile has been bridged, we need to look for the crossChainRegistration
    const voucherEvidenceChain = supportedChains.find(
      (chain) => !out[chain.id].claimer?.registration
    );
  
    if (voucherEvidenceChain) {
      const humanityData = await getHumanityData(id);

      const voucherEvidenceChain = supportedChains.find(
        (chain) => humanityData[chain.id].crossChainRegistration || humanityData[chain.id].humanity
      );
    
      if (voucherEvidenceChain) { // Missing IPFS is in crossChainRegistration
        if (!!humanityData[voucherEvidenceChain.id].humanity?.winnerClaim.at(0)?.evidenceGroup.evidence) {
          out[voucherEvidenceChain.id].claimer!['registration'] = JSON.parse(JSON.stringify(humanityData[voucherEvidenceChain.id]));
        } else {
          // Missing IPFS is not in a winnerClaim, we will look for it in some previous request
          if (humanityData[voucherEvidenceChain.id].humanity?.requests) {
            const evidence = humanityData[voucherEvidenceChain.id].humanity?.requests.at(0)?.evidenceGroup;
            if (evidence) {
              out[voucherEvidenceChain.id].claimer!['registration'] = {
                'humanity': {
                  'id': id, 
                  'winnerClaim': [
                    {
                      'index': 0, 
                      'resolutionTime': 0, 
                      'evidenceGroup': evidence
                    }
                  ]
                }
              };
            }
          }
        }
      }
    }  
  }
  return out;
});
