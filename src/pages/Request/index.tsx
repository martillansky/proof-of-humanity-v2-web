import { ChainId } from "enums/ChainId";
import { BigNumber } from "ethers";
import { concat, keccak256, toUtf8Bytes } from "ethers/lib/utils";
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
import { CHAIN } from "constants/chains";
import { getColorForStatus } from "constants/misc";
import { Status } from "generated/graphql";
import useIPFS from "hooks/useIPFS";
import {
  useAdvanceState,
  useExecuteRequest,
  useRequestTotalCost,
  useWithdrawRequest,
} from "hooks/useProofOfHumanity";
import Appeal from "modules/appeal";
import Challenge from "modules/challenge";
import EvidenceSection from "modules/evidence/Section";
import FundButton from "modules/funding/Button";
import VouchButton from "modules/vouch/Button";
import { explorerLink, shortenAddress } from "utils/address";
import { machinifyId, shortenId } from "utils/identifier";
import { ipfs } from "utils/ipfs";
import { formatEth } from "utils/misc";

const genRequestId = (humanityId: string, index: number) => {
  const requestId = keccak256(
    concat([
      machinifyId(humanityId),
      index ? BigNumber.from(Math.abs(index)).toHexString() : "0x00000000",
    ])
  );
  return index < 0
    ? keccak256(concat([requestId, toUtf8Bytes("legacy")]))
    : requestId;
};

const Request: React.FC = () => {
  const { humanity, index, chain } = useParams();

  const chainId = useMemo<ChainId | undefined>(
    () => chain && ChainId[chain.toUpperCase()],
    [chain]
  );

  const contractData = useContractData(chainId!);

  const requestId = useMemo(
    () => humanity && index && genRequestId(humanity, +index),
    []
  );

  console.log({ requestId });

  const request = useRequest(chainId, requestId);
  const { totalCount, getRequestValidVouches } = useVouches(chainId, requestId);

  const [evidence] = useIPFS<EvidenceFileInterface>(
    request &&
      (request.revocation
        ? request?.humanity.winnerClaimRequest[0]
        : request
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

  const fullName = registration.firstName
    ? `${registration.firstName} ${registration.lastName}`
    : registration.name;
  const funded =
    !request.legacy && request.challenges[0].rounds[0].requesterFunds;
  const statusColor = getColorForStatus(request.status, request.revocation);

  const currentReason = request.challenges.at(-1)?.reason;

  return (
    <div
      className="content
                 mx-auto flex flex-col justify-center
                 font-semibold"
    >
      <div className="p-4 border flex justify-between rounded shadow bg-white">
        <span className="flex">
          {request.revocation ? <>Revocation</> : <>Claim</>} request
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

          {request.legacy ? (
            <>
              <ALink
                href={`https://app.proofofhumanity.id/profile/${request.humanity.id}`}
                className="text-center font-semibold text-blue-500"
              >
                This is a profile registered on the old contract. Navigate to
                the old interface to withdraw or challenge.
              </ALink>
            </>
          ) : (
            <>
              {request.status == Status.Vouching && (
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

              {request.status == Status.Resolving && challengePeriodEnd && (
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
                    {challengePeriodEnd && (
                      <TimeAgo time={challengePeriodEnd} />
                    )}
                  </Label>

                  <Challenge request={request} />
                </>
              )}

              {request.status == Status.Disputed &&
                request.challenges.length && (
                  <div>
                    {request.challenges.map((challenge, i) => (
                      <ALink
                        href={`https://resolve.kleros.io/cases/${challenge.disputeId}`}
                        className="text-blue-500 underline underline-offset-2"
                      >
                        #{challenge.disputeId}:{" "}
                        {request.revocation ? "Challenge" : currentReason}
                      </ALink>
                    ))}
                  </div>
                )}
            </>
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
                request.revocation
                  ? request.humanity.winnerClaimRequest[0].requester
                  : request.requester
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

      <Appeal
        // humanityId={request.humanity.id}
        // requestIndex={index}
        request={request}
      />

      <EvidenceSection
        humanityId={request.humanity.id}
        requestIndex={index}
        request={request}
      />
    </div>
  );
};

export default Request;
