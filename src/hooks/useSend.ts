import { TransactionReceipt } from "@ethersproject/providers";
import { Contract, ContractTransaction } from "ethers";
import { useCallback } from "react";
import { toast } from "react-toastify";
import useChangeChain from "./useChangeChain";
import useSuggestedChain from "./useSuggestedChain";

interface TransactionEvents {
  withToast?: boolean;
  onPending?: () => void;
  onConfirm?: (tx?: ContractTransaction) => void;
  onMined?: (receipt?: TransactionReceipt) => void;
  onError?: () => void;
}

type SendFunc<C extends Contract, F extends keyof C["callStatic"]> = (
  ...params: Parameters<C[F]> | [...Parameters<C[F]>, ...[TransactionEvents]]
) => Promise<void>;

const useSend = <C extends Contract, F extends keyof C["callStatic"]>(
  contract: C | null,
  method: F
): SendFunc<C, F> => {
  const changeChain = useChangeChain();
  const suggestedChain = useSuggestedChain();

  const send = useCallback<SendFunc<C, F>>(
    async (...params) => {
      if (suggestedChain && (await changeChain(suggestedChain!))) return;

      const txEvents = params.at(-1) as TransactionEvents;
      const {
        withToast = true,
        onConfirm,
        onError,
        onMined,
        onPending,
      } = txEvents;
      try {
        if (!contract) return;

        onPending && onPending();
        withToast && toast.info("Sending transaction");

        const tx: ContractTransaction = await contract[method](...params);

        onConfirm && onConfirm(tx);
        withToast && toast.info("Mining transaction");

        const receipt = await tx.wait();

        onMined && onMined(receipt);
        withToast && toast.success("Transaction mined");
      } catch (err) {
        console.error(err);

        onError && onError();
        withToast && toast.error("Transaction rejected");
      }
    },
    [contract, method]
  );

  return send;
};

export default useSend;
