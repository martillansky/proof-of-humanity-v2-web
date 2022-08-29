import { Suspense, useMemo } from "react";
import ErrorBoundary from "components/ErrorBoundary";
import { camelToTitle } from "utils/case";
import { CHAIN_ID_TO_NAME } from "constants/chains";
import { queryToStatus } from "constants/requests";
import { Link } from "react-router-dom";
import { RequestInterface } from "api/requests";
import cn from "classnames";
import { BigNumber } from "ethers";
import { STATUS_TO_COLOR } from "constants/misc";
import { ErrorFallback, LoadingFallback } from "./misc";
import Content from "./Content";

const Card: React.FC<{ request: RequestInterface }> = ({ request }) => {
  console.log("|||||||", { request });
  const status = useMemo(
    () => queryToStatus(request.status, request.registration),
    [request]
  );

  return (
    <Link
      to={`/request/${BigNumber.from(request.soul.id)}/${
        request.realIndex
      }/${CHAIN_ID_TO_NAME[request.chainID].toLowerCase()}`}
      className="h-72 rounded shadow flex-col overflow-hidden hover:scale-110 hover:z-10 hover:shadow-xl transition duration-150 ease-out cursor-pointer wiggle"
    >
      <div className="justify-between bg-slate-100 font-light">
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
          <Content request={request} />
        </Suspense>
      </ErrorBoundary>
    </Link>
  );
};

export default Card;
