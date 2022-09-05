import { BigNumberish } from "ethers";
import React, { useState } from "react";
import { RequestQueryItem } from "api/types";
import Accordion from "components/Accordion";
import Field from "components/Field";
import Label from "components/Label";
import Modal from "components/Modal";
import Uploader from "components/Uploader";
import useChangeChain from "hooks/useChangeChain";
import { useSubmitEvidence } from "hooks/useProofOfHumanity";
import useSuggestedChain from "hooks/useSuggestedChain";
import { EvidenceFile } from "types/docs";
import { uploadToIPFS } from "utils/ipfs";
import EvidenceItem from "./Item";

interface EvidenceProps {
  humanityId: string;
  requestIndex: BigNumberish;
  request: RequestQueryItem;
}

const EvidenceSection: React.FC<EvidenceProps> = ({
  requestIndex,
  humanityId,
  request,
}) => {
  const chainId = useSuggestedChain();
  const submitEvidence = useSubmitEvidence();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const changeChain = useChangeChain();

  const submit = async () => {
    if (await changeChain()) return;

    const evidence: EvidenceFile = { name: title, description };

    if (file) {
      evidence.fileURI = await uploadToIPFS(
        await file.arrayBuffer(),
        file.name
      );
    }

    const evidenceUri = await uploadToIPFS(
      JSON.stringify(evidence),
      "evidence.json"
    );

    await submitEvidence(humanityId, requestIndex, evidenceUri);
  };

  return (
    <Accordion title="Evidence">
      <Modal
        trigger={
          <button className="btn-main w-48 self-end mx-2 mt-2">
            Add evidence
          </button>
        }
      >
        <div className="flex flex-col">
          <span className="txt m-auto">Submit evidence</span>
          <Field
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Field
            textarea
            label="Description (Your Arguments)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Label>File</Label>
          <div className="bordered w-full rounded-sm">
            <Uploader
              className="w-full flex justify-center bg-white p-2 outline-dotted outline-white rounded-sm"
              type="all"
              onDrop={(acceptedFiles) => setFile(acceptedFiles[0])}
            >
              {file
                ? file.name
                : "Drag 'n drop some files here, or click to select files"}
            </Uploader>
          </div>
          <button className="btn-main mt-12" onClick={submit}>
            Submit evidence
          </button>
        </div>
      </Modal>

      {request.evidence.reverse().map((evidence, i) => (
        <EvidenceItem
          key={evidence.id}
          index={i}
          chainId={chainId!}
          evidence={evidence}
        />
      ))}
    </Accordion>
  );
};

export default EvidenceSection;
