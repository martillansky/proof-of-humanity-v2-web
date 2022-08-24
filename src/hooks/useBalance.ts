import { Web3Provider } from "@ethersproject/providers";
import useSWR from "swr";
import useWeb3 from "./useWeb3";

const useBalance = () => {
  const { account, library } = useWeb3();
  const { data } = useSWR(
    account && library ? [library, account] : null,
    async (lib: Web3Provider, account: string) => await lib.getBalance(account)
  );

  return data;
};

export default useBalance;
