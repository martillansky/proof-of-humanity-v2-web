import Accordion from "components/Accordion";
import ALink from "components/ALink";
import Field from "components/Field";
import Identicon from "components/Identicon";
import Modal from "components/Modal";
import TimeAgo from "components/TimeAgo";
import Uploader from "components/Uploader";
import { ChainId, CHAIN_SETTING } from "constants/chains";
import { BigNumberish } from "ethers";
import { RequestQuery } from "generated/graphql";
import useIPFS from "hooks/useIPFS";
import { useSubmitEvidence } from "hooks/useProofOfHumanity";
import React, { useState } from "react";
import { explorerLink } from "utils/address";
import { ipfs, uploadToIPFS } from "utils/ipfs";

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
      <div className="border-t">
        <Modal
          trigger={
            <button className="p-2 m-2 bg-blue-500 border rounded-full font-bold text-white">
              Submit evidence
            </button>
          }
        >
          <div className="flex flex-col">
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
            <Uploader
              className="w-full flex justify-center p-2 border-dashed border-2 border-sky-500 rounded"
              type="all"
              onDrop={(acceptedFiles) => setFile(acceptedFiles[0])}
              label="File"
            >
              {file
                ? file.name
                : "Drag 'n drop some files here, or click to select files"}
            </Uploader>
            <button
              className="my-4 p-2 bg-blue-500 border rounded-full font-bold text-white self-end"
              onClick={submit}
            >
              Submit evidence
            </button>
          </div>
        </Modal>

        {request.evidence.map((evidence) => (
          <EvidenceItem
            key={evidence.id}
            chainId={chainId}
            evidence={evidence}
          />
        ))}
      </div>
    </Accordion>
  );
};

export default EvidenceSection;

interface EvidenceItemInterface {
  chainId: ChainId;
  evidence: ArrayElement<RequestQueryItem["evidence"]>;
}

const EvidenceItem: React.FC<EvidenceItemInterface> = ({
  chainId,
  evidence,
}) => {
  const [evidenceFile] = useIPFS<Evidence>(evidence.URI);

  return (
    <div className="border-t flex flex-col">
      <div className="p-4">
        <div className="text-xl font-bold">{evidenceFile?.name}</div>
        <p>{evidenceFile?.description}</p>
      </div>
      <div className="px-4 py-2 flex items-center bg-amber-100">
        <Identicon diameter={32} address={evidence.sender} />
        <div className="pl-2 flex flex-col">
          <span>
            submitted by{" "}
            <ALink
              className="text-blue-500 underline underline-offset-2"
              href={explorerLink(evidence.sender, chainId)}
            >
              {evidence.sender}
            </ALink>
          </span>
          <TimeAgo time={evidence.creationTime} />
        </div>
        {evidenceFile?.fileURI && (
          <ALink
            className="ml-8 px-2 py-1 bg-blue-500 text-white rounded-full"
            href={ipfs(evidenceFile?.fileURI)}
          >
            FILE
          </ALink>
        )}
      </div>
    </div>
  );
};
