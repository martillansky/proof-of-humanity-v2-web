import cn from "classnames";
import Button from "components/Button";
import useWeb3 from "hooks/useWeb3";
import React, { useState } from "react";
import { useFormContext } from "./context";

interface ReviewProps {}

const Review: React.FC<ReviewProps> = () => {
  const { account } = useWeb3();
  const { previous } = useFormContext();
  const [crowdfunding, setCrowdfunding] = useState(false);
  const [selfFunded, setSelfFunded] = useState(0);

  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl font-bold my-8">
        Finalize your registration
      </span>
      <span>
        Verify your submission information and media is correct and submit the
        transaction to register.
      </span>

      <div className="w-full flex flex-col">
        <span className="font-bold">Name: gg</span>
        <span className="font-bold">Account:</span>
        <div className="px-4 py-2 border-2 border-orange rounded-full font-bold">
          {account}
        </div>
      </div>

      <span>Initial deposit</span>
      <div className="grid grid-cols-2">
        <button
          className={cn("p-2 border rounded-l text-xl", {
            "bg-slate-200": !crowdfunding,
          })}
          onClick={() => setCrowdfunding(false)}
        >
          Self fund: 0.125
        </button>
        <button
          className={cn("p-2 border rounded-r text-xl", {
            "bg-slate-200": !!crowdfunding,
          })}
          onClick={() => setCrowdfunding(true)}
        >
          Crowdfund
        </button>
      </div>

      {crowdfunding && (
        <input
          className="w-full p-2 border rounded"
          placeholder="0"
          value={selfFunded}
          onChange={(event) => setSelfFunded(parseInt(event.target.value))}
        />
      )}

      <span className="text-sm text-blue-500">
        The deposit is reimbursed after successful registration, and lost after
        failure. Any amount not contributed now can be put up by crowdfunders
        later.
      </span>

      <Button onClick={previous}>Previous</Button>
    </div>
  );
};

export default Review;
