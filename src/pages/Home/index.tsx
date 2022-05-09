import cn from "classnames";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { submissionsAtom } from "api/submissions";
import Divider from "components/Divider";
import Popover from "components/Popover";
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
  ChainID,
  SUPPORTED_CHAIN_IDS,
} from "constants/chains";

interface FilterChoiceInterface
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected: boolean;
  text: string;
}

const FilterChoice = ({ selected, text, ...props }: FilterChoiceInterface) => (
  <button className={cn({ "bg-orange": selected })} {...props}>
    {camelToTitle(text)}
  </button>
);

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [submissions, loadSubmissions] = useAtom(submissionsAtom);
  const [searchQuery, setSearchQuery] = useState("");
  const searchDebounced = useDebounce(searchQuery.trim());
  const [prevListLength, setPrevListLength] = useState(0);
  const [statusFilter, setStatusFilter] = useState<SubmissionStatus>("all");
  const [chainFilter, setChainFilter] = useState<ChainID | "all">("all");

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
                {camelToTitle(statusFilter)}
                {" | "}
                {camelToTitle(
                  chainFilter === "all" ? "all" : CHAIN_ID_TO_NAME[chainFilter]
                )}
              </button>
            }
          >
            <div className="grid grid-cols-1 gap-4">
              {statusFilters.map((status) => (
                <FilterChoice
                  key={status}
                  selected={statusFilter === status}
                  onClick={() => setStatusFilter(status)}
                  text={status}
                />
              ))}
              <Divider />
              <FilterChoice
                selected={chainFilter === "all"}
                onClick={() => setChainFilter("all")}
                text="all"
              />
              {SUPPORTED_CHAIN_IDS.map((chainID) => (
                <FilterChoice
                  key={chainID}
                  selected={chainFilter === chainID}
                  onClick={() => setChainFilter(chainID)}
                  text={CHAIN_ID_TO_NAME[chainID]}
                />
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
          onClick={async () => updateSubmissions(true)}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Home;
