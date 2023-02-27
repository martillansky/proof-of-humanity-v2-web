import { ChainId } from "enums/ChainId";
import { PoHContract } from "enums/PoHContract";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EvidenceFileInterface, RegistrationFileInterface } from "api/files";
import {
  PastRequest as PastRequestType,
  PendingRequest as PendingRequestType,
} from "api/types";
import { useGateways } from "api/useGateways";
import { useHumanity } from "api/useHumanity";
import ProofOfHumanityLogo from "assets/svg/ProofOfHumanityLogo.svg";
import ALink from "components/ALink";
import Image from "components/Image";
import Modal from "components/Modal";
import PageLoader from "components/PageLoader";
import TimeAgo from "components/TimeAgo";
import Video from "components/Video";
import { CHAIN, supportedChainIds } from "constants/chains";
import { CONTRACT } from "constants/contracts";
import { Status } from "generated/graphql";
import useIPFS from "hooks/useIPFS";
import PendingRequest from "modules/PendingRequest";
import Transfer from "modules/crosschain/Transfer";
import Update from "modules/crosschain/Update";
import Revoke from "modules/humanity/Revoke";
import { explorerLink, shortenAddress } from "utils/address";
import { machinifyId, shortenId } from "utils/identifier";
import { ipfs } from "utils/ipfs";

interface TransferState {
  foreignProxy: string;
  senderChainId: ChainId;
  receivingChainId: ChainId;
  transferHash: string;
  transferTimestamp: string;
  received: boolean;
}

const Humanity: React.FC = () => {
  const { humanity: humanityId } = useParams();
  const humanityAllChains = useHumanity(humanityId && machinifyId(humanityId));

  const [homeChain, setHomeChain] = useState<ChainId>();
  const [lastEvidenceChain, setLastEvidenceChain] = useState<ChainId>();
  const [pendingRequests, setPendingRequests] = useState<PendingRequestType[]>(
    []
  );
  const [pastRequests, setPastRequests] = useState<PendingRequestType[]>([]);
  const [transferState, setTransferState] = useState<TransferState>();
  const gateways = useGateways();

  const winnerClaimRequest =
    lastEvidenceChain &&
    humanityAllChains![lastEvidenceChain]!.humanity!.winnerClaimRequest[0];

  const [winnerEvidence] = useIPFS<EvidenceFileInterface>(
    winnerClaimRequest?.evidence[0].URI
  );
  const [registration] = useIPFS<RegistrationFileInterface>(
    winnerEvidence?.fileURI
  );

  const fullName = registration?.firstName
    ? `${registration.firstName} ${registration.lastName}`
    : registration?.name;

  const updateTransferState = async () => {
    if (!humanityAllChains || !gateways) return;

    const lastTransferChain = supportedChainIds.sort((chain1, chain2) => {
      const out1 = humanityAllChains[chain1]?.outTransfer;
      const out2 = humanityAllChains[chain2]?.outTransfer;
      return out2
        ? out1
          ? out2.transferTimestamp - out1.transferTimestamp
          : 1
        : -1;
    })[0];

    if (
      !lastTransferChain ||
      !humanityAllChains[lastTransferChain]?.outTransfer
    )
      return;

    const { transferHash, foreignProxy, transferTimestamp } =
      humanityAllChains[lastTransferChain].outTransfer!;

    setTransferState({
      transferHash,
      foreignProxy,
      transferTimestamp,
      senderChainId: lastTransferChain,
      receivingChainId: supportedChainIds.find(
        (chainId) =>
          CONTRACT[PoHContract.CROSS_CHAIN_POH][chainId].toLowerCase() ===
          foreignProxy
      )!,
      received: !!supportedChainIds.find(
        (c) => CONTRACT[PoHContract.CROSS_CHAIN_POH][c] === foreignProxy
      ),
    });
  };

  useEffect(() => {
    if (!humanityAllChains) return;

    console.log({ humanityAllChains });

    setHomeChain(
      supportedChainIds.find(
        (chain) => humanityAllChains[chain]?.humanity?.claimed
      )
    );

    const lastEvChain = supportedChainIds.sort((chain1, chain2) => {
      const req1 = humanityAllChains[chain1]?.humanity?.winnerClaimRequest[0];
      const req2 = humanityAllChains[chain2]?.humanity?.winnerClaimRequest[0];
      return req2 ? (req1 ? req2.resolutionTime - req1.resolutionTime : 1) : -1;
    })[0];

    setLastEvidenceChain(
      humanityAllChains[lastEvChain]?.humanity?.winnerClaimRequest[0]
        ? lastEvChain
        : undefined
    );

    setPendingRequests(
      supportedChainIds.reduce<PendingRequestType[]>(
        (acc, chain) => [
          ...acc,
          ...(humanityAllChains[chain].humanity
            ? humanityAllChains[chain]!.humanity!.pendingRequests.filter(
                ({ status }: { status: Status }) => status !== Status.Withdrawn
              ).map((req: PendingRequestType) => ({ ...req, chainId: chain }))
            : []),
        ],
        []
      )
    );

    setPastRequests(
      supportedChainIds.reduce<PastRequestType[]>(
        (acc, chain) => [
          ...acc,
          ...(humanityAllChains[chain].humanity
            ? humanityAllChains[chain]!.humanity!.pastRequests.map(
                (req: PastRequestType) => ({ ...req, chainId: chain })
              )
            : []),
        ],
        []
      )
    );

    updateTransferState();
  }, [humanityAllChains]);

  if (!humanityId) return null;
  if (!humanityAllChains) return <PageLoader />;

  const HomeChainLogo = (homeChain && CHAIN[homeChain].Logo)!;

  return (
    <div className="content">
      <div className="mt-24 paper pt-20 pb-8 relative flex flex-col items-center">
        <div className="absolute bordered left-1/2 -top-16 -translate-x-1/2 rounded-full shadow">
          <div className="w-32 h-32 px-6 pt-5 rounded-full bg-white">
            <ProofOfHumanityLogo />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-slate-400">Humanity ID</span>
          <span className="mb-12 font-semibold text-xl">
            {shortenId(humanityId!)}
          </span>
        </div>

        {lastEvidenceChain && homeChain ? (
          <>
            <div className="mb-8 flex flex-col">
              <div className="flex justify-between mb-2">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">
                    Claimed by <strong>{fullName}</strong>
                  </span>
                  <ALink
                    className="underline underline-offset-2"
                    href={explorerLink(
                      humanityAllChains[homeChain]!.humanity!.owner!.id,
                      homeChain
                    )}
                  >
                    {shortenAddress(
                      humanityAllChains[homeChain]!.humanity!.owner!.id
                    )}
                  </ALink>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-slate-400">Home chain</span>
                  <span className="flex font-semibold">
                    <HomeChainLogo className="w-6 h-6 mr-1" />
                    {CHAIN[homeChain].NAME}
                  </span>
                </div>
              </div>

              {registration && (
                <div className="flex flex-col items-end">
                  <div className="w-full flex flex-col sm:flex-row items-center justify-center mx-auto">
                    <Image uri={ipfs(registration!.photo)} rounded previewed />
                    <Video
                      className="h-40 mt-4 sm:mt-0 sm:ml-8 cursor-pointer"
                      uri={ipfs(registration!.video)}
                      previewed
                    />
                  </div>

                  {winnerClaimRequest && (
                    <Link
                      className="mt-1 text-theme underline underline-offset-2 font-semibold"
                      to={`/request/${CHAIN[
                        lastEvidenceChain
                      ].NAME.toLowerCase()}/${humanityId}/${
                        (winnerClaimRequest.legacy ? -1 : 1) *
                        winnerClaimRequest.index
                      }`}
                    >
                      See winner claim request ➜
                    </Link>
                  )}
                </div>
              )}
            </div>

            <Revoke humanity={humanityId} homeChain={homeChain} />

            <Transfer homeChain={homeChain} />
            <Update
              humanityAllChains={humanityAllChains}
              homeChain={homeChain}
            />
          </>
        ) : (
          <>
            <span className="mb-8">Not claimed</span>
            <Link to={`/claim/${humanityId}`} className="btn-main w-48">
              Claim humanity
            </Link>
          </>
        )}

        {transferState && (
          <Modal
            trigger={
              <button className="m-4 p-2 border-2 border-blue-500 text-blue-500 font-bold">
                ⏳ Pending transfer
              </button>
            }
            header="Last transfer"
          >
            <div className="paper p-4 flex flex-col">
              <span>
                {CHAIN[transferState.senderChainId].NAME} ▶{" "}
                {CHAIN[transferState.receivingChainId].NAME}
              </span>
              <TimeAgo time={parseInt(transferState.transferTimestamp)} />
              <span>Received: {String(transferState.received)}</span>
              <span>
                Transfer hash: {transferState.transferHash.substring(0, 12)}...
              </span>
            </div>
          </Modal>
        )}
      </div>

      <div className="paper p-4 mt-4 mb-1 flex justify-between">
        {pendingRequests.length} pending request
        {pendingRequests.length !== 1 && "s"}
      </div>
      {pendingRequests.map((req, index) => (
        <PendingRequest key={index} humanity={humanityId} request={req} />
      ))}

      <div className="paper p-4 mt-8 mb-1 flex justify-between">
        {pastRequests.length} past resolved request
        {pastRequests.length !== 1 && "s"}
      </div>
      {pastRequests.map((req, index) => (
        <PendingRequest key={index} humanity={humanityId} request={req} />
      ))}
    </div>
  );
};

export default Humanity;
