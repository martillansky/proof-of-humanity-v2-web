import { cache } from "react";
import { SupportedChainId, getForeignChain, supportedChains } from "config/chains";
import { REQUESTS_DISPLAY_BATCH } from "config/misc";
import { sdk } from "config/subgraph";
import { RequestsQuery } from "generated/graphql";
import { Address, Hash, concat, keccak256, toHex } from "viem";
import axios from "axios";
//import { getContractDataAllChains } from "./contract";

const _getAllRequests = async () => {
  const res = await Promise.all(
    supportedChains.map((chain) =>
      sdk[chain.id].Requests({ first: REQUESTS_DISPLAY_BATCH * 4 })
    )
  );
  
  const out = supportedChains.reduce(
    (acc, chain, i) => ({ ...acc, [chain.id]: res[i].requests }),
    {} as Record<SupportedChainId, RequestsQuery["requests"]>
  );
  return out;
}

export const getRequestsInitData = async () => {
  return await checkDataIntegrity(undefined);
};

export const checkDataIntegrity = async (filtered: Record<SupportedChainId, RequestsQuery["requests"]> | undefined) => {
  var all: Record<SupportedChainId, RequestsQuery["requests"]> = await _getAllRequests(); 
  var out: Record<SupportedChainId, RequestsQuery["requests"]> = filtered? filtered : all; 
  
  /* var humanityLifespanAllChains: Partial<Record<SupportedChainId, string>> = {};
  const [contractData] = await Promise.all([getContractDataAllChains()]);
  Object.keys(contractData).map(
    (chainId) => humanityLifespanAllChains[Number(chainId) as SupportedChainId] = contractData[Number(chainId) as SupportedChainId].humanityLifespan
  ); */
  
  supportedChains.forEach(chain => {
    const incompleteRequests = out[chain.id].length>0 && out[chain.id].filter(req => 
      (!req.evidenceGroup || !req.evidenceGroup.evidence || req.evidenceGroup.evidence.length === 0 || !req.claimer.name)
    );
    const foreignChainId = incompleteRequests && incompleteRequests.length>0 && getForeignChain(chain.id);
    if (incompleteRequests && foreignChainId && all[foreignChainId].length>0) {
      incompleteRequests.map(req => {
        const pohId = req.humanity.id;
        var transferringRequest = all[foreignChainId]
          .find(req => req.humanity.id === pohId && req.index === req.humanity.winnerClaim.at(0)?.index
        );
        if (!(!!transferringRequest?.evidenceGroup.evidence.at(0))) {
          transferringRequest = all[chain.id]
          .find(req => (req.humanity.id === pohId && req.evidenceGroup.evidence.length > 0));
        }
        req.claimer.name = transferringRequest?.claimer.name;
        if (!!transferringRequest?.evidenceGroup.evidence) {
          req.evidenceGroup.evidence = JSON.parse(JSON.stringify(transferringRequest?.evidenceGroup.evidence));
          req.humanity.winnerClaim.at(0)!.evidenceGroup.evidence = JSON.parse(JSON.stringify(transferringRequest?.evidenceGroup.evidence));
        }
      })
    }
  
    //const humanityLifespan = humanityLifespanAllChains[chain.id];
    const transferred = out[chain.id].filter(req => 
      !req.humanity.registration && 
      req.status.id === 'resolved' && 
      req.humanity.winnerClaim.at(0)?.index === req.index
    );
    if (transferred) {
      transferred.map(req => {
        //if ((Number(req.humanity.winnerClaim.at(0)?.resolutionTime) + Number(humanityLifespan) < Date.now() / 1000)) return req.status.id = "transferred expired" // expired
        if (Number(req.humanity.nbRequests)>Number(req.index)+1) return req.status.id = "resolved"
        return req.status.id = "transferred"
      });
    }
  })
  
  return out;
}

const genRequestId = (pohId: Hash, index: number) => {
  return keccak256(
    concat([
      pohId,
      index >= 0
        ? toHex(index, { size: 32 })
        : concat([
            toHex(Math.abs(index + 1), { size: 32 }),
            toHex("legacy", { size: 6 }),
          ]),
    ])
  );
};

export const getTrasferringRequest = cache(
  async (chainId: SupportedChainId, pohId: Hash) => {
    const out = (await sdk[getForeignChain(chainId)].Humanity({ id: pohId }));
    const reqOut = out.humanity?.requests
      .find(req => req.claimer.id === pohId && req.index === out.humanity?.winnerClaim.at(0)?.index
    );
    if (reqOut?.evidenceGroup.evidence.length === 0) {
      // This holds when the profile was transferred to the foreign chain and then bridged back
      const out = (await sdk[chainId].Humanity({ id: pohId }));
      const reqOut = out.humanity?.requests
        .filter(req => req.claimer.id === pohId && req.evidenceGroup.evidence.length > 0).at(-1);
      return reqOut;
    }
    return reqOut;
  }
);

export const getRequestData = cache(
  async (chainId: SupportedChainId, pohId: Hash, index: number) => {
    const out = (await sdk[chainId]["Request"]({ id: genRequestId(pohId, index) })).request;
    if (!(!!out)) return undefined;
    if (!out.evidenceGroup || !out.evidenceGroup.evidence || out.evidenceGroup.evidence.length === 0 || !out.claimer.name) {
      const transferringRequest = await getTrasferringRequest(chainId, pohId);
      out!.claimer.name = transferringRequest?.claimer.name;
      if (!!transferringRequest?.evidenceGroup.evidence) {
        out!.evidenceGroup.evidence = JSON.parse(JSON.stringify(transferringRequest?.evidenceGroup.evidence));
        out!.humanity!.winnerClaim.at(0)!.evidenceGroup.evidence = JSON.parse(JSON.stringify(transferringRequest?.evidenceGroup.evidence));
      }
    } else if (!out.humanity.registration && out.status.id === 'resolved' &&
      out!.humanity!.winnerClaim.at(0)!.index === out.index // If resolved in a non-registrered chain and winning claim then it is the transferring request
    ) {
      out.status.id = "transferred";
    }
    return out;
  }
);

export const isPosteriorRequestResolving = cache(
  async (chainId: SupportedChainId, pohId: Hash, index: number) => {
    const nextIndex = (index + 1) > 0? index + 1 : 0;
    const nextRequest = await getRequestData(chainId, pohId, nextIndex);
    const currentRequest = await getRequestData(chainId, pohId, index);
    return nextRequest?.status.id === 'resolved' && nextRequest.creationTime > currentRequest?.creationTime;
  }
);

export const getRequestsToAdvance = cache(
  async (chainId: SupportedChainId) =>
    (await sdk[chainId]["RequestsToAdvance"]()).status!.requests
);

export const getOffChainVouches = async (
  chainId: SupportedChainId,
  claimer: Address,
  pohId: Hash
) => {
  try {
    return (
      await axios.get(
        `${process.env.DEPLOYED_APP}/api/vouch/${chainId}/for-request/${claimer}/${pohId}`
      )
    ).data as { voucher: Address; expiration: number; signature: Hash }[];
  } catch (err: any) {
    console.log(err);

    return [];
  }
};