import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

const useWeb3 = () =>
  useWeb3React<Web3Provider>(
    useWeb3React<Web3Provider>().active ? undefined : "NETWORK"
  );

export default useWeb3;
