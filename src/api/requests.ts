import { atom } from "jotai";
import { ChainId, SUPPORTED_CHAIN_IDS } from "constants/chains";
import { REQUESTS_DISPLAY_BATCH } from "constants/misc";
import { REQUEST_STATUS, RequestStatus } from "constants/requests";
import { queryFetch, queryReturnType, sdkReturnType } from ".";
import { RequestsQueryItem } from "./types";

export interface RequestInterface extends RequestsQueryItem {
  old: boolean;
  chainID: ChainId;
}

const normalizeRequests = (requestData: Record<ChainId, RequestsQueryItem[]>) =>
  Object.keys(requestData)
    .reduce<RequestInterface[]>(
      (acc, chainID) => [
        ...acc,
        ...requestData[Number(chainID) as ChainId].map((request) => ({
          ...request,
          old: Number(chainID) === ChainId.MAINNET,
          chainID: Number(chainID),
        })),
      ],
      []
    )
    .sort((req1, req2) => req2.creationTime - req1.creationTime);

const initialChainStacks = SUPPORTED_CHAIN_IDS.reduce<
  Record<number, RequestsQueryItem[]>
>((acc, chainID) => ({ ...acc, [chainID]: [] }), {});

const cursorAtom = atom(0);
const chainStacksAtom = atom(initialChainStacks);
const normalizedRequestsAtom = atom((get) =>
  normalizeRequests(get(chainStacksAtom))
);

interface RequestsFilters {
  searchQuery: string;
  loadContinued: boolean;
  status?: RequestStatus;
  chain: ChainId | "all";
}

export const requestsAtom = atom(
  (get) =>
    get(normalizedRequestsAtom).slice(
      0,
      REQUESTS_DISPLAY_BATCH * get(cursorAtom)
    ),
  async (
    get,
    set,
    {
      searchQuery,
      loadContinued,
      status = "all",
      chain: fromChain = "all",
    }: RequestsFilters
  ) => {
    let chainStacks = get(chainStacksAtom);
    let cursor = loadContinued ? get(cursorAtom) + 1 : 1;

    const fetchChainIds: number[] = [];
    const fetchPromises: Promise<ReturnType<sdkReturnType["Requests"]>>[] = [];

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

      const displayedForChain = get(requestsAtom).filter(
        (request) => request.chainID === chainID
      ).length;

      if (
        !loadContinued ||
        displayedForChain + REQUESTS_DISPLAY_BATCH >=
          chainStacks[chainID].length
      ) {
        const statusFilter = REQUEST_STATUS[status].filter;
        const where = {
          ...statusFilter,
          ...(searchQuery ? { claimer_: { name_contains: searchQuery } } : {}),
        };

        fetchChainIds.push(chainID);
        fetchPromises.push(
          queryFetch(chainID, "Requests", {
            first: REQUESTS_DISPLAY_BATCH * 4,
            skip: loadContinued
              ? get(normalizedRequestsAtom).filter(
                  (request) => request.chainID === chainID
                ).length
              : 0,
            where,
          })
        );
      }
    }

    if (fetchChainIds.length) {
      const res = await Promise.all(fetchPromises);

      const fetchedRequests = fetchChainIds.reduce<queryReturnType<"Requests">>(
        (acc, chainID, i) => ({ ...acc, [chainID]: res[i] }),
        {}
      );

      chainStacks = fetchChainIds.reduce(
        (acc, chainID) => ({
          ...acc,
          [chainID]: [
            ...(loadContinued ? chainStacks[chainID] : []),
            ...fetchedRequests[chainID].requests,
          ],
        }),
        chainStacks
      );
    }

    set(cursorAtom, cursor);
    set(chainStacksAtom, chainStacks);
  }
);
