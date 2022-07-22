import { AddressZero } from "@ethersproject/constants";
import Accordion from "components/Accordion";
import Field from "components/Field";
import Identicon from "components/Identicon";
import Modal from "components/Modal";
import Uploader from "components/Uploader";
import { useSubmitEvidence } from "hooks/useProofOfHumanity";
import useWeb3 from "hooks/useWeb3";
import React, { useState } from "react";
import { uploadToIPFS } from "utils/ipfs";

interface EvidenceProps {}

const Evidence: React.FC<EvidenceProps> = () => {
  const { account } = useWeb3();
  const [submitEvidence] = useSubmitEvidence();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

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
              <p>Drag 'n drop some files here, or click to select files</p>
            </Uploader>
            <button
              className="my-4 p-2 bg-blue-500 border rounded-full font-bold text-white self-end"
              onClick={async () => {
                const evidence: Evidence = { name: title, description };

                if (file) {
                  evidence.fileURI = await uploadToIPFS(
                    file.name,
                    await file.arrayBuffer()
                  );
                }

                const evidenceUri = await uploadToIPFS(
                  "evidence.json",
                  Buffer.from(JSON.stringify(evidence))
                );

                console.log({ evidenceUri });

                const tx = await submitEvidence(AddressZero, evidenceUri);

                console.log({ tx });
              }}
            >
              Submit evidence
            </button>
          </div>
        </Modal>

        <div className="border-t flex flex-col">
          <div className="p-4">
            <div className="text-xl font-bold">Challenge Title</div>
            <p>Challenge description</p>
          </div>
          <div className="px-4 py-2 flex items-center bg-amber-100">
            <Identicon diameter={32} address={account} />
            <div className="pl-2 flex flex-col">
              <span>
                <strong>#1</strong> submitted by 0x0
              </span>
              <span>Date submitted</span>
            </div>
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default Evidence;
