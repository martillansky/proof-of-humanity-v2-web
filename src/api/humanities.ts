import { atom } from "jotai";
import { ChainId, SUPPORTED_CHAIN_IDS } from "constants/chains";
import { HUMANITIES_DISPLAY_BATCH } from "constants/misc";
import { HumanitiesQuery } from "generated/graphql";
import { queryFetch, queryReturnType, sdkReturnType } from ".";

type humanityResultType = ArrayElement<HumanitiesQuery["humanities"]>;

export interface HumanityInterface extends humanityResultType {
  chainID: ChainId;
}

const normalizeHumanities = (
  humanityData: Record<ChainId, humanityResultType[]>
) =>
  Object.keys(humanityData).reduce<HumanityInterface[]>(
    (acc, chainID) => [
      ...acc,
      ...humanityData[Number(chainID) as ChainId].map((humanity) => ({
        ...humanity,
        chainID: Number(chainID),
      })),
    ],
    []
  );

const initialChainStacks = SUPPORTED_CHAIN_IDS.reduce(
  (acc, chainID) => ({ ...acc, [chainID]: [] }),
  {}
);

const cursorAtom = atom(0);
const chainStacksAtom =
  atom<Record<number, humanityResultType[]>>(initialChainStacks);
const normalizedHumanitiesAtom = atom<HumanityInterface[]>((get) =>
  normalizeHumanities(get(chainStacksAtom))
);

interface HumanitiesFilters {
  searchQuery: string;
  loadContinued: boolean;
  chain: ChainId | "all";
}

export const humanitiesAtom = atom(
  (get) =>
    get(normalizedHumanitiesAtom).slice(
      0,
      HUMANITIES_DISPLAY_BATCH * get(cursorAtom)
    ),
  async (
    get,
    set,
    { searchQuery, loadContinued, chain: fromChain = "all" }: HumanitiesFilters
  ) => {
    let chainStacks = get(chainStacksAtom);
    let cursor = loadContinued ? get(cursorAtom) + 1 : 1;

    const fetchChainIds: number[] = [];
    const fetchPromises: Promise<ReturnType<sdkReturnType["Humanities"]>>[] =
      [];

    chainStacks = SUPPORTED_CHAIN_IDS.reduce(
      (acc, chainID) => ({
        ...acc,
        [chainID]:
          fromChain === "all" || chainID === fromChain
            ? chainStacks[chainID]
            : [],
      }),
      chainStacks
    );

    for (const chainID of SUPPORTED_CHAIN_IDS) {
      if (fromChain !== "all" && fromChain !== chainID) continue;

      const displayedForChain = get(humanitiesAtom).filter(
        (humanity) => humanity.chainID === chainID
      ).length;

      if (
        !loadContinued ||
        displayedForChain + HUMANITIES_DISPLAY_BATCH >=
          chainStacks[chainID].length
      ) {
        const where = {
          ...(searchQuery ? { id: searchQuery } : undefined),
        };

        fetchChainIds.push(chainID);
        fetchPromises.push(
          queryFetch(chainID, "Humanities", {
            first: HUMANITIES_DISPLAY_BATCH * 4,
            skip: loadContinued
              ? get(normalizedHumanitiesAtom).filter(
                  (humanity) => humanity.chainID === chainID
                ).length
              : 0,
            where,
          })
        );
      }
    }

    if (fetchChainIds.length) {
      const res = await Promise.all(fetchPromises);

      const fetchedHumanities = fetchChainIds.reduce<
        queryReturnType<"Humanities">
      >((acc, chainID, i) => ({ ...acc, [chainID]: res[i] }), {});

      chainStacks = fetchChainIds.reduce(
        (acc, chainID) => ({
          ...acc,
          [chainID]: [
            ...(loadContinued ? chainStacks[chainID] : []),
            ...fetchedHumanities[chainID].humanities,
          ],
        }),
        chainStacks
      );
    }

    set(cursorAtom, cursor);
    set(chainStacksAtom, chainStacks);
  }
);
