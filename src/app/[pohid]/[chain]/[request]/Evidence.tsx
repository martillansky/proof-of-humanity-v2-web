"use client";

import { useState, useMemo } from "react";
import ExternalLink from "components/ExternalLink";
import Accordion from "components/Accordion";
import Field from "components/Field";
import Label from "components/Label";
import Modal from "components/Modal";
import TimeAgo from "components/TimeAgo";
import Uploader from "components/Uploader";
import { ipfs, uploadToIPFS } from "utils/ipfs";
import usePoHWrite from "contracts/hooks/usePoHWrite";
import { Address, Hash } from "viem";
import useChainParam from "hooks/useChainParam";
import useIPFS from "hooks/useIPFS";
import { EvidenceFile } from "types/docs";
import { romanize } from "utils/misc";
import { explorerLink, shortenAddress } from "utils/address";
import Identicon from "components/Identicon";
import { RequestQuery } from "generated/graphql";
import withClientConnected from "components/high-order/withClientConnected";
import AttachmentIcon from "icons/AttachmentMajor.svg";
import DocumentIcon from "icons/NoteMajor.svg";
import { toast } from "react-toastify";
import { useLoading } from "hooks/useLoading";
import { enableReactUse } from "@legendapp/state/config/enableReactUse";

enableReactUse();

interface ItemInterface {
  index: number;
  uri: string;
  creationTime: number;
  sender: Address;
}

function Item({ index, uri, creationTime, sender }: ItemInterface) {
  const chain = useChainParam()!;
  const [evidence] = useIPFS<EvidenceFile>(uri);

  return (
    <div className="mt-4 flex flex-col">
      <div className="paper relative px-8 py-4">
        <span className="absolute left-3 text-sm text-slate-500">
          {romanize(index + 1)}
        </span>
        <div className="flex justify-between text-xl font-bold">
          {evidence?.name}
          {evidence?.fileURI && (
            <ExternalLink href={ipfs(evidence?.fileURI)}>
              <AttachmentIcon className="fill-black w-6 h-6" />
            </ExternalLink>
          )}
        </div>
        <p>{evidence?.description}</p>
      </div>
      <div className="px-4 py-2 flex items-center">
        <Identicon diameter={32} address={sender} />
        <div className="pl-2 flex flex-col">
          <span>
            submitted by{" "}
            <ExternalLink
              className="text-blue-500 underline underline-offset-2"
              href={explorerLink(sender, chain)}
            >
              {shortenAddress(sender)}
            </ExternalLink>
          </span>
          <TimeAgo time={creationTime} />
        </div>
      </div>
    </div>
  );
}

interface EvidenceProps extends JSX.IntrinsicAttributes {
  pohId: Hash;
  requestIndex: number;
  arbitrationInfo: NonNullable<RequestQuery["request"]>["arbitratorHistory"];
  list: NonNullable<RequestQuery["request"]>["evidenceGroup"]["evidence"];
}

export default withClientConnected<EvidenceProps>(function Evidence({
  pohId,
  requestIndex,
  list,
  arbitrationInfo,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const loading = useLoading(false, "Revoke");
  const [pending] = loading.use();

  const [prepare] = usePoHWrite(
    "submitEvidence",
    useMemo(
      () => ({
        onReady(fire) {
          fire();
          toast.info("Transaction pending");
        },
        onError() {
          loading.stop();
          toast.error("Transaction rejected");
        },
        onSuccess() {
          setModalOpen(false);
          toast.success("Request created");
        },
      }),
      [loading]
    )
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const submit = async () => {
    loading.start();

    const data = new FormData();
    data.append("###", "evidence.json");
    data.append("name", title);
    data.append("description", description);
    if (file) data.append("evidence", file, file.name);

    prepare({ args: [pohId, BigInt(requestIndex), await uploadToIPFS(data)] });
  };

  return (
    <Accordion title="Evidence">
      {requestIndex >= 0 && (
        <Modal
          formal
          open={modalOpen}
          header="Evidence"
          trigger={
            <button
              onClick={() => setModalOpen(true)}
              className="btn-main w-48 self-end mx-2 mt-2"
            >
              Add evidence
            </button>
          }
        >
          <div className="p-4 flex flex-col">
            <div className="centered flex-col">
              <ExternalLink
                className="flex"
                href={ipfs(arbitrationInfo.registrationMeta)}
              >
                <DocumentIcon className="fill-theme w-6 h-6" />
                <strong className="mr-1 text-theme font-semibold">
                  Registration Policy
                </strong>
                (at the time of submission)
              </ExternalLink>
              <span className="text-sm text-slate-400">
                Updated: <TimeAgo time={arbitrationInfo.updateTime} />
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
            <button
              disabled={pending}
              className="btn-main mt-12"
              onClick={submit}
            >
              Submit evidence
            </button>
          </div>
        </Modal>
      )}

      {list.map((item, i) => (
        <Item
          key={item.id}
          index={list.length - i - 1}
          creationTime={item.creationTime}
          sender={item.submitter}
          uri={item.uri}
        />
      ))}
    </Accordion>
  );
});
