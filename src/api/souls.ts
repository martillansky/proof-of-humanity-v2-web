import { atom } from "jotai";
import { ChainId, SUPPORTED_CHAIN_IDS } from "constants/chains";
import { SOULS_DISPLAY_BATCH } from "constants/misc";
import { SoulsQuery } from "generated/graphql";
import { queryFetch, queryReturnType, sdkReturnType } from ".";

type soulResultType = ArrayElement<SoulsQuery["souls"]>;

export interface SoulInterface extends soulResultType {
  chainID: ChainId;
}

const normalizeSouls = (soulData: Record<ChainId, soulResultType[]>) =>
  Object.keys(soulData).reduce<SoulInterface[]>(
    (acc, chainID) => [
      ...acc,
      ...soulData[Number(chainID) as ChainId].map((soul) => ({
        ...soul,
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
  atom<Record<number, soulResultType[]>>(initialChainStacks);
const normalizedSoulsAtom = atom<SoulInterface[]>((get) =>
  normalizeSouls(get(chainStacksAtom))
);

interface SoulsFilters {
  searchQuery: string;
  loadContinued: boolean;
  chain: ChainId | "all";
}

export const soulsAtom = atom(
  (get) =>
    get(normalizedSoulsAtom).slice(0, SOULS_DISPLAY_BATCH * get(cursorAtom)),
  async (
    get,
    set,
    { searchQuery, loadContinued, chain: fromChain = "all" }: SoulsFilters
  ) => {
    let chainStacks = get(chainStacksAtom);
    let cursor = loadContinued ? get(cursorAtom) + 1 : 1;

    const fetchChainIds: number[] = [];
    const fetchPromises: Promise<ReturnType<sdkReturnType["Souls"]>>[] = [];

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

      const displayedForChain = get(soulsAtom).filter(
        (soul) => soul.chainID === chainID
      ).length;

      if (
        !loadContinued ||
        displayedForChain + SOULS_DISPLAY_BATCH >= chainStacks[chainID].length
      ) {
        const where = {
          ...(searchQuery ? { id: searchQuery } : undefined),
        };

        fetchChainIds.push(chainID);
        fetchPromises.push(
          queryFetch(chainID, "Souls", {
            first: SOULS_DISPLAY_BATCH * 4,
            skip: loadContinued
              ? get(normalizedSoulsAtom).filter(
                  (soul) => soul.chainID === chainID
                ).length
              : 0,
            where,
          })
        );
      }
    }

    if (fetchChainIds.length) {
      const res = await Promise.all(fetchPromises);

      const fetchedSouls = fetchChainIds.reduce<queryReturnType<"Souls">>(
        (acc, chainID, i) => ({ ...acc, [chainID]: res[i] }),
        {}
      );

      chainStacks = fetchChainIds.reduce(
        (acc, chainID) => ({
          ...acc,
          [chainID]: [
            ...(loadContinued ? chainStacks[chainID] : []),
            ...fetchedSouls[chainID].souls,
          ],
        }),
        chainStacks
      );
    }

    set(cursorAtom, cursor);
    set(chainStacksAtom, chainStacks);
  }
);
