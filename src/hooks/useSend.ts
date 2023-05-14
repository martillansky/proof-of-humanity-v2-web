import { TransactionReceipt } from "@ethersproject/providers";
import { ChainId } from "enums/ChainId";
import { Contract, ContractTransaction } from "ethers";
import { useCallback } from "react";
import { toast } from "react-toastify";
import useSuggestedChain from "./useSuggestedChain";
import useSwitchChain from "./useSwitchChain";

interface TransactionEvents {
  withToast?: boolean;
  onPending?: () => void;
  onConfirm?: (tx?: ContractTransaction) => void;
  onSuccess?: (receipt?: TransactionReceipt) => void;
  onError?: () => void;
  chain?: ChainId;
}

type SendFunc<C extends Contract, F extends keyof C["callStatic"]> = (
  ...params: Parameters<C[F]> | [...Parameters<C[F]>, ...[TransactionEvents]]
) => Promise<void>;

const useSend = <C extends Contract, F extends keyof C["callStatic"]>(
  contract: C | null,
  method: F
): SendFunc<C, F> => {
  const switchChain = useSwitchChain();
  const suggestedChain = useSuggestedChain();

  const send = useCallback<SendFunc<C, F>>(
    async (...params) => {
      console.log({ contract, method, params });
      // TODO fix for when there is no txEvents
      const txEvents = params.at(-1) as TransactionEvents | undefined;
      let {
        chain,
        withToast = true,
        onConfirm,
        onError,
        onSuccess,
        onPending,
      } = txEvents || {};

      if (!chain) {
        chain = suggestedChain!;
        if (withToast) {
          if (onConfirm || onError || onSuccess || onPending)
            params = params.slice(0, -1) as any;
        } else params = params.slice(0, -1) as any;
      } else params = params.slice(0, -1) as any;

      try {
        if (!contract) return;

        if (await switchChain(chain)) return;

        onPending && onPending();
        withToast && toast.info("Sending transaction");

        const tx: ContractTransaction = await contract[method](...params);

        onConfirm && onConfirm(tx);
        withToast && toast.info("Transaction pending");

        const receipt = await tx.wait();

        onSuccess && onSuccess(receipt);
        withToast && toast.success("Transaction succeeded");
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
