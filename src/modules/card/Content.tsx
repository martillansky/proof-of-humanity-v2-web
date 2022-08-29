import { EvidenceFileInterface, RegistrationFileInterface } from "api/files";
import { RequestInterface } from "api/requests";
import Image from "components/Image";
import { CHAIN_ID_TO_NAME } from "constants/chains";
import useIPFS from "hooks/useIPFS";
import { ipfs } from "utils/ipfs";
import { timeAgo } from "utils/time";

const Content: React.FC<{ request: RequestInterface }> = ({ request }) => {
  console.log(request.claimer?.name);

  const [evidenceURI] = useIPFS<EvidenceFileInterface>(
    request.evidence[0]?.URI,
    { suspense: true }
  );
  const [data] = useIPFS<RegistrationFileInterface>(evidenceURI?.fileURI, {
    suspense: true,
  });

  console.log(request.evidence[0]?.URI, { evidenceURI }, { data });

  return (
    <div className="p-2 h-full flex flex-col items-center bg-white">
      <Image uri={ipfs(data?.photo!)} rounded />
      <span className="font-bold">
        {request.registration ? request.claimer!.name : "REMOVAL"}
      </span>
      <span>{timeAgo(request.creationTime)}</span>
      <span>{CHAIN_ID_TO_NAME[request.chainID]}</span>
    </div>
  );
};

export default Content;
