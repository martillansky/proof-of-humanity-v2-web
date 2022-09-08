import useSWR from "swr";
import { MeQuery } from "generated/graphql";
import { queryFetchSingleAllChains } from ".";

export const useMeQuery = (id?: string) =>
  useSWR(id && ["MeQuery", id], async (_, id: string) => {
    const res = await queryFetchSingleAllChains("Me", id);
    return Object.keys(res).reduce(
      (acc, chain) => ({ ...acc, [chain]: res[chain].claimer }),
      {} as Record<number, MeQuery["claimer"]>
    );
  }).data;
