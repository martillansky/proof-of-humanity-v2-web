import { useMemo } from "react";
import { useObservable } from "@legendapp/state/react";
import Field from "components/Field";
import Modal from "components/Modal";
import usePoHWrite from "contracts/hooks/usePoHWrite";
import { Hash, formatEther, parseEther } from "viem";
import useChainParam from "hooks/useChainParam";

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
  const addedFund$ = useObservable(0n);
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
      trigger={<button className="btn-main mb-2">Fund</button>}
    >
      <div className="p-4 flex flex-col">
        <div className="w-full p-4 flex justify-center rounded font-bold">
          <span
            onClick={() => addedFund$.set(totalCost - funded)}
            className="mx-1 text-theme font-semibold underline underline-offset-2 cursor-pointer"
          >
            {formatEther(totalCost - funded)}
          </span>{" "}
          {chain.nativeCurrency.symbol} Needed
        </div>
        <Field
          type="number"
          className="no-spinner"
          label="Amount funding"
          min={0}
          max={formatEther(totalCost - funded)}
          value={formatEther(addedFund)}
          onChange={(event) => addedFund$.set(parseEther(event.target.value))}
        />
        <button
          disabled={!addedFund}
          onClick={() =>
            prepare({ value: addedFund, args: [pohId, BigInt(index)] })
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
