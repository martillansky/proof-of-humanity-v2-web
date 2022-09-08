import useSWR from "swr";
import { ChainId, FALLBACK_CHAIN } from "constants/chains";
import { sdk } from ".";

const useContractData = (chain?: ChainId) =>
  useSWR(
    ["Contract"],
    async () => (await sdk[chain || FALLBACK_CHAIN]["Contract"]()).contract
  ).data;

export default useContractData;
