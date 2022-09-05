import { Connector } from "@web3-react/types";
import { useCallback, useEffect } from "react";
import { injected, network } from "./connectors";
import useSuggestedChain from "./useSuggestedChain";

const connect = async (connector: Connector) => {
  try {
    if (connector.connectEagerly) return await connector.connectEagerly();
    await connector.activate();
  } catch (err) {
    console.debug(`web3 connection error: ${err}`);
  }
};

const { useChainId } = network.hooks;

const useConnect = () => {
  const suggestedChainId = useSuggestedChain();
  const chainId = useChainId();

  const syncChain = useCallback(
    async (desiredChainId: number) => {
      if (desiredChainId === chainId) return;
      try {
        await network.connector.activate(desiredChainId);
      } catch (err) {
        console.debug(err);
      }
    },
    [suggestedChainId]
  );

  useEffect(() => {
    connect(network.connector);
    connect(injected.connector);
  }, []);

  useEffect(() => {
    if (!suggestedChainId) return;
    syncChain(suggestedChainId);
  }, [suggestedChainId, chainId]);
};

export default useConnect;
