import { ReasonEnum } from "enums/Reason";
import { useState } from "react";
import { RequestQueryItem } from "api/types";
import DocumentIcon from "assets/svg/NoteMajor.svg";
import ALink from "components/ALink";
import Field from "components/Field";
import Label from "components/Label";
import Modal from "components/Modal";
import TimeAgo from "components/TimeAgo";
import { Reason } from "generated/graphql";
import { useLoading } from "hooks/useLoading";
import {
  useArbitrationCost,
  useChallengeRequest,
} from "hooks/useProofOfHumanity";
import { ipfs, uploadToIPFS } from "utils/ipfs";
import { formatEth } from "utils/misc";
import ReasonCard from "./ReasonCard";

interface ChallengeInterface {
  request: RequestQueryItem;
}

const Challenge: React.FC<ChallengeInterface> = ({ request }) => {
  const challengeRequest = useChallengeRequest();
  const [justification, setJustification] = useState("");
  const [reason, setReason] = useState<Reason | null>(null);
  const loading = useLoading();

  const arbitrationCost = useArbitrationCost();

  const submit = async () => {
    if ((request.revocation === !reason && !justification) || !arbitrationCost)
      return;

    loading.start("Uploading evidence");

    const data = new FormData();
    data.append("###", "evidence.json");
    data.append("name", "Challenge Justification");
    if (justification) data.append("description", justification);

    const evidenceUri = await uploadToIPFS(data);

    loading.start("Executing transaction");

    challengeRequest(
      request.humanity.id,
      request.index,
      request.revocation ? 0 : ReasonEnum[reason!],
      evidenceUri,
      { value: arbitrationCost }
    );

    loading.stop();
  };

  console.log({ revocation: request.revocation, reason });

  return (
    <Modal
      formal
      header="Challenge"
      trigger={<button className="btn-main">Challenge</button>}
    >
      <div className="p-4 flex flex-col items-center">
        <ALink
          className="flex"
          href={ipfs(request.arbitratorData.registrationMeta)}
        >
          <DocumentIcon className="w-6 h-6 fill-theme" />
          <strong className="mr-1 text-theme font-semibold">
            Registration Policy
          </strong>
          (at the time of submission)
        </ALink>
        <span className="text-sm text-slate-400">
          Updated:{" "}
          <TimeAgo time={request.arbitratorData.metaEvidenceUpdateTime} />
        </span>

        {!request.revocation && (
          <>
            <Label>Select challenging reason</Label>
            <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2">
              <ReasonCard
                reason={Reason.IncorrectSubmission}
                text={"Incorrect Submission"}
                currentReason={reason}
                setReason={setReason}
              />
              <ReasonCard
                reason={Reason.Deceased}
                text={"Deceased"}
                currentReason={reason}
                setReason={setReason}
              />
              <ReasonCard
                reason={Reason.Duplicate}
                text={"Duplicate"}
                currentReason={reason}
                setReason={setReason}
              />
              <ReasonCard
                reason={Reason.DoesNotExist}
                text={"Does Not Exist"}
                currentReason={reason}
                setReason={setReason}
              />
            </div>
          </>
        )}

        <Field
          textarea
          label="Justification"
          value={justification}
          onChange={(e) => setJustification(e.target.value)}
        />

        <div className="mt-4 txt text-lg">
          Deposit: {arbitrationCost && formatEth(arbitrationCost)} ETH
        </div>

        <button
          disabled={request.revocation !== !reason || !justification}
          className="btn-main mt-12"
          onClick={submit}
        >
          Challenge request
        </button>
      </div>
    </Modal>
  );
};

export default Challenge;
