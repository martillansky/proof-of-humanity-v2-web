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
    request.evidence.at(0)?.URI,
    { suspense: true }
  );
  const [data] = useIPFS<RegistrationFileInterface>(evidenceURI?.fileURI, {
    suspense: true,
  });

  const ChainLogo = CHAIN[request.chainID].Logo;

  return (
    <div className="p-2 h-full flex flex-col items-center bg-white">
      <Image uri={ipfs(data?.photo!)} rounded />
      <span className="font-semibold">
        {request.registration ? request.claimer!.name : "REMOVAL"}
      </span>
      <span className="text-center">{data?.bio}</span>
      <span className="text-blue-400">{timeAgo(request.creationTime)}</span>
      <span className="text-blue-400">{shortenAddress(request.requester)}</span>
      <ChainLogo className="w-6 h-6 self-end opacity-60" />
    </div>
  );
};

export default Content;
