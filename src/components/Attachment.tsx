import Image from "next/image";
import Link from "next/link";
import { ipfs } from "utils/ipfs";

interface AttachmentProps {
  uri: string;
}

const Attachment: React.FC<AttachmentProps> = ({ uri }) => {
  const ipfsUri = ipfs(uri);

  return (
    <Link href={`/attachment?url=${encodeURIComponent(ipfsUri)}`}>
      <Image
        src="/icons/attachment.svg"
        alt="Attachment Icon"
        className="w-4 h-4"
        width={16}
        height={16}
      />
    </Link>
  );
};

export default Attachment;
