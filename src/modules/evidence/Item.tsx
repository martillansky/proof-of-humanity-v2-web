import { RequestQueryItem } from "api/types";
import AttachmentIcon from "assets/svg/AttachmentMajor.svg";
import ALink from "components/ALink";
import Identicon from "components/Identicon";
import TimeAgo from "components/TimeAgo";
import { ChainId } from "constants/chains";
import useIPFS from "hooks/useIPFS";
import { EvidenceFile } from "types/docs";
import { explorerLink, shortenAddress } from "utils/address";
import { ipfs } from "utils/ipfs";
import { romanize } from "utils/misc";

interface EvidenceItemInterface {
  index: number;
  chainId: ChainId;
  evidence: ArrayElement<RequestQueryItem["evidence"]>;
}

const EvidenceItem: React.FC<EvidenceItemInterface> = ({
  index,
  chainId,
  evidence,
}) => {
  const [evidenceFile] = useIPFS<EvidenceFile>(evidence.URI);

  return (
    <div className="mt-4 flex flex-col">
      <div className="relative px-8 py-4 bg-white border shadow-sm rounded-sm">
        <span className="absolute left-3 text-sm text-slate-500">
          {romanize(index + 1)}
        </span>
        <div className="flex justify-between text-xl font-bold">
          {evidenceFile?.name}
          {evidenceFile?.fileURI && (
            <ALink href={ipfs(evidenceFile?.fileURI)}>
              <AttachmentIcon className="fill-black w-6" />
            </ALink>
          )}
        </div>
        <p>{evidenceFile?.description}</p>
      </div>
      <div className="px-4 py-2 flex items-center">
        <Identicon diameter={32} address={evidence.sender} />
        <div className="pl-2 flex flex-col">
          <span>
            submitted by{" "}
            <ALink
              className="text-blue-500 underline underline-offset-2"
              href={explorerLink(evidence.sender, chainId)}
            >
              {shortenAddress(evidence.sender)}
            </ALink>
          </span>
          <TimeAgo time={evidence.creationTime} />
        </div>
      </div>
    </div>
  );
};

export default EvidenceItem;
