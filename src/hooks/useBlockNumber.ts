import type { Web3Provider } from "@ethersproject/providers";
import useSWR from "swr";
import useWeb3 from "./useWeb3";

const getBlockNumber = (library: Web3Provider) => async () =>
  library.getBlockNumber();

export default function useBlockNumber() {
  const { library } = useWeb3();

  const { data } = useSWR(
    !!library ? "block-number" : null,
    getBlockNumber(library!),
    { refreshInterval: 10 * 1000 }
  );

  return data;
}
