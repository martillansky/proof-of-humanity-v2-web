import { DISPLAY_BATCH } from "constants";
import { getSdk, SubmissionsQuery } from "generated/graphql";
import create from "zustand";
import { queryFetchIndividual } from ".";
import sdk from "./sdk";

type submissionQueryResultType = ArrayElement<SubmissionsQuery["submissions"]>;

type sdkReturnType = ReturnType<typeof getSdk>;
type queryType = keyof sdkReturnType;

type queryReturnType<Q extends queryType> = Record<
  string,
  Awaited<ReturnType<sdkReturnType[Q]>>
>;

const chainIDs = Object.keys(sdk);

const initialChainCursors = chainIDs.reduce(
  (acc, chainID) => ({ ...acc, [chainID]: 0 }),
  {}
);
const initialChainStacks = chainIDs.reduce(
  (acc, chainID) => ({ ...acc, [chainID]: [] }),
  {}
);

export interface SubmissionInterface extends submissionQueryResultType {
  chainID: string;
}

const normalizeSubmissions = (
  submissionsData: Record<string, submissionQueryResultType[]>
) =>
  Object.keys(submissionsData)
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

interface SubmissionsState {
  cursor: number;
  searchQuery: string;
  chainCursors: Record<string, number>;
  chainStacks: Record<string, submissionQueryResultType[]>;
  submissions: SubmissionInterface[];
  loadMore: () => Promise<void>;
}

export const useSubmissions = create<SubmissionsState>((set, get) => ({
  cursor: 0,
  searchQuery: "",
  submissions: [],
  chainCursors: initialChainCursors,
  chainStacks: initialChainStacks,

  loadMore: async () => {
    const searchQuery = get().searchQuery;
    const chainCursors = get().chainCursors;
    const displayedSubmissions = get().submissions;
    let chainStacks = get().chainStacks;
    let cursor = get().cursor;
    ++cursor;

    const fetchChainIDs: string[] = [];
    const fetchPromises: Promise<ReturnType<sdkReturnType["submissions"]>>[] =
      [];

    const normalizedSubmissions = normalizeSubmissions(chainStacks);

    for (const chainID of chainIDs) {
      const displayedForChain = displayedSubmissions.filter(
        (submission) => submission.chainID === chainID
      ).length;

      console.log({
        displayedForChain,
        chainID,
        chainCursor: chainCursors[chainID],
      });

      if (
        displayedForChain + DISPLAY_BATCH * 2 >=
        chainCursors[chainID] * DISPLAY_BATCH
      ) {
        ++chainCursors[chainID];
        fetchChainIDs.push(chainID);
        fetchPromises.push(
          queryFetchIndividual<"submissions">(chainID, "submissions", {
            first: DISPLAY_BATCH * 4,
            skip: normalizedSubmissions.filter(
              (submission) => submission.chainID === chainID
            ).length,
            where: searchQuery ? { name_contains: searchQuery } : undefined,
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
            ...chainStacks[chainID],
            ...fetchedSubmissions[chainID].submissions,
          ],
        }),
        chainStacks
      );
    }

    set({
      chainCursors,
      chainStacks,
      cursor,
      submissions: normalizeSubmissions(chainStacks).slice(
        0,
        DISPLAY_BATCH * cursor
      ),
    });
  },

  search: () => {},
}));
