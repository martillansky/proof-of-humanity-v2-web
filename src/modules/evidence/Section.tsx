import { BigNumberish } from "ethers";
import React, { useState } from "react";
import { RequestQueryItem } from "api/types";
import DocumentIcon from "assets/svg/NoteMajor.svg";
import ALink from "components/ALink";
import Accordion from "components/Accordion";
import Field from "components/Field";
import Label from "components/Label";
import Modal from "components/Modal";
import TimeAgo from "components/TimeAgo";
import Uploader from "components/Uploader";
import { useSubmitEvidence } from "hooks/useProofOfHumanity";
import useSuggestedChain from "hooks/useSuggestedChain";
import useSwitchChain from "hooks/useSwitchChain";
import { EvidenceFile } from "types/docs";
import { ipfs, uploadToIPFS } from "utils/ipfs";
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
  const switchChain = useSwitchChain();

  const submit = async () => {
    if (!chainId || (await switchChain(chainId))) return;

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
        formal
        header="Evidence"
        trigger={
          <button className="btn-main w-48 self-end mx-2 mt-2">
            Add evidence
          </button>
        }
      >
        <div className="p-4 flex flex-col">
          <div className="centered flex-col">
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
          </div>

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

      {request.evidence.map((evd, i) => (
        <EvidenceItem
          key={evd.id}
          index={request.evidence.length - i - 1}
          chainId={chainId!}
          evidence={evd}
        />
      ))}
    </Accordion>
  );
};

export default EvidenceSection;
