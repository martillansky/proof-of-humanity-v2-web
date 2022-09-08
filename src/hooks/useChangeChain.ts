import { useCallback } from "react";
import { CHAIN_SETTING, ChainId } from "constants/chains";
import { isNetwork } from "utils/connectors";
import useWeb3 from "./useWeb3";

const useChangeChain = () => {
  const { chainId, account, connector } = useWeb3();

  const changeChain = useCallback(
    async (desiredChainId?: ChainId) => {
      if (isNetwork(connector)) throw new Error("Got network as connector");
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
