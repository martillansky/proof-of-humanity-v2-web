"use client";

import InfoIcon from "icons/info.svg";
import Image from "next/image";
import Modal from "components/Modal";

interface InfoProps {
  nbRequests: number;
}

export default function Info({ nbRequests }: InfoProps) {
  return (
    <Modal
      formal
      className="p-8 flex flex-col"
      trigger={
        <span className="flex text-slate-500 cursor-pointer gap-x-[4px]">
          <InfoIcon className="w-6 h-6 stroke-slate-500 stroke-2" />
        </span>
      }
    >
      <Image
        alt="poh id"
        src="/logo/pohid.svg"
        className="mx-auto mb-8"
        height={128}
        width={128}
      />
      <p>
        The Proof of Humanity ID is a soulbound ID. It corresponds to each
        unique human registered on Proof of Humanity.
      </p>
      <p>
        This POH ID had <strong>{nbRequests} requests</strong> in total
      </p>
    </Modal>
  );
}
