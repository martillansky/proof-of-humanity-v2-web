import { ChainId } from "enums/ChainId";
import { atom } from "jotai";
import { supportedChainIds } from "constants/chains";
import { REQUESTS_DISPLAY_BATCH } from "constants/misc";
import { REQUEST_STATUS, RequestStatus } from "constants/requests";
import { queryFetch, queryReturnType, sdkReturnType } from ".";
import { RequestsQueryItem } from "./types";

export interface RequestInterface extends RequestsQueryItem {
  legacy: boolean;
  chainId: ChainId;
}

const normalizeRequests = (requestData: Record<ChainId, RequestsQueryItem[]>) =>
  Object.keys(requestData)
    .reduce<RequestInterface[]>(
      (acc, chainId) => [
        ...acc,
        ...requestData[Number(chainId) as ChainId].map((request) => ({
          ...request,
          old: Number(chainId) === ChainId.MAINNET,
          chainId: Number(chainId),
        })),
      ],
      []
    )
    .sort((req1, req2) => req2.creationTime - req1.creationTime);

const initialChainStacks = supportedChainIds.reduce<
  Record<number, RequestsQueryItem[]>
>((acc, chainId) => ({ ...acc, [chainId]: [] }), {});

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

    chainStacks = supportedChainIds.reduce(
      (acc, chainId) => ({
        ...acc,
        [chainId]:
          fromChain === "all" || chainId === fromChain
            ? chainStacks[chainId]
            : [],
      }),
      chainStacks
    );

    for (const chainId of supportedChainIds) {
      if (fromChain !== "all" && fromChain !== chainId) continue;

      const displayedForChain = get(requestsAtom).filter(
        (request) => request.chainId === chainId
      ).length;

      if (
        !loadContinued ||
        displayedForChain + REQUESTS_DISPLAY_BATCH >=
          chainStacks[chainId].length
      ) {
        const statusFilter = REQUEST_STATUS[status].filter;
        const where = {
          ...statusFilter,
          ...(searchQuery ? { claimer_: { name_contains: searchQuery } } : {}),
        };

        fetchChainIds.push(chainId);
        fetchPromises.push(
          queryFetch(chainId, "Requests", {
            first: REQUESTS_DISPLAY_BATCH * 4,
            skip: loadContinued
              ? get(normalizedRequestsAtom).filter(
                  (request) => request.chainId === chainId
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
        (acc, chainId, i) => ({ ...acc, [chainId]: res[i] }),
        {}
      );

      chainStacks = fetchChainIds.reduce(
        (acc, chainId) => ({
          ...acc,
          [chainId]: [
            ...(loadContinued ? chainStacks[chainId] : []),
            ...fetchedRequests[chainId].requests,
          ],
        }),
        chainStacks
      );
    }

    set(cursorAtom, cursor);
    set(chainStacksAtom, chainStacks);
  }
);
