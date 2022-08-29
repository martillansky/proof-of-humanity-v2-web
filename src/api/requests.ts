import { atom } from "jotai";
import { isAddress } from "@ethersproject/address";
import { queryFetch, queryReturnType, sdkReturnType } from ".";
import { REQUESTS_DISPLAY_BATCH } from "constants/misc";
import { ChainId, SUPPORTED_CHAIN_IDS } from "constants/chains";
import { RequestStatus, REQUEST_STATUS } from "constants/requests";
import { RequestsQueryItem } from "./types";

export interface RequestInterface extends RequestsQueryItem {
  chainID: ChainId;
}

const normalizeRequests = (requestData: Record<ChainId, RequestsQueryItem[]>) =>
  Object.keys(requestData)
    .reduce<RequestInterface[]>(
      (acc, chainID) => [
        ...acc,
        ...requestData[Number(chainID) as ChainId].map((request) => ({
          ...request,
          chainID: Number(chainID),
        })),
      ],
      []
    )
    .sort((req1, req2) => req2.creationTime - req1.creationTime);

const initialChainStacks = SUPPORTED_CHAIN_IDS.reduce(
  (acc, chainID) => ({ ...acc, [chainID]: [] }),
  {}
);

const cursorAtom = atom(0);
const chainStacksAtom =
  atom<Record<number, RequestsQueryItem[]>>(initialChainStacks);
const normalizedRequestsAtom = atom<RequestInterface[]>((get) =>
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
          ...(searchQuery
            ? isAddress(searchQuery)
              ? { id: searchQuery }
              : { name_contains: searchQuery }
            : undefined),
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
