import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { submissionsAtom } from "api/submissions";
import useDebounce from "hooks/useDebounce";
import CardList, { LoadingCardList } from "modules/Card/List";
import { camelToTitle } from "utils/case";
import { statusFilters, SubmissionStatus } from "constants/submissions";
import {
  SUBMISSIONS_DISPLAY_BATCH,
  SUBMISSION_DURATION_TEMP,
} from "constants/misc";
import {
  CHAIN_ID_TO_NAME,
  ChainId,
  SUPPORTED_CHAIN_IDS,
} from "constants/chains";
import Dropdown from "components/Dropdown";
import DropdownItem from "components/DropdownItem";

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [submissions, loadSubmissions] = useAtom(submissionsAtom);
  const [searchQuery, setSearchQuery] = useState("");
  const searchDebounced = useDebounce(searchQuery.trim());
  const [prevListLength, setPrevListLength] = useState(0);
  const [statusFilter, setStatusFilter] = useState<SubmissionStatus>("all");
  const [chainFilter, setChainFilter] = useState<ChainId | "all">("all");

  const updateSubmissions = async (loadContinued: boolean = false) => {
    setLoading(true);
    if (loadContinued) setPrevListLength(submissions.length);
    await loadSubmissions({
      searchQuery: searchDebounced,
      status: statusFilter,
      chain: chainFilter,
      submissionDuration: SUBMISSION_DURATION_TEMP,
      loadContinued,
    });
    setLoading(false);
  };

  useEffect(() => {
    updateSubmissions();
  }, [searchDebounced, statusFilter, chainFilter]);

  const loadExhausted =
    !submissions.length || // No submissions loaded
    submissions.length % SUBMISSIONS_DISPLAY_BATCH || // Submissions loaded did not fill a batch
    prevListLength === submissions.length; // Submissions loaded filled a batch but no more were loaded previously
  // TODO not perfect, maybe add this to a separate atom?

  return (
    <div className="py-8 px-32 flex flex-col justify-center">
      <div>
        <span className="font-semibold">x</span>
        <span> Profiles</span>
      </div>
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

      {loading && !submissions.length ? (
        <LoadingCardList />
      ) : (
        <CardList submissions={submissions} />
      )}
      {!loading && !loadExhausted && (
        <button
          className="mx-auto my-8 px-8 py-4 bg-amber-400 rounded-full text-white font-bold shadow-md shadow-yellow"
          onClick={() => updateSubmissions(true)}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Home;
