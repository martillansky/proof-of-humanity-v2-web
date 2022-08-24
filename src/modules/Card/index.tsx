import { Suspense, useMemo } from "react";
import ErrorBoundary from "components/ErrorBoundary";
import useIPFS from "hooks/useIPFS";
import { camelToTitle } from "utils/case";
import { CHAIN_ID_TO_NAME } from "constants/chains";
import { queryToStatus } from "constants/requests";
import Image from "components/Image";
import { Link } from "react-router-dom";
import { EvidenceFileInterface, RegistrationFileInterface } from "api/files";
import { RequestInterface } from "api/requests";
import { timeAgo } from "utils/time";
import { ipfs } from "utils/ipfs";
import cn from "classnames";
import { Status } from "generated/graphql";

const STATUS_TO_COLOR: Record<Status, string> = {
  Vouching: "vouching",
  Resolving: "resolving",
  Disputed: "disputed",
  Resolved: "resolved",
};

const CardContent: React.FC<{ request: RequestInterface }> = ({ request }) => {
  const [evidenceURI] = useIPFS<EvidenceFileInterface>(
    request.evidence[0]?.URI,
    { suspense: true }
  );
  const [data] = useIPFS<RegistrationFileInterface>(evidenceURI?.fileURI, {
    suspense: true,
  });

  return (
    <div className="p-2 h-full flex flex-col items-center bg-white">
      <Image uri={ipfs(data?.photo!)} rounded />
      <span className="font-bold">
        {request.registration ? request.claimer!.name : request.soul.name}
      </span>
      <span>{timeAgo(request.creationTime)}</span>
      <span>{CHAIN_ID_TO_NAME[request.chainID]}</span>
    </div>
  );
};

const Card: React.FC<{ request: RequestInterface }> = ({ request }) => {
  const status = useMemo(
    () => queryToStatus(request.status, request.registration),
    [request]
  );

  return (
    <Link
      to={`/request/${request.id.replace("#", "/")}/${CHAIN_ID_TO_NAME[
        request.chainID
      ].toLowerCase()}`}
      className="h-72 rounded shadow flex-col overflow-hidden hover:scale-110 hover:z-10 hover:shadow-xl transition duration-150 ease-out cursor-pointer wiggle"
    >
      <div className="justify-between background font-light">
        <div
          className={cn("w-full h-1", `bg-${STATUS_TO_COLOR[request.status]}`)}
        />
        <div className="p-2 flex justify-center items-center">
          <span className={`text-${STATUS_TO_COLOR[request.status]}`}>
            {camelToTitle(status)}
          </span>
          <span
            className={cn(
              "m-1 h-2 w-2 rounded-full",
              `bg-${STATUS_TO_COLOR[request.status]}`
            )}
          />
        </div>
      </div>

      <ErrorBoundary
        fallback={<ErrorFallback />}
        resetSwitch={request.evidence[0]?.URI}
      >
        <Suspense fallback={<LoadingFallback />}>
          <CardContent request={request} />
        </Suspense>
      </ErrorBoundary>
    </Link>
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
