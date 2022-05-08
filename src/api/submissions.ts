import { SubmissionsQuery } from "generated/graphql";
import { atom } from "jotai";
import { isAddress } from "@ethersproject/address";
import { queryFetchIndividual, queryReturnType, sdkReturnType } from ".";
import { SUBMISSIONS_STATUS, SubmissionStatus } from "constants/submissions";
import { SUBMISSIONS_DISPLAY_BATCH } from "constants/misc";
import { ChainID, SUPPORTED_CHAIN_IDS } from "constants/chains";
import { getKeys } from "utils/object";

type submissionQueryResultType = ArrayElement<SubmissionsQuery["submissions"]>;

export interface SubmissionInterface extends submissionQueryResultType {
  chainID: ChainID;
}

const normalizeSubmissions = (
  submissionsData: Record<ChainID, submissionQueryResultType[]>
) =>
  getKeys(submissionsData)
    .reduce<SubmissionInterface[]>(
      (acc, chainID) => [
        ...acc,
        ...submissionsData[chainID].map((submission) => ({
          ...submission,
          chainID,
        })),
      ],
      []
    )
    .sort((sub1, sub2) => sub2.creationTime - sub1.creationTime);

const initialChainStacks = SUPPORTED_CHAIN_IDS.reduce(
  (acc, chainID) => ({ ...acc, [chainID]: [] }),
  {}
);

const cursorAtom = atom(0);
const chainStacksAtom =
  atom<Record<number, submissionQueryResultType[]>>(initialChainStacks);
const normalizedSubmissionsAtom = atom<SubmissionInterface[]>((get) =>
  normalizeSubmissions(get(chainStacksAtom))
);

export interface SubmissionsFilters {
  searchQuery: string;
  loadContinued: boolean;
  status?: SubmissionStatus;
  submissionDuration?: number;
  chain: ChainID | "all";
}

export const submissionsAtom = atom(
  (get) =>
    get(normalizedSubmissionsAtom).slice(
      0,
      SUBMISSIONS_DISPLAY_BATCH * get(cursorAtom)
    ),
  async (
    get,
    set,
    {
      searchQuery,
      loadContinued,
      status = "all",
      submissionDuration = 0,
      chain = "all",
    }: SubmissionsFilters
  ) => {
    let chainStacks = get(chainStacksAtom);
    let cursor = loadContinued ? get(cursorAtom) + 1 : 1;

    const fetchChainIDs: number[] = [];
    const fetchPromises: Promise<ReturnType<sdkReturnType["submissions"]>>[] =
      [];

    chainStacks = SUPPORTED_CHAIN_IDS.reduce(
      (acc, chainID) => ({
        ...acc,
        [chainID]:
          chain === "all" || chainID === chain ? chainStacks[chainID] : [],
      }),
      chainStacks
    );

    for (const chainID of SUPPORTED_CHAIN_IDS) {
      if (chain !== "all" && chain !== chainID) continue;

      const displayedForChain = get(submissionsAtom).filter(
        (submission) => submission.chainID === chainID
      ).length;

      if (
        !loadContinued ||
        displayedForChain + SUBMISSIONS_DISPLAY_BATCH >=
          chainStacks[chainID].length
      ) {
        const statusFilter = SUBMISSIONS_STATUS[status].filter;
        const where = {
          // if it's function it needs to be called with submissionDuration
          ...(typeof statusFilter === "function"
            ? statusFilter(submissionDuration)
            : statusFilter),
          ...(searchQuery
            ? isAddress(searchQuery)
              ? { id: searchQuery }
              : { name_contains: searchQuery }
            : undefined),
        };

        fetchChainIDs.push(chainID);
        fetchPromises.push(
          queryFetchIndividual<"submissions">(chainID, "submissions", {
            first: SUBMISSIONS_DISPLAY_BATCH * 4,
            skip: loadContinued
              ? get(normalizedSubmissionsAtom).filter(
                  (submission) => submission.chainID === chainID
                ).length
              : 0,
            where,
          })
        );
      }
    }

    if (fetchChainIDs.length) {
      const res = await Promise.all(fetchPromises);

      const fetchedSubmissions = fetchChainIDs.reduce<
        queryReturnType<"submissions">
      >((acc, chainID, i) => ({ ...acc, [chainID]: res[i] }), {});

      chainStacks = fetchChainIDs.reduce(
        (acc, chainID) => ({
          ...acc,
          [chainID]: [
            ...(loadContinued ? chainStacks[chainID] : []),
            ...fetchedSubmissions[chainID].submissions,
          ],
        }),
        chainStacks
      );
    }

    set(cursorAtom, cursor);
    set(chainStacksAtom, chainStacks);
  }
);
