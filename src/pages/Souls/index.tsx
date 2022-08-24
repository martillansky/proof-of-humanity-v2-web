import { soulsAtom } from "api/souls";
import Dropdown from "components/Dropdown";
import DropdownItem from "components/DropdownItem";
import Modal from "components/Modal";
import {
  ChainId,
  CHAIN_ID_TO_NAME,
  SUPPORTED_CHAIN_IDS,
} from "constants/chains";
import { SOULS_DISPLAY_BATCH } from "constants/misc";
import useDebounce from "hooks/useDebounce";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { explorerLink, shortenAddress } from "utils/address";
import { camelToTitle } from "utils/case";
import ProofOfHumanityLogo from "../../assets/svg/ProofOfHumanityLogo.svg";

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
    <div className="py-8 px-32 flex flex-col justify-center">
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

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {souls.map((soul) => (
          <Modal
            key={soul.id}
            trigger={
              <div className="mt-8 p-4 relative flex flex-col items-end border bg-white rounded cursor-pointer">
                <div className="absolute left-8 -top-8 w-32 h-32 px-6 pt-5 rounded-full border-2 bg-white shadow">
                  <ProofOfHumanityLogo />
                </div>
                <strong>{soul.id}</strong>
                <div>{soul.claimed ? `Claimed` : `Not claimed`}</div>
                <div className="px-2 py-1 bg-blue-500 text-white font-bold rounded-full">
                  {soul.nbPendingRequests}
                </div>
              </div>
            }
          >
            <div className="relative flex flex-col items-center p-4 bg-white rounded">
              <div className="absolute -top-16 w-32 h-32 px-6 pt-5 rounded-full border-2 bg-white shadow">
                <ProofOfHumanityLogo />
              </div>
              <div className="w-full flex flex-col items-center">
                <div className="mt-20">
                  Soul ID: <strong>3223843278462</strong>
                </div>
                <div>{soul.claimed ? `Claimed` : `Not claimed`}</div>
                {soul.claimed && (
                  <div>Owner: {shortenAddress(soul.owner!.id)}</div>
                )}
                <div>
                  Home chain: <strong>{CHAIN_ID_TO_NAME[soul.chainID]}</strong>
                </div>
                <div className="px-2 py-1 bg-blue-500 text-white font-bold rounded-full">
                  {soul.nbPendingRequests} pending requests
                </div>
                <button
                  className="text-white font-bold
                             mt-4 px-4 py-2 rounded-full
                             bg-gradient-to-r from-[#FF7A4E] via-[#FF7A4E] to-[#FF809F]"
                >
                  Claim this soul
                </button>
              </div>
            </div>
          </Modal>
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
