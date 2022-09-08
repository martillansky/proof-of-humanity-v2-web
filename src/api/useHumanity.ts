import useSWR from "swr";
import { HumanityQuery } from "generated/graphql";
import { queryFetchSingleAllChains } from ".";

export const useHumanity = (id?: string) =>
  useSWR(id && ["Humanity", id], async (_, humanity: string) => {
    const res = await queryFetchSingleAllChains("Humanity", humanity);
    return Object.keys(res).reduce(
      (acc, chain) => ({ ...acc, [chain]: res[chain].humanity }),
      {} as Record<number, HumanityQuery["humanity"]>
    );
  }).data;
