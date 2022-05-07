import cn from "classnames";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import {
  statusFilters,
  submissionsAtom,
  SubmissionsFilters,
  submissionStatus,
} from "src/api/store-jotai";
import Divider from "src/components/Divider";
import Popover from "src/components/Popover";
import {
  ChainID,
  chainIDs,
  DISPLAY_BATCH,
  supportedChains,
} from "src/constants";
import useDebounce from "src/hooks/useDebounce";
import CardList, { LoadingCardList } from "src/modules/Card/List";
import { camelToTitle } from "src/utils/case";

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [submissions, loadSubmissions] = useAtom(submissionsAtom);
  const [searchQuery, setSearchQuery] = useState("");
  const searchDebounced = useDebounce(searchQuery.trim());
  const [prevListLength, setPrevListLength] = useState(0);
  const [statusFilter, setStatusFilter] =
    useState<keyof typeof submissionStatus>("none");
  const [chainFilter, setChainFilter] = useState<ChainID | "all" | string>(
    "all"
  );

  const updateSubmissions = async (params: SubmissionsFilters) => {
    setLoading(true);
    if (params.loadContinued) setPrevListLength(submissions.length);
    await loadSubmissions(params);
    setLoading(false);
  };

  useEffect(() => {
    updateSubmissions({
      searchQuery: searchDebounced,
      loadContinued: false,
      status: statusFilter,
    });
  }, [searchDebounced, statusFilter]);

  const loadExhausted =
    !submissions.length || // No submissions loaded
    submissions.length % DISPLAY_BATCH || // Submissions loaded did not fill a batch
    prevListLength === submissions.length; // Submissions loaded filled a batch but no more were loaded previously

  return (
    <div className="p-8 flex flex-col justify-center">
      <div className="flex flex-col rounded shadow-xl shadow-yellow mb-4">
        <div className="px-4 py-2 flex justify-end bg-yellowish">
          <span className="font-semibold">n Profiles</span>
        </div>
        <div className="px-4 py-2 flex">
          <input
            className="w-full p-2 mr-2"
            placeholder="Search (case sensitive)"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Popover
            trigger={
              <button className="w-64 p-2 border">
                {camelToTitle(statusFilter === "none" ? "all" : statusFilter)} |{" "}
                {camelToTitle(
                  chainFilter === "all" ? "all" : supportedChains[chainFilter]
                )}
              </button>
            }
          >
            <div className="grid grid-cols-1 gap-4">
              {statusFilters.map((status) => (
                <button
                  key={status}
                  className={cn({ "bg-orange": status === statusFilter })}
                  onClick={() => setStatusFilter(status)}
                >
                  {camelToTitle(status === "none" ? "all" : status)}
                </button>
              ))}
              <Divider />
              <button
                className={cn({ "bg-orange": chainFilter === "all" })}
                onClick={() => setChainFilter("all")}
              >
                All
              </button>
              {chainIDs.map((chain) => (
                <button
                  key={supportedChains[chain]}
                  className={cn({ "bg-orange": chain === chainFilter })}
                  onClick={() => setChainFilter(chain)}
                >
                  {camelToTitle(supportedChains[chain])}
                </button>
              ))}
            </div>
          </Popover>
        </div>
      </div>

      {loading && !submissions.length ? (
        <LoadingCardList />
      ) : (
        <CardList submissions={submissions} />
      )}
      {!loading && !loadExhausted && (
        <button
          className="mx-auto my-8 px-8 py-4 bg-orange rounded-full text-white font-bold shadow-md shadow-yellow"
          onClick={async () => {
            updateSubmissions({
              searchQuery: searchDebounced,
              loadContinued: true,
              status: statusFilter,
            });
          }}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Home;
