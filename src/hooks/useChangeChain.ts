import { useCallback } from "react";
import { CHAIN_SETTING, ChainId } from "constants/chains";
import useConnector from "./useConnector";
import useWeb3 from "./useWeb3";

const useChangeChain = () => {
  const { chainId, account } = useWeb3();
  const { connector } = useConnector();

  const changeChain = useCallback(
    async (desiredChainId?: ChainId) => {
      if (!desiredChainId || (account && desiredChainId === chainId))
        return false;
      await connector.activate(CHAIN_SETTING[desiredChainId]);
      return true;
    },
    [chainId]
  );

  return changeChain;
};

export default useChangeChain;
