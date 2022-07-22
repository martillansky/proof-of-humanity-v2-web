import { Suspense } from "react";
import ErrorBoundary from "components/ErrorBoundary";
import useIPFS from "hooks/useIPFS";
import { camelToTitle } from "utils/case";
import { SubmissionInterface } from "api/submissions";
import { CHAIN_ID_TO_NAME } from "constants/chains";
import { queryToStatus } from "constants/submissions";
import { SUBMISSION_DURATION_TEMP } from "constants/misc";
import Image from "components/Image";

interface CardInterface {
  submission: SubmissionInterface;
}

const CardContent: React.FC<CardInterface> = ({ submission }) => {
  const [evidenceURI] = useIPFS(submission.requests[0]?.evidence[0]?.URI, {
    suspense: true,
  });
  const [data] = useIPFS(evidenceURI?.fileURI, { suspense: true });

  return (
    <div className="p-2 h-full flex flex-col items-center bg-white">
      <Image uri={`https://ipfs.kleros.io${data?.photo}`} rounded />
      <span className="font-bold">{submission.name}</span>
      <span>{submission.creationTime}</span>
      <span>{CHAIN_ID_TO_NAME[submission.chainID]}</span>
    </div>
  );
};

const Card: React.FC<CardInterface> = ({ submission }) => {
  const status = queryToStatus({
    disputed: submission.disputed,
    registered: submission.registered,
    status: submission.status,
    submissionDuration: SUBMISSION_DURATION_TEMP,
    submissionTime: submission.submissionTime,
  });

  return (
    <div className="h-72 rounded shadow flex-col overflow-hidden hover:scale-110 hover:z-10 hover:shadow-xl transition duration-150 ease-out cursor-pointer wiggle">
      <div className="justify-between bg-background font-light">
        <div className="w-full h-1 bg-sky-500" />
        <div className="p-2 flex justify-center items-center">
          <span className="text-sky-500">{camelToTitle(status)}</span>
          <span className="m-1 h-2 w-2 bg-sky-500 rounded-full" />
        </div>
      </div>

      <ErrorBoundary
        fallback={<ErrorFallback />}
        resetSwitch={submission.requests[0]?.evidence[0]?.URI}
      >
        <Suspense fallback={<LoadingFallback />}>
          <CardContent submission={submission} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Card;

const LoadingImage = () => (
  <div className="animate-pulse mx-auto mb-2 h-32 w-32 bg-slate-200 rounded-full" />
);

const LoadingFallback = () => (
  <div className="p-2 h-full flex flex-col items-center bg-white">
    <LoadingImage />
    <div className="animate-pulse w-1/2 h-4 bg-slate-200 rounded" />
  </div>
);

const ErrorFallback = () => (
  <div className="p-2 h-full flex flex-col items-center bg-white">
    <LoadingImage />
    <span className="font-bold">Some error occurred...</span>
  </div>
);
