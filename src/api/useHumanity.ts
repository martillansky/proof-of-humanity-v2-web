import useSWR from "swr";
import { SUPPORTED_CHAIN_IDS } from "constants/chains";
import { HumanityQuery } from "generated/graphql";
import { queryFetchSingle } from ".";

export const useHumanity = (id?: string) => {
  const { data } = useSWR(
    ["Humanity", id],
    async (_, humanity: string) => {
      const humanityAllChains = await Promise.all(
        SUPPORTED_CHAIN_IDS.map((chain) =>
          queryFetchSingle(chain, "Humanity", humanity)
        )
      );

      return SUPPORTED_CHAIN_IDS.reduce(
        (acc, chain, idx) => ({
          ...acc,
          [chain]: humanityAllChains[idx].humanity,
        }),
        {} as Record<number, HumanityQuery["humanity"]>
      );
    },
    { errorRetryCount: 0 }
  );

  return data;
};
