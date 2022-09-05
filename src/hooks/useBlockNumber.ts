import type { Web3Provider } from "@ethersproject/providers";
import useSWR from "swr";
import useWeb3 from "./useWeb3";

const getBlockNumber = (provider: Web3Provider) => async () =>
  provider.getBlockNumber();

export default function useBlockNumber() {
  const { provider } = useWeb3();

  const { data } = useSWR(
    !!provider ? "block-number" : null,
    getBlockNumber(provider!),
    { refreshInterval: 10 * 1000 }
  );

  return data;
}
