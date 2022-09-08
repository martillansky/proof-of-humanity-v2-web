import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EvidenceFileInterface, RegistrationFileInterface } from "api/files";
import { PendingRequest as PendingRequestType } from "api/types";
import { useHumanity } from "api/useHumanity";
import ProofOfHumanityLogo from "assets/svg/ProofOfHumanityLogo.svg";
import ALink from "components/ALink";
import Image from "components/Image";
import PageLoader from "components/PageLoader";
import Video from "components/Video";
import { CHAIN, ChainId, SUPPORTED_CHAIN_IDS } from "constants/chains";
import useIPFS from "hooks/useIPFS";
import PendingRequest from "modules/PendingRequest";
import Revoke from "modules/humanity/Revoke";
import { explorerLink, shortenAddress } from "utils/address";
import { machinifyId, shortenId } from "utils/identifier";
import { ipfs } from "utils/ipfs";

const Humanity: React.FC = () => {
  const { humanity: humanityId } = useParams();
  const humanityAllChains = useHumanity(humanityId && machinifyId(humanityId));

  const [homeChain, setHomeChain] = useState<ChainId>();
  const [pendingRequests, setPendingRequests] = useState<PendingRequestType[]>(
    []
  );

  const winnerClaimRequest =
    homeChain && humanityAllChains![homeChain]!.winnerClaimRequest[0];

  const [winnerEvidence] = useIPFS<EvidenceFileInterface>(
    winnerClaimRequest?.evidence[0].URI
  );
  const [winnerRegistration] = useIPFS<RegistrationFileInterface>(
    winnerEvidence?.fileURI
  );

  useEffect(() => {
    if (!humanityAllChains) return;

    setHomeChain(
      SUPPORTED_CHAIN_IDS.find((chain) => humanityAllChains[chain]?.claimed)
    );
    setPendingRequests(
      SUPPORTED_CHAIN_IDS.reduce<PendingRequestType[]>(
        (acc, chain) => [
          ...acc,
          ...(humanityAllChains[chain]
            ? humanityAllChains[chain]!.pendingRequests.map((req) => ({
                ...req,
                chainId: chain,
              }))
            : []),
        ],
        []
      )
    );
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

        {homeChain ? (
          <>
            <div className="mb-8 flex flex-col">
              <div className="flex justify-between mb-2">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">
                    Claimed by{" "}
                    <strong>{humanityAllChains[homeChain]!.owner!.name}</strong>
                  </span>
                  <ALink
                    className="underline underline-offset-2"
                    href={explorerLink(
                      humanityAllChains[homeChain]!.owner!.id,
                      homeChain
                    )}
                  >
                    {shortenAddress(humanityAllChains[homeChain]!.owner!.id)}
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

              {winnerRegistration && (
                <div className="flex flex-col items-end">
                  <div className="w-full flex flex-col sm:flex-row items-center justify-center mx-auto">
                    <Image
                      uri={ipfs(winnerRegistration!.photo)}
                      rounded
                      previewed
                    />
                    <Video
                      className="h-40 mt-4 sm:mt-0 sm:ml-8 cursor-pointer"
                      uri={ipfs(winnerRegistration!.video)}
                      previewed
                    />
                  </div>

                  <Link
                    className="mt-1 text-theme underline underline-offset-2 font-semibold"
                    to={`/request/${CHAIN[
                      homeChain
                    ].NAME.toLowerCase()}/${humanityId}/${
                      winnerClaimRequest!.index
                    }`}
                  >
                    See winner claim ➜
                  </Link>
                </div>
              )}
            </div>

            <Revoke humanity={humanityId} homeChain={homeChain} />
          </>
        ) : (
          <>
            <span className="mb-8">Not claimed</span>
            <Link to={`/claim/${humanityId}`} className="btn-main w-48">
              Claim humanity
            </Link>
          </>
        )}
      </div>

      <div className="paper p-4 mt-4 mb-2 flex justify-between">
        {pendingRequests.length} pending request
        {pendingRequests.length !== 1 && "s"}
      </div>
      {pendingRequests.map((req, index) => (
        <PendingRequest key={index} humanity={humanityId} request={req} />
      ))}
    </div>
  );
};

export default Humanity;
