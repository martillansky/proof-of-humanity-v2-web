import cn from "classnames";
import Field from "components/Field";
import Modal from "components/Modal";
import { Reason } from "constants/enum";
import { formatEther } from "ethers/lib/utils";
import {
  useArbitrationCost,
  useChallengeRequest,
} from "hooks/useProofOfHumanity";
import { useState } from "react";
import { uploadToIPFS } from "utils/ipfs";

interface ReasonCardInterface {
  text: string;
  reason: Reason;
  currentReason: Reason | null;
  setReason: React.Dispatch<React.SetStateAction<Reason | null>>;
}

const ReasonCard: React.FC<ReasonCardInterface> = ({
  text,
  reason,
  currentReason,
  setReason,
}) => (
  <div
    className={cn("p-1 bg-amber-100 rounded", {
      "outline outline-2 outline-amber-500": reason === currentReason,
    })}
    onClick={() => setReason(reason)}
  >
    {text}
  </div>
);

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
    <Modal
      trigger={
        <button className="px-6 py-2 bg-amber-400 rounded-full text-white">
          Challenge
        </button>
      }
    >
      <div className="flex flex-col items-center">
        <div className="w-full p-4 bg-amber-100 flex justify-center rounded font-bold">
          {arbitrationCost && formatEther(arbitrationCost)} ETH Deposit
        </div>
        <div className="w-full my-4 grid grid-cols-4 gap-2">
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
          textarea
          label="Justification"
          value={justification}
          onChange={(e) => setJustification(e.target.value)}
        />
        <button
          className="my-4 p-2 bg-blue-500 border rounded-full font-bold text-white self-end"
          onClick={submit}
        >
          Challenge request
        </button>
      </div>
    </Modal>
  );
};

export default Challenge;
