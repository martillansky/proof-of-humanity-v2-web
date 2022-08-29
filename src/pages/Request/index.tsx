import Image from "components/Image";
import Challenge from "modules/challenge";
import { useParams } from "react-router-dom";
import useIPFS from "hooks/useIPFS";
import { EvidenceFileInterface, RegistrationFileInterface } from "api/files";
import { ipfs } from "utils/ipfs";
import { useRequest } from "api/useRequest";
import { ChainId } from "constants/chains";
import { useMemo } from "react";
import EvidenceSection from "modules/evidence/Section";
import {
  useAddVouch,
  useAdvanceState,
  useChallengePeriodDuration,
  useExecuteRequest,
  useFundRequest,
  useRequestTotalCost,
  useRequiredNumberOfVouches,
} from "hooks/useProofOfHumanity";
import { BigNumber } from "ethers";
import TimeAgo from "components/TimeAgo";
import Modal from "components/Modal";
import { formatEth } from "utils/misc";
import { concat, keccak256 } from "ethers/lib/utils";
import Field from "components/Field";
import Label from "components/Label";
import Identicon from "components/Identicon";
import ALink from "components/ALink";
import { explorerLink, shortenAddress } from "utils/address";
import Video from "components/Video";
import { STATUS_TO_COLOR } from "constants/misc";
import cn from "classnames";

const Request: React.FC = () => {
  const { soul, index, chain } = useParams();
  const chainId = useMemo<ChainId | undefined>(
    () => chain && ChainId[chain.toUpperCase()],
    [chain]
  );

  const { request } = useRequest(
    chainId,
    useMemo(
      () =>
        keccak256(
          concat([
            BigNumber.from(soul).toHexString(),
            BigNumber.from(index).toHexString(),
          ])
        ),
      []
    )
  );
  const [evidence] = useIPFS<EvidenceFileInterface>(request?.evidence[0]?.URI);
  const [registration] = useIPFS<RegistrationFileInterface>(evidence?.fileURI);

  const [requiredVouches] = useRequiredNumberOfVouches();
  const [challengePeriodDuration] = useChallengePeriodDuration();
  const [advanceState] = useAdvanceState();
  const [executeRequest] = useExecuteRequest();
  const [addVouch] = useAddVouch();
  const [fundRequest] = useFundRequest();
  const totalCost = useRequestTotalCost();

  if (!request || !evidence || !registration || !soul || !index || !chainId) {
    // console.log({ request, evidence, registration, soul, index, chainId });
    return <div>Loading...</div>;
  }

  const fullName = registration.firstName
    ? `${registration.firstName} ${registration.lastName}`
    : registration.name;

  return (
    <div
      className="mt-8 mb-16 w-11/12
                 sm:mt-12 sm:w-5/6
                 lg:mt-16 lg:w-3/5
                 mx-auto flex flex-col justify-center"
    >
      <div className="p-4 border flex justify-between rounded shadow bg-white">
        <span>Request</span>
        <div className="flex items-center">
          <span className={`text-${STATUS_TO_COLOR[request.status]}`}>
            {request.status}
          </span>
          <span
            className={cn(
              "m-1 h-2 w-2 rounded-full",
              `bg-${STATUS_TO_COLOR[request.status]}`
            )}
          />
        </div>
      </div>

      <div className="my-6 border flex flex-col md:flex-row rounded bg-white shadow">
        <div className="pt-8 md:pb-48 px-8 md:w-2/5 flex flex-col background items-center">
          <Image uri={ipfs(registration.photo)} rounded previewed />

          <span className="font-bold">{fullName}</span>
          <span className="mb-4">{registration.bio}</span>
          <Label>
            Soul: <strong>{soul}</strong>
          </Label>

          <Label>
            Vouches:{" "}
            <strong>
              {request.claimer?.vouchesReceived.length} /{" "}
              {requiredVouches?.toNumber()}
            </strong>
          </Label>
          <button
            className="btn-main mb-2"
            onClick={async () => {
              console.log(request.requester, request.soul.id);
              await addVouch(request.requester, request.soul.id);
            }}
          >
            Vouch
          </button>

          {totalCost && (
            <Modal
              trigger={
                <button
                  className="btn-main mb-2"
                  onClick={async () => {
                    console.log(request.requester, request.soul.id);
                    await addVouch(request.requester, request.soul.id);
                  }}
                >
                  Fund request
                </button>
              }
            >
              <div className="flex flex-col">
                <div className="w-full p-4 flex justify-center rounded font-bold">
                  {totalCost && formatEth(totalCost)} ETH Deposit
                </div>
                <Field label="Amount" value={formatEth(totalCost)} />
                <button
                  onClick={async () =>
                    await fundRequest(request.requester, { value: totalCost })
                  }
                  className="btn-main mt-12"
                >
                  Fund
                </button>
              </div>
            </Modal>
          )}

          <button
            className="btn-main mb-2"
            onClick={async () => await advanceState(request.requester, [], [])}
          >
            Advance state
          </button>

          <button
            className="btn-main mb-2"
            onClick={async () => await executeRequest(soul, index)}
          >
            Execute request
          </button>

          <Label>
            Challenge period end:{" "}
            {challengePeriodDuration && (
              <TimeAgo
                time={challengePeriodDuration
                  .add(request.lastStatusChange as BigNumber)
                  .toNumber()}
              />
            )}
          </Label>

          <Challenge request={request} />

          <Label>
            Last status change: <TimeAgo time={request.lastStatusChange} />
          </Label>
        </div>

        <div className="w-full px-4 flex flex-col">
          <span className="mt-8 ml-8 text-xl font-semibold">{fullName}</span>
          <div className="flex mb-4">
            <Identicon address={request.requester} />
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
