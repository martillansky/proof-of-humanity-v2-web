import { cache } from "react";
import { SupportedChainId, supportedChains } from "config/chains";
import { sdk } from "config/subgraph";
import { Address } from "viem";
import { ClaimerQuery } from "generated/graphql";
import { getTrasferringRequest } from "./request";

export const getClaimerData = cache(async (id: Address) => {
  const res = await Promise.all(
    supportedChains.map((chain) => sdk[chain.id].Claimer({ id }))
  );

  const out = supportedChains.reduce(
    (acc, chain, i) => ({ ...acc, [chain.id]: res[i] }),
    {} as Record<SupportedChainId, ClaimerQuery>
  );

  const voucherEvidenceChain = supportedChains.find(
    (chain) =>
      out[chain.id].claimer?.registration?.humanity.winnerClaim
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
  }
  return out;
});
