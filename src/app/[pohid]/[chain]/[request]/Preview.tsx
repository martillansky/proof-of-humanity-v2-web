"use client";

import ExternalLink from "components/ExternalLink";
import Identicon from "components/Identicon";
import Previewed from "components/Previewed";
import Label from "components/Label";
import TimeAgo from "components/TimeAgo";
import useChainParam from "hooks/useChainParam";
import Image from "next/image";
import Link from "next/link";
import { EvidenceFile, RegistrationFile } from "types/docs";
import { explorerLink } from "utils/address";
import { ipfs } from "utils/ipfs";
import { Address, Hash } from "viem";
import { prettifyId } from "utils/identifier";
import { getChainLogo } from "config/icons";
import AttachmentIcon from "icons/AttachmentMajor.svg";

interface PreviewProps {
  pohId: Hash;
  claimer: { id: Address; name: string };
  revocation: boolean;
  requester: Address;
  registrationEvidence?: RegistrationFile | null;
  revocationEvidence?: EvidenceFile | null;
  lastStatusChange: number;
}

function RequestPreview({
  claimer,
  pohId,
  revocation,
  requester,
  registrationEvidence,
  revocationEvidence,
  lastStatusChange,
}: PreviewProps) {
  const chain = useChainParam()!;
  const ChainLogo = getChainLogo(chain.id);
  return (
    <div className="mb-6 border shadow bg-white rounded">
      {revocation && revocationEvidence && (
        <div className="p-4 bg-shade-100">
          <div className="relative">
            <div className="flex justify-between">
              Revocation requested - {revocationEvidence.name}
              {revocationEvidence.fileURI && (
                <ExternalLink href={ipfs(revocationEvidence.fileURI)}>
                  <AttachmentIcon className="w-4 h-4 fill-black" />
                </ExternalLink>
              )}
            </div>
            <p className="text-slate-600">{revocationEvidence.description}</p>
          </div>
          <div className="flex font-normal text-sm">
            <span className="mr-2">Requested by</span>
            <Identicon diameter={16} address={requester} />
            <ExternalLink
              className="ml-1 text-blue-500 underline underline-offset-2"
              href={explorerLink(requester, chain)}
            >
              {requester}
            </ExternalLink>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row">
        <div className="relative pt-8 md:pb-48 px-8 md:w-2/5 flex flex-col background items-center border-r">
          {registrationEvidence && (
            <Previewed
              uri={ipfs(registrationEvidence.photo)}
              trigger={
                <Image
                  className="w-32 h-32 bg-no-repeat bg-cover bg-center rounded-full cursor-pointer"
                  alt="image"
                  src={ipfs(registrationEvidence.photo)}
                  width={144}
                  height={144}
                />
              }
            />
          )}

          <span className="mt-4 mb-12 text-2xl">{claimer.name}</span>

          <Label className="absolute p-8 left-0 right-0 bottom-0">
            Last update: <TimeAgo time={lastStatusChange} />
          </Label>
        </div>

        <div className="w-full p-8 flex flex-col">
          <div className="mb-4 flex justify-between">
            <div className="flex mb-4">
              <Identicon address={claimer.id} />
              <ExternalLink
                className="ml-2 font-semibold underline underline-offset-2"
                href={explorerLink(claimer.id, chain)}
              >
                {claimer.id}
              </ExternalLink>
            </div>
            <span className="flex">
              <ChainLogo className="w-4 h-4 m-1 fill-black" />
              {chain.name}
            </span>
          </div>

          <div className="mb-8 flex items-center text-emerald-500">
            <span className="mr-4 font-normal">POH ID:</span>
            <Link href={`/${prettifyId(pohId)}`}>{prettifyId(pohId)} ➜</Link>
          </div>

          {registrationEvidence && (
            <video
              className="w-full"
              src={ipfs(registrationEvidence.video)}
              controls
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default RequestPreview;
