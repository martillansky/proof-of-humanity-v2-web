import React from "react";
import ProofOfHumanityLogo from "../../assets/svg/ProofOfHumanityLogo.svg";

const Soul: React.FC = () => (
  <div className="relative mx-auto px-8 my-32 pb-8 w-1/5 flex flex-col justify-center items-center border rounded shadow over">
    <div className="absolute -top-16 w-32 h-32 px-6 pt-5 rounded-full border-2 bg-white shadow">
      <ProofOfHumanityLogo />
    </div>
    <div className="w-full flex flex-col items-center">
      <div className="mt-20">
        Soul ID: <strong>3223843278462</strong>
      </div>
      <div className="mb-8">Claimed</div>
      <button
        className="self-end
                   text-white font-bold
                   px-4 py-2 rounded-full
                   bg-gradient-to-r from-[#FF7A4E] via-[#FF7A4E] to-[#FF809F]"
      >
        Claim this soul
      </button>
    </div>
  </div>
);

export default Soul;
