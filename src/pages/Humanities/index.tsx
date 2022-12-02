import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { humanitiesAtom } from "api/humanities";
import Dropdown from "components/Dropdown";
import DropdownItem from "components/DropdownItem";
import PageLoader from "components/PageLoader";
import { CHAIN, ChainId, SUPPORTED_CHAIN_IDS } from "constants/chains";
import { HUMANITIES_DISPLAY_BATCH } from "constants/misc";
import useDebounce from "hooks/useDebounce";
import { useLoading } from "hooks/useLoading";
import HumanityCard from "modules/humanity/Card";
import { camelToTitle } from "utils/case";

const Humanities: React.FC = () => {
  const [humanities, loadHumanities] = useAtom(humanitiesAtom);
  const [searchQuery, setSearchQuery] = useState("");
  const searchDebounced = useDebounce(searchQuery.trim());
  const [prevListLength, setPrevListLength] = useState(0);
  const [chainFilter, setChainFilter] = useState<ChainId | "all">("all");
  const loading = useLoading();

  const updateSubmissions = async (loadContinued: boolean = false) => {
    loading.start();
    if (loadContinued) setPrevListLength(humanities.length);
    await loadHumanities({
      searchQuery: searchDebounced,
      chain: chainFilter,
      loadContinued,
    });
    loading.stop();
  };

  useEffect(() => {
    updateSubmissions();
  }, [searchDebounced, chainFilter]);

  const loadExhausted =
    !humanities.length || // No requests loaded
    humanities.length % HUMANITIES_DISPLAY_BATCH || // Submissions loaded did not fill a batch
    prevListLength === humanities.length; // Submissions loaded filled a batch but no more were loaded previously
  // TODO not perfect, maybe add this to a separate atom?

  if (loading.active) return <PageLoader />;

  return (
    <div className="content-wide">
      <div className="my-4 py-2 flex">
        <input
          className="w-full p-2 mr-2 border rounded"
          placeholder="Search (case sensitive)"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
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

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {humanities.map((humanity) => (
          <HumanityCard
            key={`${humanity.id}@${humanity.chainID}`}
            humanity={humanity}
          />
        ))}
      </div>

      {!loadExhausted && (
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

export default Humanities;
