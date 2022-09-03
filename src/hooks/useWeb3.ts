import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { Web3ReactContextInterface } from "@web3-react/core/dist/types";
import { SUPPORTED_CHAIN_IDS } from "constants/chains";

const useWeb3 = (network: boolean = false) => {
  if (network) return useWeb3React<JsonRpcProvider>("NETWORK");

  const web3 = useWeb3React<Web3Provider>();

  return {
    ...web3,
    active:
      web3.active && !!SUPPORTED_CHAIN_IDS.find((c) => c === web3.chainId),
  } as Web3ReactContextInterface<Web3Provider>;
};

export default useWeb3;
