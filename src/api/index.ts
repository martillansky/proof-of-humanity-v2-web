import { GraphQLClient } from "graphql-request";
import { SUPPORTED_CHAIN_IDS } from "constants/chains";
import { SUBGRAPH_ENDPOINTS } from "constants/subgraph";
import { getSdk } from "generated/graphql";

export type sdkReturnType = ReturnType<typeof getSdk>;
export type queryType = keyof sdkReturnType;
export type queryReturnType<Q extends queryType> = Record<
  number,
  Awaited<ReturnType<sdkReturnType[Q]>>
>;

export const sdk = SUPPORTED_CHAIN_IDS.reduce(
  (acc, chainID) => ({
    ...acc,
    [chainID]: getSdk(new GraphQLClient(SUBGRAPH_ENDPOINTS[chainID])),
  }),
  {} as Record<number, sdkReturnType>
);

type MULTIPLE_ENTITIES_QUERY = "Requests" | "Souls";
type SINGLE_ENTITY_QUERY = "Request";

export const queryFetchSingle = async <Q extends SINGLE_ENTITY_QUERY>(
  fetchChainId: number,
  query: Q,
  id: string
): Promise<ReturnType<sdkReturnType[Q]>> =>
  await sdk[fetchChainId][query]({ id });

export const queryFetch = async <Q extends MULTIPLE_ENTITIES_QUERY>(
  fetchChainId: number,
  query: Q,
  ...params: Parameters<sdkReturnType[Q]>
): Promise<ReturnType<sdkReturnType[Q]>> =>
  await sdk[fetchChainId][query](...((params as any) || []));

export const queryFetchAllChains = async <Q extends "Requests" | "Souls">(
  query: Q,
  ...params: Parameters<sdkReturnType[Q]>
): Promise<queryReturnType<Q>> => {
  const res = await Promise.all(
    SUPPORTED_CHAIN_IDS.map((chainID) =>
      sdk[chainID][query](...((params as any) || []))
    )
  );

  return SUPPORTED_CHAIN_IDS.reduce(
    (acc, chainID, i) => ({ ...acc, [chainID]: res[i] }),
    {}
  );
};
