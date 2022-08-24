import Image from "components/Image";
import Challenge from "modules/Challenge";
import { useParams } from "react-router-dom";
import useIPFS from "hooks/useIPFS";
import { EvidenceFileInterface, RegistrationFileInterface } from "api/files";
import { ipfs } from "utils/ipfs";
import { useRequest } from "api/useRequest";
import { ChainId } from "constants/chains";
import { useMemo } from "react";
import { timeAgo } from "utils/time";
import EvidenceSection from "modules/EvidenceSection";
import {
  useAddVouch,
  useAdvanceState,
  useChallengePeriodDuration,
  useExecuteRequest,
  useRequiredNumberOfVouches,
} from "hooks/useProofOfHumanity";
import { BigNumber } from "ethers";
import TimeAgo from "components/TimeAgo";

const Request: React.FC = () => {
  const { soul, index, chain } = useParams();
  const chainId = useMemo<ChainId | undefined>(
    () => chain && ChainId[chain.toUpperCase()],
    [chain]
  );
  const { request } = useRequest(chainId, `${soul}#${index}`);
  const [evidence] = useIPFS<EvidenceFileInterface>(request?.evidence[0]?.URI);
  const [registration] = useIPFS<RegistrationFileInterface>(evidence?.fileURI);

  const [requiredVouches] = useRequiredNumberOfVouches();
  const [challengePeriodDuration] = useChallengePeriodDuration();
  const [advanceState] = useAdvanceState();
  const [executeRequest] = useExecuteRequest();
  const [addVouch] = useAddVouch();

  if (!request || !evidence || !registration || !soul || !index || !chainId) {
    console.log({ request, evidence, registration, soul, index, chainId });
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 flex flex-col justify-center">
      <div className="p-4 border flex justify-between rounded shadow bg-white">
        <span>Request</span>
        <div className="flex items-center">
          <span className="text-green-400">{request.status}</span>
          <span className="m-1 h-2 w-2 bg-green-400 rounded-full" />
        </div>
      </div>

      <div className="my-6 border flex rounded shadow">
        <div className="pt-8 pb-48 w-96 flex flex-col bg-amber-100 items-center">
          <Image uri={ipfs(registration.photo)} rounded previewed />

          <span className="font-bold">
            {registration.firstName} {registration.lastName}
          </span>
          <span className="mb-4">{registration.bio}</span>
          <span className="mb-8">
            Soul: <strong>{request.soul.id}</strong>
          </span>

          <span>
            Vouches:{" "}
            <strong>
              {request.vouches.length} / {requiredVouches?.toNumber()}
            </strong>
          </span>

          <span className="mt-8 font-bold">Last change</span>
          <span>{timeAgo(request.evidence.at(-1)?.creationTime)}</span>

          <div className="grid grid-cols-1 gap-2">
            <button
              className="btn-main"
              onClick={async () =>
                await addVouch(request.requester, request.soul.id)
              }
            >
              Vouch
            </button>

            <button
              className="btn-main"
              onClick={async () =>
                await advanceState(request.requester, [], [])
              }
            >
              Advance state
            </button>

            <button
              className="btn-main"
              onClick={async () => await executeRequest(soul, index)}
            >
              Execute request
            </button>

            <span>
              Challenge period end:{" "}
              {challengePeriodDuration && (
                <TimeAgo
                  time={challengePeriodDuration
                    .add(request.lastStatusChange as BigNumber)
                    .toNumber()}
                />
              )}
            </span>
            <span>
              Last status change: <TimeAgo time={request.lastStatusChange} />
            </span>

            <Challenge />
          </div>
        </div>
        <div className="w-full flex flex-col items-center">
          <span>
            {registration.firstName} {registration.lastName}
          </span>

          <video
            controls
            className="w-fit max-h-96"
            src={ipfs(registration.video)}
          />
        </div>
      </div>

      <EvidenceSection
        chainId={chainId}
        soulId={soul}
        requestIndex={index}
        request={request}
      />
    </div>
  );
};

export default Request;
