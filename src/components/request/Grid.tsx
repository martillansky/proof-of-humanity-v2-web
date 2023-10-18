"use client";

import {
  useMountOnce,
  useObservable,
  useSelector,
} from "@legendapp/state/react";
import {
  SupportedChain,
  SupportedChainId,
  idToChain,
  legacyChain,
  supportedChains,
} from "config/chains";
import {
  REQUESTS_DISPLAY_BATCH as REQUESTS_BATCH_SIZE,
  statusToColor,
} from "config/misc";
import { requestStatus, RequestStatus, statusFilters } from "config/requests";
import { useEffect, useState } from "react";
import { camelToTitle } from "utils/case";
import Card from "./Card";
import { sdk, sdkReturnType } from "config/subgraph";
import DropdownItem from "components/dropdown/Item";
import Dropdown from "components/dropdown/Menu";
import { useLoading } from "hooks/useLoading";
import { observable } from "@legendapp/state";
import { enableReactUse } from "@legendapp/state/config/enableReactUse";
import { RequestsQuery } from "generated/graphql";
import cn from "classnames";
import ChainLogo from "components/ChainLogo";

enableReactUse();

export type RequestsQueryItem = ArrayElement<RequestsQuery["requests"]>;

interface RequestInterface extends RequestsQueryItem {
  chainId: SupportedChainId;
}

const normalize = (
  requestsData: Record<SupportedChainId, RequestsQueryItem[]>
) =>
  Object.keys(requestsData)
    .reduce<RequestInterface[]>(
      (acc, chainId) => [
        ...acc,
        ...requestsData[Number(chainId) as SupportedChainId].map((request) => ({
          ...request,
          old: Number(chainId) === legacyChain.id,
          chainId: Number(chainId) as SupportedChainId,
        })),
      ],
      []
    )
    .sort((req1, req2) => req2.creationTime - req1.creationTime);

const filterChainStacksForChain = (
  chainStacks: Record<SupportedChainId, RequestsQueryItem[]>,
  chainFilter: SupportedChainId | 0
) =>
  supportedChains.reduce(
    (acc, chain) => ({
      ...acc,
      [chain.id]: !chainFilter || chain.id === chainFilter ? acc[chain.id] : [],
    }),
    chainStacks
  );

interface RequestFilter {
  search: string;
  status: RequestStatus;
  chainId: SupportedChainId | 0;
  cursor: number;
}

interface RequestsGridProps {
  initialChainStacks?: Record<SupportedChainId, RequestsQueryItem[]>;
}

const filter$ = observable<RequestFilter>({
  search: "",
  status: "all",
  chainId: 0,
  cursor: 1,
});

function RequestsGrid({ initialChainStacks }: RequestsGridProps) {
  const filter = filter$.use();
  const chainStacks$ = useObservable(initialChainStacks);
  const requests = useSelector(() =>
    normalize(chainStacks$.get()).slice(0, REQUESTS_BATCH_SIZE * filter.cursor)
  );

  const loading = useLoading();
  const [pending] = loading.use();

  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const timer = setTimeout(
      () => filter$.assign({ search: searchQuery, cursor: 1 }),
      500
    );
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useMountOnce(() =>
    filter$.onChange(
      async ({
        value: { chainId: chainFilter, search, status, cursor },
        getPrevious,
      }) => {
        loading.start();
        const loadContinued = cursor > getPrevious().cursor;
        const fetchChains: SupportedChain[] = [];
        const fetchPromises: ReturnType<sdkReturnType["Requests"]>[] = [];

        const chainStacks = filterChainStacksForChain(
          chainStacks$.get(),
          chainFilter
        );

        for (const chain of supportedChains) {
          if (chainFilter && chainFilter !== chain.id) continue;

          const displayedForChain = requests.filter(
            (request) => request.chainId === chain.id
          ).length;

          if (
            !loadContinued ||
            displayedForChain + REQUESTS_BATCH_SIZE >=
              chainStacks[chain.id].length
          ) {
            const where = {
              ...requestStatus[status].filter,
              ...(search ? { claimer_: { name_contains: search } } : {}),
            };

            fetchChains.push(chain);
            fetchPromises.push(
              sdk[chain.id].Requests({
                where,
                first: REQUESTS_BATCH_SIZE * 4,
                skip: loadContinued
                  ? normalize(chainStacks$.get()).filter(
                      (request) => request.chainId === chain.id
                    ).length
                  : 0,
              })
            );
          }
        }

        if (!fetchChains.length) {
          chainStacks$.set(chainStacks);
        } else {
          const res = await Promise.all(fetchPromises);
          chainStacks$.set(
            fetchChains.reduce(
              (acc, chain, i) => ({
                ...acc,
                [chain.id]: [
                  ...(loadContinued ? acc[chain.id] : []),
                  ...res[i].requests,
                ],
              }),
              chainStacks
            )
          );
        }

        loading.stop();
      }
    )
  );

  return (
    <>
      <div className="my-4 py-2 flex">
        <input
          className="w-full p-2 mr-2 border rounded"
          placeholder="Search (case sensitive)"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* <Select
          isSearchable={false}
          defaultInputValue="all"
          options={statusFilters.map((status) => ({
            value: status,
            label: camelToTitle(status),
          }))}
          onChange={({ value }) => filter$.assign({ status: value, cursor: 1 })}
        /> */}
        <Dropdown title={camelToTitle(filter.status)}>
          {statusFilters.map((status) => (
            <DropdownItem
              key={status}
              icon={
                <div
                  className={cn(
                    "dot mr-2",
                    statusToColor[status as keyof typeof statusToColor]
                      ? `bg-status-${
                          statusToColor[status as keyof typeof statusToColor]
                        }`
                      : "bg-white"
                  )}
                />
              }
              selected={filter.status === status}
              onSelect={() => filter$.assign({ status, cursor: 1 })}
              name={camelToTitle(status)}
            />
          ))}
        </Dropdown>
        <Dropdown
          title={camelToTitle(
            filter.chainId
              ? idToChain(filter.chainId as SupportedChainId).name
              : "All"
          )}
        >
          <DropdownItem
            selected={!filter.chainId}
            onSelect={() => filter$.assign({ chainId: 0, cursor: 1 })}
            name="All"
          />
          {supportedChains.map((chain) => (
            <DropdownItem
              icon={
                <ChainLogo
                  chainId={chain.id}
                  className="w-4 h-4 mr-1 fill-black"
                />
              }
              key={chain.id}
              selected={filter.chainId === chain.id}
              onSelect={() => filter$.assign({ chainId: chain.id, cursor: 1 })}
              name={chain.name}
            />
          ))}
        </Dropdown>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {requests.map((request, i) => (
          <Card
            key={i}
            chainId={request.chainId}
            index={request.index}
            humanity={request.humanity}
            requester={request.requester}
            claimer={request.claimer}
            status={request.status.id}
            revocation={request.revocation}
            evidence={request.evidenceGroup.evidence}
          />
        ))}
      </div>

      {!pending && (
        <button
          className="btn-main mx-auto my-8 px-8 py-4"
          onClick={() => filter$.cursor.set((c) => c + 1)}
        >
          Load More
        </button>
      )}
    </>
  );
}

export default RequestsGrid;
