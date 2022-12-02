import { BigNumber } from "ethers";
import { concat, keccak256 } from "ethers/lib/utils";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { EvidenceFileInterface, RegistrationFileInterface } from "api/files";
import useContractData from "api/useContractData";
import { useRequest } from "api/useRequest";
import { useVouches } from "api/useVouches";
import ALink from "components/ALink";
import Identicon from "components/Identicon";
import Image from "components/Image";
import Label from "components/Label";
import PageLoader from "components/PageLoader";
import TimeAgo from "components/TimeAgo";
import Video from "components/Video";
import { CHAIN, ChainId } from "constants/chains";
import { getColorForStatus } from "constants/misc";
import { Status } from "generated/graphql";
import useIPFS from "hooks/useIPFS";
import {
  useAdvanceState,
  useExecuteRequest,
  useRequestTotalCost,
  useWithdrawRequest,
} from "hooks/useProofOfHumanity";
import Challenge from "modules/challenge";
import EvidenceSection from "modules/evidence/Section";
import FundButton from "modules/funding/Button";
import VouchButton from "modules/vouch/Button";
import { explorerLink, shortenAddress } from "utils/address";
import { machinifyId, shortenId } from "utils/identifier";
import { ipfs } from "utils/ipfs";
import { formatEth } from "utils/misc";

const genRequestId = (humanityId: string, index: string) =>
  keccak256(
    concat([machinifyId(humanityId!), BigNumber.from(index).toHexString()])
  );

const Request: React.FC = () => {
  const { humanity, index, chain, old } = useParams();

  const chainId = useMemo<ChainId | undefined>(
    () => chain && ChainId[chain.toUpperCase()],
    [chain]
  );

  const contractData = useContractData(chainId!);

  const requestId = useMemo(() => genRequestId(humanity!, index!), []);

  const request = useRequest(chainId, requestId);
  const { totalCount, getRequestValidVouches } = useVouches(chainId, requestId);

  console.log({ request });

  const [evidence] = useIPFS<EvidenceFileInterface>(
    request &&
      (request.registration
        ? request
        : request?.humanity.winnerClaimRequest[0]
      ).evidence.at(-1)?.URI
  );
  const [registration] = useIPFS<RegistrationFileInterface>(evidence?.fileURI);

  const advanceState = useAdvanceState();
  const withdrawRequest = useWithdrawRequest();
  const executeRequest = useExecuteRequest();
  const totalCost = useRequestTotalCost();

  const challengePeriodEnd =
    contractData?.contract &&
    request &&
    BigNumber.from(contractData.contract.challengePeriodDuration)
      .add(request.lastStatusChange)
      .toNumber();

  if (!request || !evidence || !registration || !humanity || !index || !chainId)
    return <PageLoader />;

  const ChainLogo = CHAIN[chainId].Logo;

  const isV1 = old === "v1";
  const fullName = registration.firstName
    ? `${registration.firstName} ${registration.lastName}`
    : registration.name;
  const funded = !isV1 && request.challenges[0].rounds[0].requesterFunds;
  const statusColor = getColorForStatus(request.status, request.registration);

  const currentReason = request.challenges.at(-1)?.reason;

  return (
    <div
      className="content
                 mx-auto flex flex-col justify-center
                 font-semibold"
    >
      <div className="p-4 border flex justify-between rounded shadow bg-white">
        <span className="flex">
          {request.registration ? <>Claim</> : <>Revocation</>} request
        </span>
        <div className="flex items-center">
          <span className={`text-status-${statusColor}`}>{request.status}</span>
          <span
            className={`m-1 h-2 w-2 rounded-full bg-status-${statusColor}`}
          />
        </div>
      </div>

      <div className="my-6 border flex flex-col md:flex-row rounded bg-white shadow">
        <div className="pt-8 md:pb-48 px-8 md:w-2/5 flex flex-col background items-center">
          <Image uri={ipfs(registration.photo)} rounded previewed />

          <span className="font-bold">{fullName}</span>
          <span className="mb-4">{registration.bio}</span>

          <div className="mb-8 flex flex-col items-center font-semibold text-green-500">
            <span>Humanity:</span>
            <Link to={`/humanity/${humanity}`}>{shortenId(humanity)} ➜</Link>
          </div>

          {isV1 && (
            <ALink
              href={`https://app.proofofhumanity.id/profile/${request.humanity.id}`}
              className="text-center font-semibold text-blue-500"
            >
              This is a profile registered on the old contract. Check it out
              there.
            </ALink>
          )}

          {!isV1 && request.status == Status.Vouching && (
            <>
              <Label>
                Vouches:{" "}
                <strong>
                  {totalCount} /{" "}
                  {contractData?.contract?.requiredNumberOfVouches}
                </strong>
              </Label>

              <VouchButton request={request} />

              {totalCost && (
                <span className="font-semibold">
                  Funded: {formatEth(funded)} / {formatEth(totalCost)} ETH
                </span>
              )}

              <FundButton
                totalCost={totalCost}
                funded={funded}
                request={request}
              />

              {request.claimer &&
                contractData?.contract &&
                request.claimer.vouchesReceived.length >=
                  Number(contractData.contract.requiredNumberOfVouches) && (
                  <>
                    <button
                      className="btn-main mb-2"
                      onClick={async () => {
                        const validVouches = await getRequestValidVouches(
                          contractData.contract!.requiredNumberOfVouches
                        );
                        await advanceState(
                          request.requester,
                          validVouches.onChain,
                          validVouches.offChain
                        );
                      }}
                    >
                      Advance state
                    </button>

                    <button
                      className="btn-main mb-2"
                      onClick={async () => {
                        await withdrawRequest();
                      }}
                    >
                      Withdraw request
                    </button>
                  </>
                )}
            </>
          )}

          {!isV1 && request.status == Status.Resolving && challengePeriodEnd && (
            <>
              <button
                className="btn-main mb-2"
                onClick={async () =>
                  await executeRequest(request.humanity.id, index)
                }
                disabled={challengePeriodEnd > Date.now() / 1000}
              >
                Execute request
              </button>

              <Label>
                Challenge period end:{" "}
                {challengePeriodEnd && <TimeAgo time={challengePeriodEnd} />}
              </Label>

              <Challenge request={request} />
            </>
          )}

          {!isV1 &&
            request.status == Status.Disputed &&
            request.challenges.length && (
              <div>
                {request.challenges.map((challenge, i) => (
                  <ALink
                    href={`https://resolve.kleros.io/cases/${challenge.disputeId}`}
                    className="text-blue-500 underline underline-offset-2"
                  >
                    #{challenge.disputeId}:{" "}
                    {request.registration ? currentReason : "Challenge"}
                  </ALink>
                ))}
              </div>
            )}

          <Label>
            Last status change: <TimeAgo time={request.lastStatusChange} />
          </Label>
        </div>

        <div className="w-full px-4 flex flex-col">
          <div className="mt-4 flex justify-between font-semibold">
            <span className="ml-8 text-xl">{fullName}</span>
            <span className="flex">
              <ChainLogo className="w-6 h-6 mr-2" />
              {CHAIN[chainId].NAME}
            </span>
          </div>

          <div className="flex mb-4">
            <Identicon
              address={
                request.registration
                  ? request.requester
                  : request.humanity.winnerClaimRequest[0].requester
              }
            />
            <ALink
              className="ml-2 font-semibold underline underline-offset-2"
              href={explorerLink(request.requester, chainId)}
            >
              {shortenAddress(request.requester)}
            </ALink>
          </div>

          <Video className="w-full" uri={ipfs(registration.video)} />
        </div>
      </div>

      {/* <Accordion title="Appeal">Appeal here</Accordion> */}

      <EvidenceSection
        humanityId={request.humanity.id}
        requestIndex={index}
        request={request}
      />
    </div>
  );
};

export default Request;
