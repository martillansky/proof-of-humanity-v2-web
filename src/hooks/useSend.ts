import { TransactionReceipt } from "@ethersproject/providers";
import { Contract, ContractTransaction } from "ethers";
import { useCallback, useReducer } from "react";
import { toast } from "react-toastify";

interface State {
  status: "None" | "Pending" | "Mining" | "Success" | "Error";
  receipt?: TransactionReceipt | null;
  error?: string | null;
}

type StateReducer = (s: State, a: State) => State;

// type txEvents = {
//   onPending?: () => void;
//   onConfirm?: (tx?: ContractTransaction) => void;
//   onMined?: (receipt?: TransactionReceipt) => void;
//   onError?: () => void;
// };

const useSend = <C extends Contract, F extends keyof C["callStatic"]>(
  contract: C | null,
  method: F
  //TODO add keys to mutate after sending (use functions?)
  //   mutateKeys: any[][]
): [(...params: Parameters<C[F]>) => Promise<unknown>, State] => {
  const [state, setState] = useReducer<StateReducer>(
    (s, a) => ({ ...s, ...a }),
    { status: "None", receipt: null, error: null }
  );

  const send = useCallback(
    async (...params: Parameters<C[F]>) => {
      try {
        if (!contract) return;

        setState({ status: "Pending", receipt: null, error: null });
        toast.info("Sending transaction");
        // if (onPending) onPending();

        const transaction: ContractTransaction = await contract[method](
          ...params
        );

        setState({ status: "Mining" });
        toast.info("Mining transaction...");
        // if (onConfirm) onConfirm();

        const receipt = await transaction.wait();

        setState({ status: "Success", receipt });
        toast.success("Transaction mined");
        // if (onMined) onMined();
      } catch (err) {
        console.error({ err });
        setState({ status: "Error", error: err.message });
        toast.error("Transaction rejected");
        // if (onError) onError();
      }
    },
    [contract, method]
  );

  return [send, state];
};

export default useSend;
