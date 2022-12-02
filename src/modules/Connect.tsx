import { Connector } from "@web3-react/types";
import { useCallback, useEffect } from "react";
import { IS_MOBILE } from "constants/media";
import useConnector from "hooks/useConnector";
import useSuggestedChain from "hooks/useSuggestedChain";
import useWeb3 from "hooks/useWeb3";
import { getIsMetaMask, injected, network } from "utils/connectors";

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
  const { connector } = useConnector();
  const { chainId: clientChainId } = useWeb3();

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

    if (IS_MOBILE && getIsMetaMask()) connect(injected.connector);
    else connect(connector);
  }, []);

  useEffect(() => {
    if (suggestedChainId) syncChain(suggestedChainId);
    else if (clientChainId) syncChain(clientChainId);
  }, [suggestedChainId, clientChainId, chainId]);

  return null;
};

export default Connect;
