import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { hexValue } from "ethers/lib/utils";
import { useCallback } from "react";
import { CHAIN_SETTING } from "constants/chains";
import { RPCMethod, Web3ErrorCode } from "constants/web3";

const useChangeChain = () => {
  const { library } = useWeb3React<Web3Provider>();

  return useCallback(
    (desiredChainId: number) => {
      if (!library) return;

      try {
        library.send(RPCMethod.SWITCH_CHAIN, [
          { chainId: hexValue(desiredChainId) },
        ]);
      } catch (err) {
        if (err && err.code === Web3ErrorCode.CHAIN_NOT_ADDED)
          library.send(RPCMethod.ADD_CHAIN, [CHAIN_SETTING[desiredChainId]]);
      }
    },
    [library]
  );
};

export default useChangeChain;
