import { useEffect, useState } from "react";
import { getSdk, SubmissionsQuery } from "generated-gql/graphql";
import useDebounce from "hooks/useDebounce";
import sdk from "./sdk";

const chainIDs = Object.keys(sdk);

type sdkReturnType = ReturnType<typeof getSdk>;
type queryType = keyof sdkReturnType;

type queryReturnType<Q extends queryType> = Record<
  string,
  Awaited<ReturnType<sdkReturnType[Q]>>
>;

// const queryFetch = async <Q extends queryType>(
//   query: Q,
//   ...params: Parameters<sdkReturnType[Q]>
// ): Promise<queryReturnType<Q>> => {
//   const res = await Promise.all(
//     chainIDs.map((chainID) => sdk[chainID][query](...((params as any) || [])))
//   );

//   return chainIDs.reduce(
//     (acc, chainID, i) => ({ ...acc, [chainID]: res[i] }),
//     {}
//   );
// };

export const queryFetchIndividual = async <Q extends queryType>(
  fetchChainID: string,
  query: Q,
  ...params: Parameters<sdkReturnType[Q]>
): Promise<ReturnType<sdkReturnType[Q]>> =>
  await sdk[fetchChainID][query](...((params as any) || []));

type submissionQueryResultType = ArrayElement<SubmissionsQuery["submissions"]>;

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

const DISPLAY_BATCH = 12;

const initialChainCursors = chainIDs.reduce(
  (acc, chainID) => ({ ...acc, [chainID]: 1 }),
  {}
);
const initialChainStacks = chainIDs.reduce(
  (acc, chainID) => ({ ...acc, [chainID]: [] }),
  {}
);

export const useSubmissionsQuery = () => {
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState(1);
  const [chainCursors, setChainCursors] =
    useState<Record<string, number>>(initialChainCursors);
  const [chainStacks, setChainStacks] =
    useState<Record<string, submissionQueryResultType[]>>(initialChainStacks);
  const [searchQuery, setSearchQuery] = useState("");
  const searchDebounced = useDebounce(searchQuery, 1000);

  console.log({ searchDebounced });

  const normalizedSubmissions = normalizeSubmissions(chainStacks);
  const displayedSubmissions = normalizedSubmissions.slice(
    0,
    DISPLAY_BATCH * cursor
  );

  const updateSubmissions = async () => {
    // TODO cache first batch?
    // TODO clean possible missing/duplicates with OFFSET = 3?

    setLoading(true);
    const newChainCursors = { ...chainCursors };
    const fetchChainIDs: string[] = [];
    const fetchPromises: Promise<ReturnType<sdkReturnType["submissions"]>>[] =
      [];
    for (const chainID of chainIDs) {
      const displayedForChain = displayedSubmissions.filter(
        (submission) => submission.chainID === chainID
      ).length;

      if (
        displayedForChain + DISPLAY_BATCH * 2 >=
        (chainCursors[chainID] - 1) * DISPLAY_BATCH
      ) {
        newChainCursors[chainID] += 1;
        fetchChainIDs.push(chainID);
        fetchPromises.push(
          queryFetchIndividual<"submissions">(chainID, "submissions", {
            first: DISPLAY_BATCH * 4,
            skip: normalizedSubmissions.filter(
              (submission) => submission.chainID === chainID
            ).length,
            where: searchDebounced
              ? { name_contains: searchDebounced }
              : undefined,
          })
        );
      }
    }

    if (!fetchChainIDs.length) return;

    const res = await Promise.all(fetchPromises);

    const fetchedSubmissions = fetchChainIDs.reduce<
      queryReturnType<"submissions">
    >((acc, chainID, i) => ({ ...acc, [chainID]: res[i] }), {});

    const submissionStacks = fetchChainIDs.reduce(
      (acc, chainID) => ({
        ...acc,
        [chainID]: [
          ...chainStacks[chainID],
          ...fetchedSubmissions[chainID].submissions,
        ],
      }),
      chainStacks
    );

    setChainCursors(newChainCursors);
    setChainStacks(submissionStacks);
    setLoading(false);
  };

  useEffect(() => {
    updateSubmissions();
  }, [cursor, initialChainStacks]);

  // useEffect(() => {
  //   setChainStacks(initialChainStacks);
  //   setChainCursors(initialChainCursors);
  //   setCursor(1);
  //   // if (cursor === 1) updateSubmissions();
  //   // else
  // }, [searchDebounced]);

  return {
    loading,
    submissions: displayedSubmissions,
    setSearchQuery,
    loadMore: () => setCursor((old) => old + 1),
  };
};
