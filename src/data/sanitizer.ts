import { SupportedChainId, getForeignChain, supportedChains } from "config/chains";
import { sdk } from "config/subgraph";
import { ClaimerQuery, HumanityQuery, Request, RequestQuery, RequestsQuery } from "generated/graphql";
import { cache } from "react";
import { Address, Hash } from "viem";
import { genRequestId } from "./request";
import { getHumanityData } from "./humanity";

/* 
  Sanitizer module 

  Transferring requests generate a subgraph request with ids <= -100. 
  Such requests do not receive registration info which is incorporated accordingly by this module.
 */

export const sanitizeRequest = async (request: RequestQuery['request'], chainId: SupportedChainId, pohId: Hash) => {
  if (
    (request?.revocation && request?.humanity.winnerClaim && request?.humanity.winnerClaim[0].index <= -100) || 
    (request && 
      (!request.evidenceGroup || !request.evidenceGroup.evidence || request.evidenceGroup.evidence.length === 0 || 
      !request.claimer.name ||
      (!request.evidenceGroup.evidence.some(ev => ev.uri.includes("registration.json")) && !request.revocation))
    ) 
  ) {
    const res = await Promise.all(
      supportedChains.map((chain) => sdk[chain.id].Humanity({ id: pohId }))
    );
    const out = supportedChains.reduce(
      (acc, chain, i) => ({ ...acc, [chain.id]: res[i] }),
      {} as Record<SupportedChainId, HumanityQuery>
    );

    let tROut = getTransferringRequest(out, chainId, request);
    let homeChainId = tROut!.homeChainId;
    let transferringRequest = tROut?.transferringRequest;

    if ((request?.revocation && request?.humanity.winnerClaim && request?.humanity.winnerClaim[0].index <= -100)) {
      request.humanity.winnerClaim[0].evidenceGroup.evidence = transferringRequest?.evidenceGroup.evidence as any;
      return request;
    }

    if (request.index <= -100) {
      let transferringRequestComplete = (await sdk[homeChainId]["Request"]({ id: genRequestId(pohId, Number(transferringRequest!.index)) })).request;
      if (!transferringRequestComplete) {
        request.evidenceGroup = transferringRequest?.evidenceGroup as any;
        request.humanity.winnerClaim[0].evidenceGroup.evidence = transferringRequest?.evidenceGroup.evidence as any;
      } else {
        //request.humanity = transferringRequestComplete?.humanity as any;
        request.claimer = transferringRequestComplete?.claimer as any;
        request.evidenceGroup = transferringRequestComplete?.evidenceGroup as any;
        //request.challenges = transferringRequestComplete?.challenges as any;
      }
    } else {
      if (request && !request.claimer.name) {
        request.claimer.name = transferringRequest?.claimer.name;
      }
  
      if (request && (!request.evidenceGroup || !request.evidenceGroup.evidence || request.evidenceGroup.evidence.length === 0 || 
        (!request.evidenceGroup.evidence.some(ev => ev.uri.includes("registration.json")) /* && !request.revocation */))) {
        completeRequest(request as any, transferringRequest as any);
      }
    }
  }
  return request;
};


export const sanitizeHumanityRequests = (out: Record<SupportedChainId, HumanityQuery>) => {
  const isIncompleteRequest = (request: RequestsQuery['requests'][0]) => {
    return (request && (!request.evidenceGroup || !request.evidenceGroup.evidence || request.evidenceGroup.evidence.length === 0 || 
      !request.claimer.name ||
      (!request.evidenceGroup.evidence.some(ev => ev.uri.includes("registration.json")) && !request.revocation)))
  }
  
  supportedChains.forEach(chain => {
    let localIncompleteReqs = out[chain.id].humanity?.requests.filter(req => isIncompleteRequest(req as RequestsQuery['requests'][0]))
    .sort((req1, req2) => req2.creationTime - req1.creationTime);
    
    if (localIncompleteReqs) {
      for (let i = 0; i < localIncompleteReqs?.length; i++) {
        try{
          let tROut = getTransferringRequest(out, chain.id, localIncompleteReqs[i] as any);
          let transferringReq = tROut?.transferringRequest;
          completeRequest(localIncompleteReqs[i] as Request, transferringReq as any);
        } catch (e) {}
      }
    }

    let winnerClaim = out[chain.id].humanity?.winnerClaim[0];
    if (!winnerClaim?.evidenceGroup.evidence[0] || !winnerClaim?.evidenceGroup.evidence[0].uri) {
      let winnerReq = out[chain.id].humanity?.requests.find(req => req.index === winnerClaim?.index);
      if (winnerReq && winnerReq.evidenceGroup.evidence.length>0){
        out[chain.id].humanity!.winnerClaim[0]!.evidenceGroup.evidence = [{
          uri: winnerReq.evidenceGroup.evidence[0].uri as string
        }];
      } 
    }
  })
  return out;
}

export const getTransferringRequest = (
  out: Record<SupportedChainId, HumanityQuery>, chainId: SupportedChainId, request: RequestQuery['request']
): {homeChainId: SupportedChainId, transferringRequest: RequestQuery['request']} | undefined => {
  if (!request) return ;
  let transferredNumber: number;
  if (request.index<0) { 
    transferredNumber = -100-request.index;
  } else {
    var orderedBridgedRequests = out[chainId].humanity?.requests
    .filter(req => (req.index <= -100 && req.creationTime < request.creationTime))
    .sort((req1, req2) => (request.creationTime-req1.creationTime) - (request.creationTime-req2.creationTime));
    var bridgedRequest = orderedBridgedRequests?.at(0);
    transferredNumber = -100-bridgedRequest?.index;
  }
  
  var transferringRequest: any | undefined;
  let homeChainId: SupportedChainId = getForeignChain(chainId);
  var orderedTransferringRequests: any | undefined = out[homeChainId].humanity?.requests
    .filter(req => (req.status.id == "transferred"))
    .sort((req1, req2) => req1.creationTime - req2.creationTime);

  if (orderedTransferringRequests && orderedTransferringRequests.length > 0) {
    if (transferredNumber >= orderedTransferringRequests.length) { // Bridged profiles without transferring (updates w/o transfer)
      transferredNumber = orderedTransferringRequests.length-1;
    }
    
    transferringRequest = orderedTransferringRequests
      .at(transferredNumber);
  }
  if (!transferringRequest) {
    // Cases of failed transferring
    var transferringRequest: any | undefined = out[chainId].humanity?.requests
    .filter(req => (req.status.id == "transferring"))
    .sort((req1, req2) => req2.creationTime - req1.creationTime)
    .at(0);

  }
  if (!transferringRequest) return getTransferringRequest(out, homeChainId, request as RequestQuery['request']);
  if (transferringRequest!.index<0) return getTransferringRequest(out, homeChainId, transferringRequest as RequestQuery['request']);
  
  return {homeChainId, transferringRequest};
};

const completeRequest = (request: Request, transferringRequest: Request) => {
  if (request && !request.claimer.name) {
    request.claimer.name = transferringRequest?.claimer.name;
  }
  if (request && (!request.evidenceGroup || !request.evidenceGroup.evidence || request.evidenceGroup.evidence.length === 0 || 
    (!request.evidenceGroup.evidence.some(ev => ev.uri.includes("registration.json")) /* && !request.revocation */))
  ) {
    request.evidenceGroup.evidence.push(transferringRequest?.evidenceGroup.evidence[0]);
  }
}

export const getProfileLastTransferringRequest = cache(async (chainId: SupportedChainId, pohId: Hash) => {
    const res = await Promise.all(
        supportedChains.map((chain) => sdk[chain.id].Humanity({ id: pohId }))
    );
    const out = supportedChains.reduce(
        (acc, chain, i) => ({ ...acc, [chain.id]: res[i] }),
        {} as Record<SupportedChainId, HumanityQuery>
    );
    let lastTReq = out[chainId].humanity?.requests.filter(req => req.index < 100)
    .sort((req1, req2) => req2.creationTime - req1.creationTime).at(0);
    return getTransferringRequest(out, chainId, lastTReq as RequestQuery['request']);
});

export const sanitizeHeadRequests = async (
  all: Record<SupportedChainId, RequestsQuery["requests"]>,
  out: Record<SupportedChainId, RequestsQuery["requests"]>
) => {
  supportedChains.forEach(chain => {
    const incompleteRequests = out[chain.id].length>0 && out[chain.id].filter(req => 
      (
        !(!!req.evidenceGroup) || !(!!req.evidenceGroup.evidence) || req.evidenceGroup.evidence.length === 0 || !req.claimer.name || 
        ( 
          (!!req.humanity) && (!!req.humanity.winnerClaim) && (req.humanity.winnerClaim.length > 0) &&
          (
            !(!!req.humanity?.winnerClaim?.at(0)?.evidenceGroup) || 
            !(!!req.humanity?.winnerClaim?.at(0)?.evidenceGroup.evidence) || 
            req.humanity?.winnerClaim?.at(0)?.evidenceGroup.evidence.length === 0
          )
        )
      )
    );
    const foreignChainId = incompleteRequests && incompleteRequests.length>0 && getForeignChain(chain.id);
    if (incompleteRequests && foreignChainId && all[foreignChainId].length>0) {
      incompleteRequests.map(req => {
        const pohId = req.humanity.id;

        var transferringRequest = all[foreignChainId]
        .filter(req => (req.humanity.id === pohId && (req.status.id == "transferred" || req.status.id == "transferring")))
        .sort((req1, req2) => req2.creationTime - req1.creationTime)
        .at(0);
        if (!(!!transferringRequest?.evidenceGroup.evidence.at(0))) {
          transferringRequest = all[chain.id]
          .filter(req => (req.humanity.id === pohId && (req.status.id == "transferred" || req.status.id == "transferring")))
          .sort((req1, req2) => req2.creationTime - req1.creationTime)
          .at(0);
        }
        
        req.claimer.name = transferringRequest?.claimer.name;
        if (!!transferringRequest?.humanity.winnerClaim.at(0)?.evidenceGroup.evidence && req.humanity.winnerClaim.at(0)) {
          req.humanity.winnerClaim.at(0)!.evidenceGroup.evidence = JSON.parse(JSON.stringify(transferringRequest?.humanity.winnerClaim.at(0)?.evidenceGroup.evidence));
        }
        if (!!transferringRequest?.evidenceGroup.evidence) {
          req.evidenceGroup.evidence = JSON.parse(JSON.stringify(transferringRequest?.evidenceGroup.evidence));
          if (req.humanity.winnerClaim.at(0) 
            && req.humanity.winnerClaim.at(0)!.evidenceGroup.evidence.length === 0
          ) {
            req.humanity.winnerClaim.at(0)!.evidenceGroup.evidence = JSON.parse(JSON.stringify(transferringRequest?.evidenceGroup.evidence));
          }
        }
      })
    }
  })
  
  return out;
}


export const sanitizeClaimerData = async (out: Record<SupportedChainId, ClaimerQuery>, id: Address) => {
  const voucherEvidenceChain = supportedChains.find(
    (chain) => out[chain.id].claimer?.registration?.humanity.winnerClaim
  );

  if (voucherEvidenceChain) {
    const isClaimerIncomplete = out[voucherEvidenceChain.id].claimer!.registration!.humanity.winnerClaim.at(0)!.evidenceGroup.evidence.length===0;
    if (isClaimerIncomplete) {
      const lastTransf = await getProfileLastTransferringRequest(voucherEvidenceChain.id, id);
      out[voucherEvidenceChain.id].claimer!.name = lastTransf?.transferringRequest?.claimer.name;
      if (!!lastTransf?.transferringRequest?.evidenceGroup.evidence) {
        out[voucherEvidenceChain.id].claimer!.registration!.humanity.winnerClaim.at(0)!.evidenceGroup.evidence = JSON.parse(JSON.stringify(lastTransf?.transferringRequest?.evidenceGroup.evidence));
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
}
