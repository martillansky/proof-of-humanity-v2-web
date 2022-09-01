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
        console.log({ contract, state });
        if (!contract) return;

        setState({ status: "Pending", receipt: null, error: null });
        toast.info("Sending transaction");

        const transaction: ContractTransaction = await contract[method](
          ...params
        );

        setState({ status: "Mining" });
        toast.info("Mining transaction...");

        const receipt = await transaction.wait();

        setState({ status: "Success", receipt });
        toast.success("Transaction mined");
      } catch (err) {
        console.error({ err });
        setState({ status: "Error", error: err.message });
        toast.error("Transaction rejected");
      }
    },
    [contract, method]
  );

  return [send, state];
};

export default useSend;
