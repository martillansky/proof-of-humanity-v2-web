import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { requestsAtom } from "api/requests";
import Dropdown from "components/Dropdown";
import DropdownItem from "components/DropdownItem";
import PageLoader from "components/PageLoader";
import { CHAIN, ChainId, SUPPORTED_CHAIN_IDS } from "constants/chains";
import { REQUESTS_DISPLAY_BATCH } from "constants/misc";
import { RequestStatus, statusFilters } from "constants/requests";
import useDebounce from "hooks/useDebounce";
import { useLoading } from "hooks/useLoading";
import CardList from "modules/card/List";
import { camelToTitle } from "utils/case";

const Home: React.FC = () => {
  const [requests, loadRequests] = useAtom(requestsAtom);
  const [searchQuery, setSearchQuery] = useState("");
  const searchDebounced = useDebounce(searchQuery.trim());
  const [prevListLength, setPrevListLength] = useState(0);
  const [statusFilter, setStatusFilter] = useState<RequestStatus>("all");
  const [chainFilter, setChainFilter] = useState<ChainId | "all">("all");
  const loading = useLoading();

  const updateSubmissions = async (loadContinued: boolean = false) => {
    loading.start();
    if (loadContinued) setPrevListLength(requests.length);
    await loadRequests({
      searchQuery: searchDebounced,
      status: statusFilter,
      chain: chainFilter,
      loadContinued,
    });
    loading.stop();
  };

  useEffect(() => {
    updateSubmissions();
  }, [searchDebounced, statusFilter, chainFilter]);

  const loadExhausted =
    !requests.length || // No requests loaded
    requests.length % REQUESTS_DISPLAY_BATCH || // Submissions loaded did not fill a batch
    prevListLength === requests.length; // Submissions loaded filled a batch but no more were loaded previously
  // TODO - not perfect, maybe add this to a separate atom?

  if (!requests.length) return <PageLoader />;

  return (
    <div className="content-wide flex flex-col justify-center">
      <div className="my-4 py-2 flex">
        <input
          className="w-full p-2 mr-2 border rounded"
          placeholder="Search (case sensitive)"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Dropdown title={camelToTitle(statusFilter)}>
          {statusFilters.map((status) => (
            <DropdownItem
              key={status}
              selected={statusFilter === status}
              onSelect={() => setStatusFilter(status)}
              name={camelToTitle(status)}
            />
          ))}
        </Dropdown>
        <Dropdown
          title={camelToTitle(
            chainFilter === "all" ? "all" : CHAIN[chainFilter].NAME
          )}
        >
          <DropdownItem
            selected={chainFilter === "all"}
            onSelect={() => setChainFilter("all")}
            name={"all"}
          />
          {SUPPORTED_CHAIN_IDS.map((chainID) => (
            <DropdownItem
              key={chainID}
              selected={chainFilter === chainID}
              onSelect={() => setChainFilter(chainID)}
              name={CHAIN[chainID].NAME}
            />
          ))}
        </Dropdown>
      </div>

      <CardList requests={requests} />

      {!loading.active && !loadExhausted && (
        <button
          className="mx-auto my-8 px-8 py-4 bg-amber-400 rounded-full text-white font-bold shadow-md shadow-orange-500/10"
          onClick={() => updateSubmissions(true)}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Home;
