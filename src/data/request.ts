import { cache } from "react";
import { SupportedChainId, supportedChains } from "config/chains";
import { REQUESTS_DISPLAY_BATCH } from "config/misc";
import { sdk } from "config/subgraph";
import { RequestsQuery } from "generated/graphql";
import { Address, Hash, concat, keccak256, toHex } from "viem";
import axios from "axios";

export const getRequestsInitData = async () => {
  const res = await Promise.all(
    supportedChains.map((chain) =>
      sdk[chain.id].Requests({ first: REQUESTS_DISPLAY_BATCH * 4 })
    )
  );

  return supportedChains.reduce(
    (acc, chain, i) => ({ ...acc, [chain.id]: res[i].requests }),
    {} as Record<SupportedChainId, RequestsQuery["requests"]>
  );
};

const genRequestId = (pohId: Hash, index: number) => {
  return keccak256(
    concat([
      pohId,
      index >= 0
        ? toHex(index, { size: 32 })
        : concat([
            toHex(Math.abs(index + 1), { size: 32 }),
            toHex("legacy", { size: 6 }),
          ]),
    ])
  );
};

export const getRequestData = cache(
  async (chainId: SupportedChainId, pohId: Hash, index: number) =>
    (await sdk[chainId]["Request"]({ id: genRequestId(pohId, index) })).request
);

export const getRequestsToAdvance = cache(
  async (chainId: SupportedChainId) =>
    (await sdk[chainId]["RequestsToAdvance"]()).status!.requests
);

export const getOffChainVouches = async (
  chainId: SupportedChainId,
  claimer: Address,
  pohId: Hash
) =>
  (await axios.get(`/vouch/${chainId}/for-request/${claimer}/${pohId}`))
    .data as { voucher: Address; expiration: number; signature: Hash }[];
