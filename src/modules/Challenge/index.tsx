import Modal from "components/Modal";
import { Reason } from "constants/enum";
import {
  useArbitrationCost,
  useChallengeRequest,
} from "hooks/useProofOfHumanity";
import { useState } from "react";
import { uploadToIPFS } from "utils/ipfs";
import { formatEth } from "utils/misc";
import Field from "components/Field";
import Label from "components/Label";
import ReasonCard from "./ReasonCard";

const Challenge: React.FC = () => {
  const [challengeRequest] = useChallengeRequest();
  const [justification, setJustification] = useState("");
  const [reason, setReason] = useState<Reason | null>(null);

  const arbitrationCost = useArbitrationCost();

  const submit = async () => {
    if (!reason || !justification || !arbitrationCost) return;

    const evidenceUri = await uploadToIPFS(
      Buffer.from(
        JSON.stringify({
          name: "Challenge Justification",
          description: justification,
        })
      ),
      "evidence.json"
    );

    challengeRequest("0", 0, reason, evidenceUri, { value: arbitrationCost });
  };

  return (
    <Modal trigger={<button className="btn-main">Challenge</button>}>
      <div className="flex flex-col items-center">
        <div className="txt">
          {arbitrationCost && formatEth(arbitrationCost)} ETH
        </div>
        <Label>Reason</Label>
        <div className="w-full grid grid-cols-4 gap-2">
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

        <Field
          label="Justification"
          textarea
          value={justification}
          onChange={(e) => setJustification(e.target.value)}
        />

        <button className="btn-main mt-12" onClick={submit}>
          Challenge request
        </button>
      </div>
    </Modal>
  );
};

export default Challenge;
