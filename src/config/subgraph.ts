import { getSdk } from "generated/graphql";
import { GraphQLClient } from "graphql-request";
import { gnosis, sepolia, gnosisChiado, mainnet } from "viem/chains";
import { SupportedChainId } from "./chains";
import { configSet } from "contracts";

export type sdkReturnType = ReturnType<typeof getSdk>;
export type queryType = keyof sdkReturnType;
export type queryReturnType<Q extends queryType> = Record<
  SupportedChainId,
  Awaited<ReturnType<sdkReturnType[Q]>>
>;

export const sdk = {
  /* [mainnet.id]: getSdk(
    new GraphQLClient(
      "https://api.studio.thegraph.com/query/64099/proof-of-humanity-sepolia/version/latest"
      //"https://api.studio.thegraph.com/query/64099/proof-of-humanity-mainnet/version/latest"
    )
  ), */
  [gnosis.id]: getSdk(
    new GraphQLClient(
      "https://api.studio.thegraph.com/query/64099/proof-of-humanity-gnosis/version/latest"
    )
  ),
  [sepolia.id]: getSdk(
    new GraphQLClient(
      (configSet === "testOld") ? 
      "https://api.studio.thegraph.com/query/64099/proof-of-humanity-sepolia/v0.1.5" // OLD
      : (configSet === "testNew") ? 
      "https://api.studio.thegraph.com/query/64099/proof-of-humanity-sepolia/version/latest"
      : ""
    )
  ),
  [gnosisChiado.id]: getSdk(
    new GraphQLClient(
      (configSet === "testOld") ? 
      "https://api.goldsky.com/api/public/project_cluh21be5gq0o01u27olk4rwl/subgraphs/proof-of-humanity-chiado/1.0.0/gn" // OLD
      : (configSet === "testNew") ? 
      "https://api.goldsky.com/api/public/project_cluh21be5gq0o01u27olk4rwl/subgraphs/proof-of-humanity-chiado/1.0.1/gn"
      : ""
    )
  ),
};
