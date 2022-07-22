import { getSdk } from "generated/graphql";
import { GraphQLClient } from "graphql-request";
import { SUBGRAPH_ENDPOINTS } from "constants/subgraph";
import { SUPPORTED_CHAIN_IDS } from "constants/chains";

export type sdkReturnType = ReturnType<typeof getSdk>;
export type queryType = keyof sdkReturnType;
export type queryReturnType<Q extends queryType> = Record<
  number,
  Awaited<ReturnType<sdkReturnType[Q]>>
>;

const sdk = SUPPORTED_CHAIN_IDS.reduce(
  (acc, chainID) => ({
    ...acc,
    [chainID]: getSdk(new GraphQLClient(SUBGRAPH_ENDPOINTS[chainID])),
  }),
  {} as Record<number, sdkReturnType>
);

export const queryFetch = async <Q extends queryType>(
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

export const queryFetchIndividual = async <Q extends queryType>(
  fetchChainId: number,
  query: Q,
  ...params: Parameters<sdkReturnType[Q]>
): Promise<ReturnType<sdkReturnType[Q]>> =>
  await sdk[fetchChainId][query](...((params as any) || []));
