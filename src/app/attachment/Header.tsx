import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Header: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-2">
        <Image
          src="/logo/paperclip.svg"
          alt="Paperclip Icon"
          className="w-6 h-6 text-purple-500"
          width={24}
          height={24}
        />
        <h1 className="text-lg md:text-xl font-semibold">File</h1>
      </div>
      <button
        onClick={() => router.back()}
        className="flex items-center text-blue-500"
      >
        <Image
          src="/logo/arrow-left.svg"
          alt="Arrow Icon"
          className="mr-2 w-4 h-4"
          width={16}
          height={16}
        />
        Return
      </button>
    </div>
  );
};

export default Header;
