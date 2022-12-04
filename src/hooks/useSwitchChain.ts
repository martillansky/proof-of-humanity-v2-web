import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ChainId } from "enums/ChainId";
import { RPCMethod } from "enums/RpcMethod";
import { Web3ErrorCode } from "enums/Web3ErrorCode";
import { useCallback } from "react";
import { CHAIN_SETTING } from "constants/chains";
import { NetworkContextName } from "constants/misc";

const useSwitchChain = (forNetwork = false) => {
  const { chainId, library } = useWeb3React<Web3Provider>(
    forNetwork ? NetworkContextName : undefined
  );

  const switchChain = useCallback(
    async (targetChain: ChainId) => {
      if (!library || !library?.provider) throw new Error("Provider error");
      if (chainId === targetChain) return false;

      const { provider } = library;
      if (!provider.request)
        throw new Error("Provider can't request changing chain");

      try {
        await provider.request({
          method: RPCMethod.SWITCH_CHAIN,
          params: [{ chainId: CHAIN_SETTING[targetChain].chainId }],
        });

        return true;
      } catch (error) {
        if (error.code !== Web3ErrorCode.CHAIN_NOT_ADDED) throw error;

        await provider.request({
          method: RPCMethod.ADD_CHAIN,
          params: [CHAIN_SETTING[targetChain]],
        });

        try {
          await provider.request({
            method: RPCMethod.SWITCH_CHAIN,
            params: [{ chainId: CHAIN_SETTING[targetChain].chainId }],
          });
        } catch (error) {
          console.error("Added network but could not switch chains", error);
          throw error;
        }

        return true;
      }
    },
    [library]
  );

  return switchChain;
};

export default useSwitchChain;
