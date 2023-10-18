import { getSdk } from "generated/graphql";
import { GraphQLClient } from "graphql-request";
import { gnosis, sepolia } from "viem/chains";
import { SupportedChainId } from "./chains";

export type sdkReturnType = ReturnType<typeof getSdk>;
export type queryType = keyof sdkReturnType;
export type queryReturnType<Q extends queryType> = Record<
  SupportedChainId,
  Awaited<ReturnType<sdkReturnType[Q]>>
>;

export const sdk = {
  [sepolia.id]: getSdk(
    new GraphQLClient(
      "https://api.studio.thegraph.com/query/42323/proof-of-humanity-sepolia/version/latest"
    )
  ),
  [gnosis.id]: getSdk(
    new GraphQLClient(
      "https://api.studio.thegraph.com/query/42323/proof-of-humanity-gnosis/version/latest"
    )
  ),
};
