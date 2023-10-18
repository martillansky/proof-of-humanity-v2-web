"use client";

import { ipfs } from "utils/ipfs";
import ExternalLink from "./ExternalLink";
import AttachmentIcon from "icons/AttachmentMajor.svg";

interface AttachmentProps {
  uri: string;
}

const Attachment: React.FC<AttachmentProps> = ({ uri }) => {
  return (
    <ExternalLink href={ipfs(uri)}>
      <AttachmentIcon className="w-4 h-4 fill-black" />
    </ExternalLink>
  );
};

export default Attachment;
