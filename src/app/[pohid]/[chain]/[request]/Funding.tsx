import { useMemo } from "react";
import { useObservable } from "@legendapp/state/react";
import Field from "components/Field";
import Modal from "components/Modal";
import usePoHWrite from "contracts/hooks/usePoHWrite";
import { Hash, formatEther } from "viem";
import { useLoading } from "hooks/useLoading";

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
  const loading = useLoading();
  const [pending] = loading.use();
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
      trigger={
        <button disabled={pending} className="btn-main mb-2">
          Fund request
        </button>
      }
    >
      <div className="p-4 flex flex-col">
        <div className="w-full p-4 flex justify-center rounded font-bold">
          {formatEther(totalCost - funded)} Remaining ETH Deposit
        </div>
        <Field
          type="number"
          className="no-spinner"
          label="Amount funding"
          min={0}
          max={formatEther(totalCost - funded)}
          step={0.01}
          value={formatEther(addedFund)}
          onChange={(event) => addedFund$.set(BigInt(event.target.value))}
        />
        <button
          disabled={!!addedFund}
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
