import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import useKeepBlockDataLive from "./useKeepBlockDataLive";

const getETHBalance =
  (library: Web3Provider) => async (_: string, address: string) =>
    await library.getBalance(address);

const useETHBalance = (address: string, suspense = false) => {
  const { library, chainId } = useWeb3React();

  const shouldFetch = typeof address === "string" && !!library;

  const result = useSWR(
    shouldFetch ? ["ETHBalance", address, chainId] : null,
    getETHBalance(library),
    { suspense }
  );

  useKeepBlockDataLive(result.mutate);

  return result;
};

export default useETHBalance;
