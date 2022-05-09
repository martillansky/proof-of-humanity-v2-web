import { Suspense } from "react";
import ErrorBoundary from "components/ErrorBoundary";
import useIPFS from "hooks/useIPFS";
import { camelToTitle } from "utils/case";
import { SubmissionInterface } from "api/submissions";
import { CHAIN_ID_TO_NAME } from "constants/chains";
import { queryToStatus } from "constants/submissions";
import { SUBMISSION_DURATION_TEMP } from "constants/misc";

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
      <div className="mb-2 flex items-center justify-center h-32 w-32 overflow-hidden rounded-full mx-auto">
        <img
          className="h-min w-min"
          src={`https://ipfs.kleros.io${data?.photo}`}
        />
      </div>
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
    <div className="h-72 rounded shadow-xl shadow-yellow flex-col overflow-hidden hover:scale-110 hover:z-10 hover:shadow-2xl hover:shadow-yellow transition duration-150 ease-out cursor-pointer wiggle">
      <div className="p-4 flex justify-between bg-yellowish font-light">
        <span>💡</span>
        <span>{camelToTitle(status)}</span>
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
