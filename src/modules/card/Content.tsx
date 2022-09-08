import { EvidenceFileInterface, RegistrationFileInterface } from "api/files";
import { RequestInterface } from "api/requests";
import Image from "components/Image";
import { CHAIN } from "constants/chains";
import useIPFS from "hooks/useIPFS";
import { shortenAddress } from "utils/address";
import { ipfs } from "utils/ipfs";
import { timeAgo } from "utils/time";

const Content: React.FC<{ request: RequestInterface }> = ({ request }) => {
  const [evidenceURI] = useIPFS<EvidenceFileInterface>(
    request &&
      (request.registration
        ? request
        : request?.humanity.winnerClaimRequest[0]
      ).evidence.at(-1)?.URI,
    { suspense: true }
  );
  const [data] = useIPFS<RegistrationFileInterface>(evidenceURI?.fileURI, {
    suspense: true,
  });

  const ChainLogo = CHAIN[request.chainID].Logo;

  return (
    <div className="p-2 h-full flex flex-col items-center bg-white">
      <Image uri={ipfs(data?.photo!)} rounded />
      <span className="font-semibold truncate">{request.claimer.name}</span>
      {data?.bio ? (
        <span className="text-center truncate">{data.bio}</span>
      ) : (
        <span className="text-center truncate text-slate-400">~</span>
      )}
      <span className="text-blue-400">{timeAgo(request.creationTime)}</span>
      <span className="text-blue-400">{shortenAddress(request.requester)}</span>
      <ChainLogo className="w-6 h-6 self-end opacity-60" />
    </div>
  );
};

export default Content;
