import { Suspense, useMemo } from "react";
import { Link } from "react-router-dom";
import { RequestInterface } from "api/requests";
import ErrorBoundary from "components/ErrorBoundary";
import { CHAIN } from "constants/chains";
import { getColorForStatus } from "constants/misc";
import { queryToStatus } from "constants/requests";
import { camelToTitle } from "utils/case";
import { prettifyId } from "utils/identifier";
import Content from "./Content";
import { ErrorFallback, LoadingFallback } from "./misc";

const Card: React.FC<{ request: RequestInterface }> = ({ request }) => {
  const status = useMemo(
    () => queryToStatus(request.status, request.registration),
    [request]
  );
  const statusColor = getColorForStatus(request.status, request.registration);

  return (
    <Link
      to={`/request/${CHAIN[request.chainID].NAME.toLowerCase()}/${prettifyId(
        request.humanity.id
      )}/${request.index}${request.old ? "/v1" : ""}`}
      className="h-84 rounded border shadow-sm flex-col overflow-hidden hover:scale-110 hover:z-10 hover:shadow-xl transition duration-150 ease-out cursor-pointer wiggle"
    >
      <div className="justify-between bg-shade-50 font-light">
        <div className={`w-full h-1 bg-status-${statusColor}`} />
        <div className="p-2 centered font-semibold">
          <span className={`text-status-${statusColor}`}>
            {camelToTitle(status)}
          </span>
          <span className={`dot m-1 bg-status-${statusColor}`} />
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
