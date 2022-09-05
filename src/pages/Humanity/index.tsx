import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHumanity } from "api/useHumanity";
import { CHAIN, ChainId, SUPPORTED_CHAIN_IDS } from "constants/chains";
import { STATUS_TO_COLOR } from "constants/misc";
import { HumanityQuery } from "generated/graphql";
import { shortenAddress } from "utils/address";
import { machinifyId, shortenId } from "utils/identifier";

type PendingRequest = ArrayElement<
  NonNullable<HumanityQuery["humanity"]>["pendingRequests"]
> & {
  chainId: ChainId;
};

const Humanity: React.FC = () => {
  const { humanity: humanityId } = useParams();
  const humanityAllChains = useHumanity(humanityId && machinifyId(humanityId));

  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);

  useEffect(() => {
    if (!humanityAllChains) return;

    setPendingRequests(
      SUPPORTED_CHAIN_IDS.reduce<PendingRequest[]>(
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

  return (
    <div className="p-8">
      {shortenId(humanityId!)}
      {pendingRequests.map((req, index) => {
        const ChainLogo = CHAIN[req.chainId].Logo;
        return (
          <div key={index} className="p-2 flex flex-col border">
            <span>
              Requester: <strong>{shortenAddress(req.requester)}</strong>
            </span>
            <span
              className={`text-${STATUS_TO_COLOR[req.status]} font-semibold`}
            >
              {req.status}
            </span>
            <span className="centered font-semibold">
              {CHAIN[req.chainId].NAME}
              <ChainLogo className="w-8 h-8 ml-2" />
            </span>
          </div>
        );
      })}
    </div>
  );

  // <HumanityWidget humanity={humanity} />

  // <div className="relative bordered mx-auto my-32 w-1/5">
  //   <div className="px-8 pb-8 flex flex-col justify-center items-center border rounded bg-white shadow over">
  //     <div className="bordered absolute -top-16 w-32 h-32 rounded-full">
  //       <div className="w-full h-full px-6 pt-5 rounded-full bg-white shadow">
  //         <ProofOfHumanityLogo />
  //       </div>
  //     </div>
  //     <div className="w-full flex flex-col items-center">
  //       <div className="mt-20">
  //         Humanity ID: <strong>3223843278462</strong>
  //       </div>
  //       <div className="mb-8">Claimed</div>
  //       <button
  //         className="self-end
  //                  text-white font-bold
  //                  px-4 py-2 rounded-full
  //                  bg-gradient-to-r from-[#FF7A4E] via-[#FF7A4E] to-[#FF809F]"
  //       >
  //         Claim humanity
  //       </button>
  //     </div>
  //   </div>
  // </div>
};

export default Humanity;
