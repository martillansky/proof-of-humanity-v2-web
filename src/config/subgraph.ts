import { getSdk } from "generated/graphql";
import { GraphQLClient } from "graphql-request";
import { gnosis, sepolia, /* gnosisChiado */ } from "viem/chains";
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
      "https://api.studio.thegraph.com/query/64099/proof-of-humanity-sepolia/version/latest"
    )
  ),
  [gnosis.id]: getSdk(
    new GraphQLClient(
      "https://api.studio.thegraph.com/query/64099/proof-of-humanity-gnosis/version/latest"
    )
  ),
  /* [gnosisChiado.id]: getSdk(
    new GraphQLClient(
      "https://api.studio.thegraph.com/query/64099/proof-of-humanity-gnosis/version/latest"
      //"https://api.studio.thegraph.com/query/64099/proof-of-humanity-chiado/version/latest"
    )
  ), */
};
