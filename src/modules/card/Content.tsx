import Image from "components/Image";
import { CHAIN } from "constants/chains";
import useIPFS from "hooks/useIPFS";
import { EvidenceFile, RegistrationFile } from "types/docs";
import { shortenAddress } from "utils/address";
import { ipfs } from "utils/ipfs";
import { RequestCardInterface } from "./Individual";

const Content: React.FC<{ request: RequestCardInterface }> = ({ request }) => {
  const [evidenceURI] = useIPFS<EvidenceFile>(
    request &&
      (request.revocation
        ? request.humanity.winnerClaimRequest[0]
        : request
      ).evidence.at(-1)?.URI,
    { suspense: true }
  );
  const [data] = useIPFS<RegistrationFile>(evidenceURI?.fileURI, {
    suspense: true,
  });

  const ChainLogo = CHAIN[request.chainId].Logo;

  return (
    <div className="p-3 h-full flex flex-col items-center bg-white">
      <Image uri={ipfs(data?.photo!)} rounded />
      <span className="my-2 font-semibold truncate">
        {request.claimer.name}
      </span>
      <div className="grid grid-cols-3">
        <ChainLogo className="w-4 h-4 self-center opacity-60" />
        <span className="text-slate-400">
          {shortenAddress(request.requester)}
        </span>
      </div>
    </div>
  );
};

export default Content;
