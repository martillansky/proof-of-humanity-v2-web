import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { requestsAtom } from "api/requests";
import Dropdown from "components/Dropdown";
import DropdownItem from "components/DropdownItem";
import {
  CHAIN_ID_TO_NAME,
  ChainId,
  SUPPORTED_CHAIN_IDS,
} from "constants/chains";
import { REQUESTS_DISPLAY_BATCH } from "constants/misc";
import { RequestStatus, statusFilters } from "constants/requests";
import useDebounce from "hooks/useDebounce";
import CardList, { LoadingCardList } from "modules/card/List";
import { camelToTitle } from "utils/case";

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [requests, loadRequests] = useAtom(requestsAtom);
  const [searchQuery, setSearchQuery] = useState("");
  const searchDebounced = useDebounce(searchQuery.trim());
  const [prevListLength, setPrevListLength] = useState(0);
  const [statusFilter, setStatusFilter] = useState<RequestStatus>("all");
  const [chainFilter, setChainFilter] = useState<ChainId | "all">("all");

  const updateSubmissions = async (loadContinued: boolean = false) => {
    setLoading(true);
    if (loadContinued) setPrevListLength(requests.length);
    await loadRequests({
      searchQuery: searchDebounced,
      status: statusFilter,
      chain: chainFilter,
      loadContinued,
    });
    setLoading(false);
  };

  useEffect(() => {
    updateSubmissions();
  }, [searchDebounced, statusFilter, chainFilter]);

  const loadExhausted =
    !requests.length || // No requests loaded
    requests.length % REQUESTS_DISPLAY_BATCH || // Submissions loaded did not fill a batch
    prevListLength === requests.length; // Submissions loaded filled a batch but no more were loaded previously
  // TODO not perfect, maybe add this to a separate atom?

  return (
    <div
      className="py-4 px-8
                 flex flex-col justify-center
                 sm:px-12
                 md:py-8 md:px-16
                 lg:px-32"
    >
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
            chainFilter === "all" ? "all" : CHAIN_ID_TO_NAME[chainFilter]
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
              name={CHAIN_ID_TO_NAME[chainID]}
            />
          ))}
        </Dropdown>
      </div>

      {loading && !requests.length ? (
        <LoadingCardList />
      ) : (
        <CardList requests={requests} />
      )}
      {!loading && !loadExhausted && (
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
