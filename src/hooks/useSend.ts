import { TransactionReceipt } from "@ethersproject/providers";
import { Contract, ContractTransaction } from "ethers";
import { useCallback, useReducer } from "react";

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
): [(...params: Parameters<C[F]>) => Promise<void>, State] => {
  const [state, setState] = useReducer<StateReducer>(
    (s, a) => ({ ...s, ...a }),
    { status: "None", receipt: null, error: null }
  );

  const send = useCallback(
    async (...params: Parameters<C[F]>) => {
      try {
        if (!contract) return;

        setState({ status: "Pending", receipt: null, error: null });
        const transaction: ContractTransaction = await contract[method](
          ...params
        );
        setState({ status: "Mining" });
        const receipt = await transaction.wait();
        setState({ status: "Success", receipt });
        //   mutateKeys.forEach((key) => mutate(key));
      } catch (err) {
        console.error(err);

        setState({ status: "Error", error: err.message });
      }
    },
    [contract]
  );

  return [send, state];
};

export default useSend;
