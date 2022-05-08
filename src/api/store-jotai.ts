import { getSdk, SubmissionsQuery } from "generated/graphql";
import { queryFetchIndividual } from ".";
import { atom } from "jotai";
import { chainIDs, DISPLAY_BATCH } from "constants/index";
import { isAddress } from "@ethersproject/address";

type submissionQueryResultType = ArrayElement<SubmissionsQuery["submissions"]>;

type sdkReturnType = ReturnType<typeof getSdk>;
type queryReturnType<Q extends keyof sdkReturnType> = Record<
  string,
  Awaited<ReturnType<sdkReturnType[Q]>>
>;

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

const cursorAtom = atom(0);
const chainStacksAtom =
  atom<Record<string, submissionQueryResultType[]>>(initialChainStacks);
const normalizedSubmissionsAtom = atom<SubmissionInterface[]>((get) =>
  normalizeSubmissions(get(chainStacksAtom))
);

export interface SubmissionsFilters {
  searchQuery: string;
  loadContinued: boolean;
  status?: keyof typeof submissionStatus;
  submissionDuration?: number;
}

export const submissionsAtom = atom(
  (get) =>
    get(normalizedSubmissionsAtom).slice(0, DISPLAY_BATCH * get(cursorAtom)),
  async (
    get,
    set,
    {
      searchQuery,
      loadContinued,
      status = "none",
      submissionDuration = 0,
    }: SubmissionsFilters
  ) => {
    let chainStacks = get(chainStacksAtom);
    let cursor = loadContinued ? get(cursorAtom) + 1 : 1;

    const fetchChainIDs: string[] = [];
    const fetchPromises: Promise<ReturnType<sdkReturnType["submissions"]>>[] =
      [];

    for (const chainID of chainIDs) {
      const displayedForChain = get(submissionsAtom).filter(
        (submission) => submission.chainID === chainID
      ).length;

      if (
        !loadContinued ||
        displayedForChain + DISPLAY_BATCH >= chainStacks[chainID].length
      ) {
        const statusFilter = submissionStatus[status].filter;
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
            first: DISPLAY_BATCH * 4,
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

export const submissionStatus = {
  none: {
    filter: {},
  },
  vouching: {
    filter: { status: "Vouching" },
  },
  pendingRegistration: {
    filter: { status: "PendingRegistration", disputed: false },
  },
  pendingRemoval: {
    filter: { status: "PendingRemoval", disputed: false },
  },
  challengedRegistration: {
    filter: { status: "PendingRegistration", disputed: true },
  },
  challengedRemoval: {
    filter: { status: "PendingRemoval", disputed: true },
  },
  registered: {
    filter: (submissionDuration: number) => ({
      status: "None",
      registered: true,
      submissionTime_gte:
        Math.floor(Date.now() / 1000) - (submissionDuration || 0),
    }),
  },
  expired: {
    filter: (submissionDuration: number) => ({
      status: "None",
      registered: true,
      submissionTime_lt:
        Math.floor(Date.now() / 1000) - (submissionDuration || 0),
    }),
  },
} as const;

export const statusFilters = Object.keys(submissionStatus) as Array<
  keyof typeof submissionStatus
>;
