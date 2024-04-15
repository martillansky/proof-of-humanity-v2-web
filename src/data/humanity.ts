import { cache } from "react";
import { SupportedChainId, getForeignChain, supportedChains } from "config/chains";
import { sdk } from "config/subgraph";
import { HumanityQuery } from "generated/graphql";
import { Hash } from "viem";

export const getHumanityData = cache(async (pohId: Hash) => {
  const res = await Promise.all(
    supportedChains.map((chain) => sdk[chain.id].Humanity({ id: pohId }))
  );
  
  const out = supportedChains.reduce(
    (acc, chain, i) => ({ ...acc, [chain.id]: res[i] }),
    {} as Record<SupportedChainId, HumanityQuery>
  );

  supportedChains.forEach(chain => {
    const incompleteRequests = out[chain.id].humanity?.requests.filter(req => 
      (!req.evidenceGroup || !req.evidenceGroup.evidence || req.evidenceGroup.evidence.length === 0 || !req.claimer.name)
    );
    if (incompleteRequests) {
      incompleteRequests.map(req => {
        const pohId = req.claimer.id;
        const transferringRequest = out[getForeignChain(chain.id)].humanity?.requests
          .find(req => req.claimer.id === pohId && req.index === out[getForeignChain(chain.id)].humanity?.winnerClaim.at(0)?.index
        );
        req.claimer.name = transferringRequest?.claimer.name;
        if (!!transferringRequest?.evidenceGroup.evidence) {
          req.evidenceGroup.evidence = JSON.parse(JSON.stringify(transferringRequest?.evidenceGroup.evidence));
          out[chain.id].humanity!.winnerClaim.at(0)!.evidenceGroup.evidence = JSON.parse(JSON.stringify(transferringRequest?.evidenceGroup.evidence));
        }
      })
    }
  
    out[chain.id].humanity?.requests.filter(req => {
      return (req.status.id === 'resolved' && 
      out[chain.id].humanity?.winnerClaim.at(0)?.index === req.index && 
      !(out[chain.id].humanity?.requests.find(reqG => reqG.index > req.index)) && 
      out[chain.id].crossChainRegistration &&
      out[chain.id].outTransfer
      )
    }).forEach(req => req.status.id = "transferred");
  })
  return out;
});
