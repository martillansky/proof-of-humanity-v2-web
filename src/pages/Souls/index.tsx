import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import { soulsAtom } from "api/souls";
import Dropdown from "components/Dropdown";
import DropdownItem from "components/DropdownItem";
import {
  CHAIN_ID_TO_NAME,
  ChainId,
  SUPPORTED_CHAIN_IDS,
} from "constants/chains";
import { SOULS_DISPLAY_BATCH } from "constants/misc";
import useDebounce from "hooks/useDebounce";
import SoulCard from "modules/soul/Card";
import SoulWidget from "modules/soul/Widget";
import { camelToTitle } from "utils/case";

const Souls: React.FC = () => {
  const [souls, loadSouls] = useAtom(soulsAtom);
  const [searchQuery, setSearchQuery] = useState("");
  const searchDebounced = useDebounce(searchQuery.trim());
  const [prevListLength, setPrevListLength] = useState(0);
  const [chainFilter, setChainFilter] = useState<ChainId | "all">("all");

  const updateSubmissions = async (loadContinued: boolean = false) => {
    if (loadContinued) setPrevListLength(souls.length);
    await loadSouls({
      searchQuery: searchDebounced,
      chain: chainFilter,
      loadContinued,
    });
  };

  useEffect(() => {
    updateSubmissions();
  }, [searchDebounced, chainFilter]);

  const loadExhausted =
    !souls.length || // No requests loaded
    souls.length % SOULS_DISPLAY_BATCH || // Submissions loaded did not fill a batch
    prevListLength === souls.length; // Submissions loaded filled a batch but no more were loaded previously
  // TODO not perfect, maybe add this to a separate atom?

  return (
    <div
      className="py-4 px-8
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

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        {souls.map((soul) => (
          <Popup modal key={soul.id} trigger={<SoulCard soul={soul} />}>
            {(close) => (
              <>
                <div className="backdrop" onClick={close} />
                <div className="fixed absolute-centered bordered w-2/5 z-30">
                  <SoulWidget soul={soul} />
                </div>
              </>
            )}
          </Popup>
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

export default Souls;
