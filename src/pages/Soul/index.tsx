import React from "react";
import ProofOfHumanityLogo from "../../assets/svg/ProofOfHumanityLogo.svg";

const Soul: React.FC = () => (
  <div className="relative bordered mx-auto my-32 w-1/5">
    <div className="px-8 pb-8 flex flex-col justify-center items-center border rounded bg-white shadow over">
      <div className="bordered absolute -top-16 w-32 h-32 rounded-full">
        <div className="w-full h-full px-6 pt-5 rounded-full bg-white shadow">
          <ProofOfHumanityLogo />
        </div>
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
  </div>
);

export default Soul;
