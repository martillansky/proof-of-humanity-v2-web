import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

function useWeb3() {
  const interfaceContext = useWeb3React<Web3Provider>();

  return interfaceContext.active
    ? interfaceContext
    : useWeb3React<Web3Provider>("NETWORK");
}

export default useWeb3;
