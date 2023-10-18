"use client";

import { colorForStatus } from "config/misc";
import { queryToStatus } from "config/requests";
import { WinnerClaimFragment } from "generated/graphql";
import { camelToTitle } from "utils/case";
import { prettifyId } from "utils/identifier";
import { idToChain, SupportedChainId } from "config/chains";
import { Address } from "viem";
import { ipfs } from "utils/ipfs";
import { shortenAddress } from "utils/address";
import Link from "next/link";
import ErrorBoundary from "components/ErrorBoundary";
import { Suspense } from "react";
import useIPFS from "hooks/useIPFS";
import { EvidenceFile, RegistrationFile } from "types/docs";
import { RequestsQueryItem } from "./Grid";
import ChainLogo from "components/ChainLogo";

interface ContentProps {
  chainId: SupportedChainId;
  revocation: boolean;
  evidence: RequestsQueryItem["evidenceGroup"]["evidence"];
  claimer: RequestsQueryItem["claimer"];
  requester: Address;
  humanity: { id: string } & WinnerClaimFragment;
}

interface CardInterface extends ContentProps {
  index: number;
  status: string;
}

const LoadingFallback: React.FC = () => (
  <div className="p-2 h-84 flex flex-col items-center bg-white">
    <div className="animate-pulse mx-auto mb-2 h-32 w-32 bg-slate-200 rounded-full" />
    <div className="animate-pulse w-1/2 h-4 bg-slate-200 rounded" />
  </div>
);

const ErrorFallback: React.FC<{ claimer?: { name?: string | null } }> = ({
  claimer,
}) => (
  <div className="animate-pulse p-2 h-84 flex flex-col items-center bg-white">
    <div className="mx-auto mb-2 h-32 w-32 bg-slate-200 rounded-full" />
    <span className="font-semibold">{claimer?.name}</span>
    <span>Some error occurred...</span>
  </div>
);

const Content = ({
  chainId,
  revocation,
  humanity,
  evidence,
  requester,
  claimer,
}: ContentProps) => {
  const [evidenceURI] = useIPFS<EvidenceFile>(
    revocation
      ? humanity.winnerClaim.at(0)?.evidenceGroup.evidence.at(-1)?.uri
      : evidence.at(-1)?.uri,
    { suspense: true }
  );
  const [data] = useIPFS<RegistrationFile>(evidenceURI?.fileURI, {
    suspense: true,
  });

  return (
    <div className="p-3 h-full flex flex-col items-center bg-white">
      <div
        className={"w-32 h-32 bg-no-repeat bg-cover bg-center rounded-full"}
        style={{ backgroundImage: `url('${ipfs(data?.photo!)}')` }}
      />
      <span className="my-2 font-semibold truncate">{claimer.name}</span>
      <div className="grid grid-cols-3 items-center">
        <ChainLogo chainId={chainId} className="w-4 h-4 fill-slate-400" />
        <span className="text-slate-400">{shortenAddress(requester)}</span>
      </div>
    </div>
  );
};

function Card({
  status,
  revocation,
  index,
  requester,
  chainId,
  claimer,
  evidence,
  humanity: { id: pohId, winnerClaim },
}: CardInterface) {
  const statusTitle = queryToStatus(status, revocation);
  const statusColor = colorForStatus(status, revocation);

  const chain = idToChain(chainId);

  return (
    <Link
      href={`/${prettifyId(pohId)}/${chain.name.toLowerCase()}/${index}`}
      className="h-84 rounded border bg-white shadow-sm flex-col overflow-hidden hover:scale-110 hover:z-10 hover:shadow-xl transition duration-150 ease-out cursor-pointer wiggle"
    >
      <div className="justify-between font-light">
        <div className={`w-full h-1 bg-status-${statusColor}`} />
        <div className="p-2 centered font-medium">
          <span className={`text-status-${statusColor}`}>
            {camelToTitle(statusTitle)}
          </span>
          <span className={`dot ml-2 bg-status-${statusColor}`} />
        </div>
      </div>

      <ErrorBoundary
        fallback={<ErrorFallback claimer={claimer} />}
        resetSwitch={evidence.at(0)?.uri}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Content
            chainId={chainId}
            claimer={claimer}
            evidence={evidence}
            humanity={{ id: pohId, winnerClaim }}
            requester={requester}
            revocation={revocation}
          />
        </Suspense>
      </ErrorBoundary>
    </Link>
  );
}

export default Card;
