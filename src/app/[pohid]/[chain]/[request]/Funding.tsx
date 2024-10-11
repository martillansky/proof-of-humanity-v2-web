import { useMemo } from "react";
import { useObservable } from "@legendapp/state/react";
import Field from "components/Field";
import Modal from "components/Modal";
import usePoHWrite from "contracts/hooks/usePoHWrite";
import { Hash, formatEther, parseEther } from "viem";
import useChainParam from "hooks/useChainParam";
import { formatEth } from "utils/misc";

interface FundButtonProps {
  pohId: Hash;
  index: number;
  totalCost: bigint;
  funded: bigint;
}

const FundButton: React.FC<FundButtonProps> = ({
  pohId,
  index,
  totalCost,
  funded,
}) => {
  const chain = useChainParam()!;
  const addedFund$ = useObservable(0);
  const addedFund = addedFund$.use();
  const [prepare] = usePoHWrite(
    "fundRequest",
    useMemo(
      () => ({
        onReady(fire) {
          fire();
        },
      }),
      []
    )
  );

  return (
    <Modal
      formal
      header="Fund"
      trigger={<button className="btn-sec mb-2">Fund</button>}
    >
      <div className="p-4 flex flex-col">
        <div className="w-full p-4 flex justify-center rounded font-bold">
          <span
            onClick={() => addedFund$.set(formatEth(totalCost - funded))}
            className="mx-1 text-orange font-semibold underline underline-offset-2 cursor-pointer"
          >
            {formatEther(totalCost - funded)}
          </span>{" "}
          {chain.nativeCurrency.symbol} Needed
        </div>
        <Field
          type="number"
          className="no-spinner"
          label="Amount funding"
          step="any"
          min={0}
          max={formatEther(totalCost - funded)}
          value={addedFund}
          onChange={(e) => addedFund$.set(+e.target.value)}
        />
        <button
          disabled={!addedFund}
          onClick={() =>
            prepare({
              value: BigInt(parseEther(addedFund.toString())),
              args: [pohId, BigInt(index)],
            })
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
