import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { NetworkContextName } from "constants/misc";

const useWeb3 = (network: boolean = false) =>
  useWeb3React<Web3Provider>(network ? NetworkContextName : undefined);

export default useWeb3;
