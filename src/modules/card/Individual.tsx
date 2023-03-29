import { ChainId } from "enums/ChainId";
import { Suspense, useMemo } from "react";
import { Link } from "react-router-dom";
import ErrorBoundary from "components/ErrorBoundary";
import { CHAIN } from "constants/chains";
import { getColorForStatus } from "constants/misc";
import { queryToStatus } from "constants/requests";
import { Status } from "generated/graphql";
import { camelToTitle } from "utils/case";
import { prettifyId } from "utils/identifier";
import Content from "./Content";
import { ErrorFallback, LoadingFallback } from "./misc";

export interface RequestCardInterface {
  legacy: boolean;
  index: number;
  revocation: boolean;
  chainId: ChainId;
  status: Status;
  requester: string;
  evidence: { URI: string }[];
  claimer: { name?: string | null };
  humanity: {
    id: string;
    winnerClaimRequest: { evidence: { URI: string }[] }[];
  };
}

const Card: React.FC<{ request: RequestCardInterface }> = ({ request }) => {
  const status = useMemo(
    () => queryToStatus(request.status, request.revocation),
    [request]
  );
  const statusColor = getColorForStatus(request.status, request.revocation);

  return (
    <Link
      to={`/request/${CHAIN[request.chainId].NAME.toLowerCase()}/${prettifyId(
        request.humanity.id
      )}/${(request.legacy ? -1 : 1) * request.index}`}
      className="h-84 rounded border bg-white shadow-sm flex-col overflow-hidden hover:scale-110 hover:z-10 hover:shadow-xl transition duration-150 ease-out cursor-pointer wiggle"
    >
      <div className="justify-between font-light">
        <div className={`w-full h-1 bg-status-${statusColor}`} />
        <div className="p-2 centered font-medium">
          <span className={`text-status-${statusColor}`}>
            {camelToTitle(status)}
          </span>
          <span className={`dot ml-2 bg-status-${statusColor}`} />
        </div>
      </div>

      <ErrorBoundary
        fallback={<ErrorFallback request={request} />}
        resetSwitch={request.evidence[0]?.URI}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Content request={request} />
        </Suspense>
      </ErrorBoundary>
    </Link>
  );
};

export default Card;
