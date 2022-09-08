import cn from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import { EvidenceFileInterface, RegistrationFileInterface } from "api/files";
import { PendingRequest as PendingRequestType } from "api/types";
import ALink from "components/ALink";
import Image from "components/Image";
import { CHAIN } from "constants/chains";
import { getColorForStatus } from "constants/misc";
import { queryToStatus } from "constants/requests";
import useIPFS from "hooks/useIPFS";
import { explorerLink, shortenAddress } from "utils/address";
import { camelToTitle } from "utils/case";
import { ipfs } from "utils/ipfs";

interface PendingRequestProps {
  humanity: string;
  request: PendingRequestType;
}

const PendingRequest: React.FC<PendingRequestProps> = ({
  humanity,
  request,
}) => {
  const [evidenceURI] = useIPFS<EvidenceFileInterface>(
    request.evidence[0]?.URI
  );
  const [data] = useIPFS<RegistrationFileInterface>(evidenceURI?.fileURI);

  const ChainLogo = CHAIN[request.chainId].Logo;

  const statusColor = getColorForStatus(request.status, request.registration);

  return (
    <Link
      to={`/request/${CHAIN[request.chainId].NAME.toLowerCase()}/${humanity}/${
        request.index
      }`}
      className={cn(
        "paper h-20 px-4 my-2",
        "grid grid-flow-col gap items-center",
        "font-semibold cursor-pointer",
        "border-status-" + statusColor
      )}
    >
      <div className="flex items-center">
        {data && <Image className="w-16 h-16" uri={ipfs(data.photo)} rounded />}
        <span className="ml-2 underline underline-offset-2">
          {shortenAddress(request.requester)}
        </span>
      </div>

      <span className={`justify-self-center text-status-${statusColor}`}>
        {camelToTitle(queryToStatus(request.status, request.registration))}
      </span>

      <span className="centered justify-self-end">
        <ChainLogo className="w-6 h-6 mr-2" />
        {CHAIN[request.chainId].NAME}
      </span>
    </Link>
  );
};

export default PendingRequest;
