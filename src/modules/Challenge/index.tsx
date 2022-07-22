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

interface ChallengeProps {}

const Challenge: React.FC<ChallengeProps> = () => {
  const [challengeRequest] = useChallengeRequest();
  const [justification, setJustification] = useState("");
  const [reason, setReason] = useState<Reason | null>(null);

  const arbitrationCost = useArbitrationCost();

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
          <div className="bg-amber-100 rounded">Incorrect Submission</div>
          <div className="bg-amber-100 rounded">Deceased</div>
          <div className="bg-amber-100 rounded">Duplicate</div>
          <div className="bg-amber-100 rounded">Does Not Exist</div>
        </div>
        <Field
          textarea
          label="Justification"
          value={justification}
          onChange={(e) => setJustification(e.target.value)}
        />
        <button
          className="my-4 p-2 bg-blue-500 border rounded-full font-bold text-white self-end"
          onClick={async () => {
            if (!reason || !justification || !arbitrationCost) return;

            const evidenceUri = await uploadToIPFS(
              "evidence.json",
              Buffer.from(
                JSON.stringify({
                  name: "Challenge Justification",
                  description: justification,
                })
              )
            );

            await challengeRequest("0x0", reason, "0xDuP", evidenceUri, {
              value: arbitrationCost,
            });
          }}
        >
          Challenge request
        </button>
      </div>
    </Modal>
  );
};

export default Challenge;
