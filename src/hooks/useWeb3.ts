import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { SUPPORTED_CHAIN_IDS } from "constants/chains";

const useWeb3 = () => {
  const web3 = useWeb3React<Web3Provider>();
  return web3
    ? {
        ...web3,
        active:
          web3.active && !!SUPPORTED_CHAIN_IDS.find((c) => c === web3.chainId),
      }
    : useWeb3React<Web3Provider>("NETWORK");
};

export default useWeb3;
