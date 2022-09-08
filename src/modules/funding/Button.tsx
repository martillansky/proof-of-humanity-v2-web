import { Zero } from "@ethersproject/constants";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useState } from "react";
import { RequestQueryItem } from "api/types";
import Field from "components/Field";
import Modal from "components/Modal";
import { useFundRequest } from "hooks/useProofOfHumanity";
import { formatEth } from "utils/misc";

interface FundButtonProps {
  totalCost?: BigNumber | null;
  funded: BigNumber;
  request: RequestQueryItem;
}

const FundButton: React.FC<FundButtonProps> = ({
  totalCost,
  funded,
  request,
}) => {
  const fundRequest = useFundRequest();
  const [funding, setFunding] = useState<number>(
    parseFloat(formatEther(totalCost ? totalCost.sub(funded) : Zero))
  );

  if (!totalCost || totalCost.eq(funded)) return null;

  return (
    <Modal
      formal
      header="Fund"
      trigger={<button className="btn-main mb-2">Fund request</button>}
    >
      <div className="p-4 flex flex-col">
        <div className="w-full p-4 flex justify-center rounded font-bold">
          {formatEth(totalCost.sub(funded))} Remaining ETH Deposit
        </div>
        <Field
          type="number"
          className="no-spinner"
          label="Amount funding"
          min={0}
          max={formatEther(totalCost.sub(funded).toNumber())}
          step={0.01}
          value={funding}
          onChange={(event) => setFunding(parseFloat(event.target.value))}
        />
        <button
          onClick={async () =>
            await fundRequest(request.requester, { value: totalCost })
          }
          className="btn-main mt-12"
        >
          Fund request
        </button>
      </div>
    </Modal>
  );
};

export default FundButton;
