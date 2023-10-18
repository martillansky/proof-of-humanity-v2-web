"use client";

import { useState, useMemo } from "react";
import ALink from "components/ExternalLink";
import Field from "components/Field";
import Label from "components/Label";
import Modal from "components/Modal";
import Uploader from "components/Uploader";
import { ipfs, uploadToIPFS } from "utils/ipfs";
import { formatEth } from "utils/misc";
import { SupportedChain, SupportedChainId } from "config/chains";
import usePoHWrite from "contracts/hooks/usePoHWrite";
import { Hash } from "viem";
import { ContractQuery } from "generated/graphql";
import withClientConnected from "components/high-order/withClientConnected";
import { useLoading } from "hooks/useLoading";
import { toast } from "react-toastify";
import DocumentIcon from "icons/NoteMajor.svg";
import { enableReactUse } from "@legendapp/state/config/enableReactUse";
import { useChainId } from "wagmi";
import useWeb3Loaded from "hooks/useWeb3Loaded";

enableReactUse();

interface RevokeProps extends JSX.IntrinsicAttributes {
  cost: bigint;
  pohId: Hash;
  homeChain: SupportedChain;
  arbitrationInfo: NonNullable<
    NonNullable<ContractQuery["contract"]>["latestArbitratorHistory"]
  >;
}

export default withClientConnected<RevokeProps>(function Revoke({
  pohId,
  cost,
  homeChain,
  arbitrationInfo,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const loading = useLoading(false, "Revoke");
  const [pending] = loading.use();
  const connectedChainId = useChainId() as SupportedChainId;
  const web3Loaded = useWeb3Loaded();

  const [prepare] = usePoHWrite(
    "revokeHumanity",
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

  const submit = async () => {
    loading.start();

    const data = new FormData();
    data.append("###", "evidence.json");
    data.append("name", title);
    data.append("description", description);
    if (file) data.append("fileURI", file, file.name);

    const evidenceUri = await uploadToIPFS(data);

    prepare({ args: [pohId, evidenceUri], value: cost });
  };

  if (web3Loaded && homeChain.id !== connectedChainId)
    return (
      <span className="mb-4 text-slate-500">
        Connect to <strong>{homeChain.name}</strong> to revoke.
      </span>
    );

  return (
    <Modal
      formal
      open={modalOpen}
      header="Revoke"
      trigger={
        <button onClick={() => setModalOpen(true)} className="btn-main mb-4">
          Revoke
        </button>
      }
    >
      <div className="p-4 flex flex-col items-center">
        <ALink className="flex" href={ipfs(arbitrationInfo.registrationMeta)}>
          <DocumentIcon className="fill-theme w-6 h-6" />
          <strong className="mr-1 text-theme font-semibold">Policy</strong>
        </ALink>

        <span className="txt mt-8">
          In order to request removal you need to deposit
        </span>
        <span className="font-semibold text-xl">
          {formatEth(cost)} {homeChain.nativeCurrency.symbol}
        </span>

        <span className="m-4">
          Anyone can put a deposit claiming the removal to be incorrect. If no
          one does, the individual is removed from the list. If one does, a
          dispute is created.
        </span>

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

        <button disabled={pending} className="btn-main mt-12" onClick={submit}>
          Revoke
        </button>
      </div>
    </Modal>
  );
});
