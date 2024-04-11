import cn from "classnames";
import { HumanityQuery } from "generated/graphql";
import { explorerLink, shortenAddress } from "utils/address";
import { machinifyId, prettifyId } from "utils/identifier";
import { SupportedChainId, supportedChains } from "config/chains";
import Link from "next/link";
import { getHumanityData } from "data/humanity";
import { getContractDataAllChains } from "data/contract";
import ExternalLink from "components/ExternalLink";
import Card from "components/request/Card";
import Image from "next/image";
import Revoke from "./Revoke";
import { getArbitrationCost } from "data/costs";
import TimeAgo from "components/TimeAgo";
import Renew from "./Renew";
import CrossChain from "./CrossChain";

type PoHRequest = ArrayElement<
  NonNullable<HumanityQuery["humanity"]>["requests"]
> & {
  chainId: SupportedChainId;
};

interface PageProps {
  params: { pohid: string };
}

async function Profile({ params: { pohid } }: PageProps) {
  const pohId = machinifyId(pohid);

  if (!pohId) return <>Not found</>;

  const [humanity, contractData] = await Promise.all([
    getHumanityData(pohId),
    getContractDataAllChains(),
  ]);

  const homeChain = supportedChains.find(
    (chain) => !!humanity[chain.id]?.humanity?.registration
  );

  const homeCrossChain = !(!!homeChain) && supportedChains.find(
    (chain) => !!humanity[chain.id]?.crossChainRegistration
  );

  const humanityCrossChainRegistration = homeCrossChain && humanity[homeCrossChain.id].crossChainRegistration;

  const arbitrationCost = homeChain
    ? await getArbitrationCost(
        homeChain,
        contractData[homeChain.id].arbitrationInfo.arbitrator,
        contractData[homeChain.id].arbitrationInfo.extraData
      )
    : 0n;

  var lastEvidenceChain = homeChain
    ? supportedChains.sort((chain1, chain2) => {
        const req1 = humanity[chain1.id]?.humanity?.winnerClaim[0];
        const req2 = humanity[chain2.id]?.humanity?.winnerClaim[0];
        return req2
          ? req1
            ? req2.resolutionTime - req1.resolutionTime
            : 1
          : -1;
      })[0]
    : null;

  const pendingRequests = supportedChains.reduce(
    (acc, chain) => [
      ...acc,
      ...(humanity[chain.id].humanity
        ? humanity[chain.id]!.humanity!.requests.filter(
            ({ status }) =>
              status.id !== "withdrawn" && status.id !== "resolved" && status.id !== "transferred" 
          ).map((req) => ({
            ...req,
            chainId: chain.id,
          }))
        : []),
    ],
    [] as PoHRequest[]
  );


  let registered = (lastEvidenceChain && humanity[lastEvidenceChain.id]!.humanity!.registration);
  let expired = (lastEvidenceChain && registered && humanity[lastEvidenceChain.id]!.humanity!.registration!.expirationTime < Date.now() / 1000);
  
  let winnerClaimRequest =
  (
    lastEvidenceChain && 
    registered &&
    !(expired) && // It did not expired
    humanity[lastEvidenceChain.id].humanity!.winnerClaim[0]
  );
  
  if ((!(!!lastEvidenceChain) && !winnerClaimRequest) || (!(!! expired) && !(!! winnerClaimRequest))) {
    expired = (!!humanityCrossChainRegistration && humanityCrossChainRegistration.expirationTime < Date.now() / 1000);
    winnerClaimRequest = (!expired && !!homeCrossChain && !!humanity[homeCrossChain.id].humanity?.registration && humanity[homeCrossChain.id].humanity!.winnerClaim[0]);
  }

  // pastRequests must not contain pendingRequests nor winningClaimRequest if it did not expired
  const pastRequests = supportedChains.reduce(
    (acc, chain) => [
      ...acc,
      ...(humanity[chain.id].humanity
        ? humanity[chain.id]!.humanity!.requests.filter(
          (req) => (
            !pendingRequests.some((pending) => req.id === pending.id) && // No pending requests
            (
              winnerClaimRequest && req.index !== winnerClaimRequest.index || // No winnerClaimRequest if it did not expired
              !winnerClaimRequest // if winnerClaimRequest has expired it is left as pastRequest
            )
          )
        ).map((req) => ({
            ...req,
            chainId: chain.id,
          }))
        : []),
    ],
    [] as PoHRequest[]
  );


  const lastTransferChain = supportedChains.sort((chain1, chain2) => {
    const out1 = humanity[chain1.id]?.outTransfer;
    const out2 = humanity[chain2.id]?.outTransfer;
    return out2
      ? out1
        ? out2.transferTimestamp - out1.transferTimestamp
        : 1
      : -1;
  })[0];

  const canRenew =
    homeChain &&
    +humanity[homeChain.id]!.humanity!.registration!.expirationTime -
      Date.now() / 1000 <
      +contractData[homeChain.id].renewalPeriodDuration;

  return (
    <div className="content">
      <div className="mt-24 paper pt-20 relative flex flex-col items-center">
        <div className="absolute bordered left-1/2 -top-16 -translate-x-1/2 rounded-full shadow">
          <div className="w-32 h-32 px-6 pt-5 rounded-full bg-white">
            <Image
              alt="poh id"
              src="/logo/pohid.svg"
              height={128}
              width={128}
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-slate-400">POH ID</span>
          <span className="mb-12 font-semibold text-xl text-center">
            {prettifyId(pohId).slice(0, 20)}
            <wbr />
            {prettifyId(pohId).slice(20)}
          </span>
        </div>

        {lastEvidenceChain && homeChain && !expired ? (
          <>
            <div className="mb-2 flex text-emerald-500">
              Claimed by
              <ExternalLink
                className="ml-2 underline underline-offset-2"
                href={explorerLink(
                  humanity[homeChain.id]!.humanity!.registration!.claimer.id,
                  homeChain
                )}
              >
                {shortenAddress(
                  humanity[homeChain.id]!.humanity!.registration!.claimer.id
                )}
              </ExternalLink>
            </div>

            <span className="mb-2 text-slate-500">
              {humanity[homeChain.id]!.humanity!.registration!.expirationTime <
              Date.now() / 1000
                ? "Expired "
                : "Expires "}
              <TimeAgo
                time={
                  humanity[homeChain.id]!.humanity!.registration!.expirationTime
                }
              />
            </span>

            {canRenew ? (
              <Renew
                claimer={
                  humanity[homeChain.id]!.humanity!.registration!.claimer.id
                }
                pohId={pohId}
              />
            ) : (
              <span className="text-slate-500">
                Renewal available{" "}
                <TimeAgo
                  time={
                    +humanity[homeChain.id]!.humanity!.registration!
                      .expirationTime -
                    +contractData[homeChain.id].renewalPeriodDuration
                  }
                />
              </span>
            )}

            <Revoke
              pohId={pohId}
              arbitrationInfo={contractData[homeChain.id].arbitrationInfo!}
              homeChain={homeChain}
              cost={
                arbitrationCost + BigInt(contractData[homeChain.id].baseDeposit)
              }
            />

            <CrossChain
              claimer={
                humanity[homeChain.id]!.humanity!.registration!.claimer.id
              }
              contractData={contractData}
              homeChain={homeChain}
              pohId={pohId}
              humanity={humanity}
              lastTransfer={humanity[lastTransferChain.id].outTransfer}
              lastTransferChain={lastTransferChain}
            />
          </>
        ) : homeCrossChain && humanityCrossChainRegistration && !expired && !!winnerClaimRequest? (
          <CrossChain
            claimer={
              humanityCrossChainRegistration!.claimer.id
            }
            contractData={contractData}
            homeChain={homeCrossChain}
            pohId={pohId}
            humanity={humanity}
            lastTransfer={humanity[lastTransferChain.id].outTransfer}
            lastTransferChain={lastTransferChain}
          />
        ) : (
          <>
            <span className="mb-6 text-theme">Not claimed</span>
            <Link className="btn-main w-48 mb-6" href={`/${pohId}/claim`}>
              Claim humanity
            </Link>
          </>
        )}
      </div>

      <div className={"flex flex-col sm:flex-row sm:gap-4"}>
        {((homeChain && lastEvidenceChain) || (homeCrossChain)) && winnerClaimRequest && (
          <div>
            <div className="p-4 mt-4 mb-1">
            {homeChain && lastEvidenceChain? 
              'Winning claim'
              :
              'Crossing chain (update)'
            }
            </div>
            <div
              className={cn("grid", {
                "gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4":
                  !pendingRequests.length,
              })}
            >
              {homeChain && lastEvidenceChain? 
                <Card
                  chainId={lastEvidenceChain.id}
                  claimer={
                    humanity[lastEvidenceChain.id]!.humanity!.registration!
                      .claimer.id
                  }
                  evidence={winnerClaimRequest.evidenceGroup.evidence}
                  humanity={{
                    id: pohId,
                    winnerClaim: humanity[homeChain.id]!.humanity!.winnerClaim,
                  }}
                  index={winnerClaimRequest.index}
                  requester={
                    humanity[homeChain.id]!.humanity!.registration!.claimer.id
                  }
                  revocation={false}
                  status="resolved"
                  expired={false}
                />
              :
                homeCrossChain && humanityCrossChainRegistration &&
                <Card
                  chainId={homeCrossChain.id}
                  claimer={
                    humanityCrossChainRegistration!.claimer.id
                  }
                  evidence={winnerClaimRequest.evidenceGroup.evidence}
                  humanity={{
                    id: pohId,
                    winnerClaim: humanity[homeCrossChain.id]!.humanity!.winnerClaim,
                  }}
                  index={winnerClaimRequest.index}
                  requester={
                    humanityCrossChainRegistration!.claimer.id
                  }
                  revocation={false}
                  status="transferred"//"resolved"
                  expired={false}
                />
              }
            </div>
          </div>
        )}

        {pendingRequests.length > 0 && (
          <div>
            <div className="p-4 mt-4 mb-1">
              {pendingRequests.length} pending request
              {pendingRequests.length !== 1 && "s"}
            </div>
            <div
              className={cn(
                "grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
                homeChain && winnerClaimRequest
                  ? "md:grid-cols-2 xl:grid-cols-3"
                  : "sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
              )}
            >
              {pendingRequests.map((req) => (
                <Card
                  key={req.id}
                  chainId={req.chainId}
                  claimer={req.claimer.id}
                  evidence={req.evidenceGroup.evidence}
                  humanity={{
                    id: pohId,
                    winnerClaim: humanity![req.chainId]!.humanity!.winnerClaim,
                  }}
                  index={req.index}
                  requester={req.requester}
                  revocation={req.revocation}
                  status={req.status.id}
                  expired={false}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      {pastRequests.length > 0 && (
        <>
          <div className="p-4 mt-8 mb-1">
            {pastRequests.length} past request
            {pastRequests.length !== 1 && "s"}
          </div>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {pastRequests.map((req) => (
              <Card
                key={req.chainId+'/'+req.id}
                chainId={req.chainId}
                claimer={req.claimer.id}
                evidence={req.evidenceGroup.evidence}
                humanity={{
                  id: pohId,
                  winnerClaim: humanity![req.chainId]!.humanity!.winnerClaim,
                }}
                index={req.index}
                requester={req.requester}
                revocation={req.revocation}
                status={req.status.id=="transferred"? "resolved": req.status.id}
                expired={((req.status.id=="resolved" || req.status.id=="transferred") && !(req.revocation))}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
