import { ChainId } from "enums/ChainId";
import { GraphQLClient } from "graphql-request";
import { supportedChainIds } from "constants/chains";
import { SUBGRAPH_ENDPOINTS } from "constants/subgraph";
import { getSdk } from "generated/graphql";

export type sdkReturnType = ReturnType<typeof getSdk>;
export type queryType = keyof sdkReturnType;
export type queryReturnType<Q extends queryType> = Record<
  number,
  Awaited<ReturnType<sdkReturnType[Q]>>
>;

export const sdk = supportedChainIds.reduce(
  (acc, chainID) => ({
    ...acc,
    [chainID]: getSdk(new GraphQLClient(SUBGRAPH_ENDPOINTS[chainID])),
  }),
  {} as Record<ChainId, sdkReturnType>
);

type MULTIPLE_ENTITIES_QUERY = "Requests" | "Humanities" | "Gateways";
type SINGLE_ENTITY_QUERY = "Request" | "Humanity" | "Me";

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

export const queryFetchSingleAllChains = async <Q extends SINGLE_ENTITY_QUERY>(
  query: Q,
  id: string
): Promise<queryReturnType<Q>> => {
  const res = await Promise.all(
    supportedChainIds.map((chainID) => sdk[chainID][query]({ id }))
  );

  return supportedChainIds.reduce(
    (acc, chainID, i) => ({ ...acc, [chainID]: res[i] }),
    {}
  );
};

export const queryFetchAllChains = async <Q extends MULTIPLE_ENTITIES_QUERY>(
  query: Q,
  ...params: Parameters<sdkReturnType[Q]>
): Promise<queryReturnType<Q>> => {
  const res = await Promise.all(
    supportedChainIds.map((chainID) =>
      sdk[chainID][query](...((params as any) || []))
    )
  );

  return supportedChainIds.reduce(
    (acc, chainID, i) => ({ ...acc, [chainID]: res[i] }),
    {}
  );
};
