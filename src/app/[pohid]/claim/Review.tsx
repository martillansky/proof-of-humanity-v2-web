import Field from "components/Field";
import Label from "components/Label";
import TimeAgo from "components/TimeAgo";
import { ipfs } from "utils/ipfs";
import { formatEth } from "utils/misc";
import { useAccount, useBalance, useChainId } from "wagmi";
import { ObservableObject, ObservablePrimitiveBaseFns } from "@legendapp/state";
import { MediaState, SubmissionState } from "./Form";
import { formatEther } from "viem";
import { SupportedChainId, idToChain } from "config/chains";
import ExternalLink from "components/ExternalLink";
import Image from "next/image";
import Previewed from "components/Previewed";
import DocumentIcon from "icons/NoteMajor.svg";
import { ContractData } from "data/contract";

interface ReviewProps {
  arbitrationInfo: ContractData["arbitrationInfo"];
  totalCost: bigint;
  selfFunded$: ObservablePrimitiveBaseFns<number>;
  state$: ObservableObject<SubmissionState>;
  media$: ObservableObject<MediaState>;
  loadingMessage?: string;
  submit: () => void;
}

function Review({
  arbitrationInfo,
  totalCost,
  selfFunded$,
  state$,
  media$,
  loadingMessage,
  submit,
}: ReviewProps) {
  const selfFunded = selfFunded$.use();
  const { pohId, name } = state$.use();
  const { photo, video } = media$.use();
  const { address } = useAccount();
  const chainId = useChainId() as SupportedChainId;

  const { data: balance } = useBalance({ address, chainId });

  const { nativeCurrency } = idToChain(chainId);

  return (
    <>
      <span className="w-full my-4 flex flex-col text-2xl font-semibold">
        Finalize your registration
        <div className="divider mt-4 w-2/3" />
      </span>

      <div className="centered flex-col mb-4">
        <ExternalLink
          className="flex mr-1 text-theme font-semibold"
          href={ipfs(arbitrationInfo.policy)}
        >
          <DocumentIcon className="fill-theme w-6 h-6" />
          Registration Policy
        </ExternalLink>
        <span className="text-sm text-slate-400">
          Updated: <TimeAgo time={arbitrationInfo.updateTime} />
        </span>
      </div>

      <span className="txt pb-8">
        Check the uploaded files and make sure they are according to the rules:
        <ul className="list-disc ml-8">
          <li>
            Photo must be facing forward, without any covering that might hide
            facial features
          </li>
          <li>
            No filters, heavy makeup or adornments that might obscure the face,
            hats are okay
          </li>
          <li>Make sure the video follows the rules</li>
        </ul>
      </span>

      <div className="w-full flex flex-col sm:flex-row items-center justify-center mx-auto">
        <Previewed
          uri={photo!.uri}
          trigger={
            <Image
              alt="preview"
              className="w-48 h-48 rounded-full"
              src={photo!.uri}
              width={256}
              height={256}
            />
          }
        />
        <Previewed
          isVideo
          uri={video!.uri}
          trigger={
            <video
              className="h-48 mt-4 sm:mt-0 sm:ml-8 cursor-pointer"
              src={video!.uri}
            />
          }
        />
      </div>

      <div className="w-full flex flex-col">
        <Field label="Proof of Humanity ID" value={pohId} disabled />
        <Field label="Name" value={name} disabled />
        <Field label="Account" value={address} disabled />

        <Label>
          <div className="flex items-center">
            Initial deposit
            {balance && (
              <span className="ml-8 text-slate-700 normal-case">
                Your balance:{" "}
                <strong>
                  {formatEth(balance.value)} {nativeCurrency.symbol}
                </strong>
              </span>
            )}
          </div>
        </Label>
        <div className="txt flex flex-col mb-16">
          <div className="inline-flex items-center">
            <div className="w-48 mr-2">
              <Field
                type="number"
                className="no-spinner text-right"
                step="any"
                min={0}
                max={formatEther(totalCost)}
                value={selfFunded}
                onChange={(event) => selfFunded$.set(+event.target.value)}
              />
            </div>
            of
            <span
              onClick={() => selfFunded$.set(formatEth(totalCost))}
              className="mx-1 text-theme font-semibold underline underline-offset-2 cursor-pointer"
            >
              {formatEther(totalCost)}
            </span>{" "}
            {nativeCurrency.symbol}
          </div>

          <span className="mt-2 text-blue-500">
            The deposit is reimbursed after successful registration, and lost
            after failure. Any amount not contributed now can be put up by
            crowdfunders later.
          </span>
        </div>
      </div>
      {loadingMessage ? (
        <button className="btn-main">
          <Image
            alt="loading"
            src="/logo/poh-white.svg"
            className="animate-flip fill-white"
            width={14}
            height={14}
          />
          {loadingMessage}...
        </button>
      ) : (
        <button className="btn-main" onClick={submit}>
          Submit
        </button>
      )}
    </>
  );
}

export default Review;
