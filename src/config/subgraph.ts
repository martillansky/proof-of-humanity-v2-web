import { getSdk } from "generated/graphql";
import { GraphQLClient } from "graphql-request";
import { gnosis, sepolia, gnosisChiado, mainnet } from "viem/chains";
import { SupportedChainId } from "./chains";
import { configSetSelection, configSets } from "contracts";

export type sdkReturnType = ReturnType<typeof getSdk>;
export type queryType = keyof sdkReturnType;
export type queryReturnType<Q extends queryType> = Record<
  SupportedChainId,
  Awaited<ReturnType<sdkReturnType[Q]>>
>;

export const sdk = {
  [mainnet.id]: getSdk(
    new GraphQLClient(
      (configSetSelection.id === configSets.main.id) ? 
      "https://api.studio.thegraph.com/query/64099/poh-origin-mainnet/version/latest"
      : (configSetSelection.id === configSets.mainOld.id) ? 
      "https://api.studio.thegraph.com/query/64099/proof-of-humanity-mainnet/version/latest"
      : (configSetSelection.id === configSets.mainPreAudit.id) ? 
      "https://api.studio.thegraph.com/query/64099/pohv2-prod-mainnet/version/latest"
      : ""
    )
  ),
  [gnosis.id]: getSdk(
    new GraphQLClient(
      (configSetSelection.id === configSets.main.id) ? 
      "https://api.studio.thegraph.com/query/64099/poh-origin-gnosis/version/latest"
      : (configSetSelection.id === configSets.mainOld.id) ? 
      "https://api.studio.thegraph.com/query/64099/proof-of-humanity-gnosis/version/latest"
      : (configSetSelection.id === configSets.mainPreAudit.id) ? 
      "https://api.studio.thegraph.com/query/64099/pohv2-prod-gnosis/version/latest"
      : ""
    )
  ),
  [sepolia.id]: getSdk(
    new GraphQLClient(
      (configSetSelection.id === configSets.testOld.id) ? 
      "https://api.studio.thegraph.com/query/64099/proof-of-humanity-sepolia-test/version/latest" // OLD
      //"https://api.studio.thegraph.com/query/64099/proof-of-humanity-sepolia/v0.1.5" // OLD
      : (configSetSelection.id === configSets.testNew.id) ? 
      "https://api.studio.thegraph.com/query/64099/proof-of-humanity-sepolia/version/latest"
      : ""
    )
  ),
  [gnosisChiado.id]: getSdk(
    new GraphQLClient(
      (configSetSelection.id === configSets.testOld.id) ? 
      "https://api.goldsky.com/api/public/project_cluh21be5gq0o01u27olk4rwl/subgraphs/proof-of-humanity-chiado/1.0.2/gn" // OLD
      //"https://api.goldsky.com/api/public/project_cluh21be5gq0o01u27olk4rwl/subgraphs/proof-of-humanity-chiado/1.0.0/gn" // OLD
      : (configSetSelection.id === configSets.testNew.id) ? 
      "https://api.goldsky.com/api/public/project_cluh21be5gq0o01u27olk4rwl/subgraphs/proof-of-humanity-chiado/1.0.1/gn"
      : ""
    )
  ),
};
