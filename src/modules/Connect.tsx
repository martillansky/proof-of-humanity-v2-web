import { Connector } from "@web3-react/types";
import { useCallback, useEffect } from "react";
import useSuggestedChain from "hooks/useSuggestedChain";
import { injected, network } from "utils/connectors";

const connect = async (connector: Connector) => {
  try {
    if (connector.connectEagerly) return await connector.connectEagerly();
    await connector.activate();
  } catch (err) {
    console.debug(`web3 connection error: ${err}`);
  }
};

const { useChainId } = network.hooks;

const Connect = () => {
  const chainId = useChainId();
  const suggestedChainId = useSuggestedChain();

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

  return null;
};

export default Connect;
