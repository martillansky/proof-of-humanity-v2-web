import Accordion from "components/Accordion";
import Field from "components/Field";
import Label from "components/Label";
import Modal from "components/Modal";
import Uploader from "components/Uploader";
import { ChainId } from "constants/chains";
import { BigNumberish } from "ethers";
import { RequestQuery } from "generated/graphql";
import { useSubmitEvidence } from "hooks/useProofOfHumanity";
import React, { useState } from "react";
import { uploadToIPFS } from "utils/ipfs";
import EvidenceItem from "./Item";

type RequestQueryItem = NonNullable<RequestQuery["request"]>;

interface EvidenceProps {
  soulId: BigNumberish;
  requestIndex: BigNumberish;
  chainId: ChainId;
  request: RequestQueryItem;
}

const EvidenceSection: React.FC<EvidenceProps> = ({
  chainId,
  requestIndex,
  soulId,
  request,
}) => {
  const [submitEvidence] = useSubmitEvidence();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const submit = async () => {
    const evidence: Evidence = { name: title, description };

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

    await submitEvidence(soulId, requestIndex, evidenceUri);
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

      {request.evidence.map((evidence, i) => (
        <EvidenceItem
          key={evidence.id}
          index={i}
          chainId={chainId}
          evidence={evidence}
        />
      ))}
    </Accordion>
  );
};

export default EvidenceSection;
