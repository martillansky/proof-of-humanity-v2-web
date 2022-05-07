import { GraphQLClient } from "graphql-request";
import { subgraphEndpoints } from "constants/index";
import { getSdk } from "generated-gql/graphql";

const sdk = Object.keys(subgraphEndpoints).reduce(
  (acc, chainID) => ({
    ...acc,
    [chainID]: getSdk(new GraphQLClient(subgraphEndpoints[chainID])),
  }),
  {} as Record<string, ReturnType<typeof getSdk>>
);

export default sdk;
