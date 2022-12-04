import useSWR from "swr";
import useKeepBlockDataLive from "./useKeepBlockDataLive";
import useWeb3 from "./useWeb3";

const useBalance = (suspense = false) => {
  const { account, library, chainId } = useWeb3();

  const result = useSWR(
    account && !!library ? ["ETHBalance", account, chainId] : null,
    async (_: string, address: string) => await library!.getBalance(address),
    { suspense }
  );

  useKeepBlockDataLive(result.mutate);

  return result.data;
};

export default useBalance;
