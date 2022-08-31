import { Suspense, useMemo } from "react";
import ErrorBoundary from "components/ErrorBoundary";
import { camelToTitle } from "utils/case";
import { ChainId, CHAIN_ID_TO_NAME } from "constants/chains";
import { queryToStatus } from "constants/requests";
import { Link } from "react-router-dom";
import { RequestInterface } from "api/requests";
import cn from "classnames";
import { STATUS_TO_COLOR } from "constants/misc";
import { ErrorFallback, LoadingFallback } from "./misc";
import Content from "./Content";
import { encodeId } from "utils/identifier";

const Card: React.FC<{ request: RequestInterface }> = ({ request }) => {
  const status = useMemo(
    () => queryToStatus(request.status, request.registration),
    [request]
  );

  console.log("old", ChainId[request.chainID], request.old);

  return (
    <Link
      to={`/request/${CHAIN_ID_TO_NAME[
        request.chainID
      ].toLowerCase()}/${encodeId(request.soul.id)}/${request.index}${
        request.old ? "/v1" : ""
      }`}
      className="rounded shadow flex-col overflow-hidden hover:scale-110 hover:z-10 hover:shadow-xl transition duration-150 ease-out cursor-pointer wiggle"
    >
      <div className="justify-between bg-slate-100 font-light">
        <div
          className={cn("w-full h-1", `bg-${STATUS_TO_COLOR[request.status]}`)}
        />
        <div className="p-2 centered font-semibold">
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
