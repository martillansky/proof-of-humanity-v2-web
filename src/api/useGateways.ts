import useSWR from "swr";
import { GatewaysQuery } from "generated/graphql";
import { queryFetchAllChains } from ".";

export const useGateways = () =>
  useSWR(["Gateways"], async () => {
    const res = await queryFetchAllChains("Gateways");
    return Object.keys(res).reduce(
      (acc, chain) => ({ ...acc, [chain]: res[chain].crossChainGateways }),
      {} as Record<number, GatewaysQuery["crossChainGateways"]>
    );
  }).data;
