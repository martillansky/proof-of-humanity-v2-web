import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { injected, network } from "utils/connectors";

export function useConnect() {
  const [tried, setTried] = useState(false);
  const { activate, active } = useWeb3React();
  const {
    active: networkActive,
    error: networkError,
    activate: activateNetwork,
  } = useWeb3React("NETWORK");

  const tryConnect = async () => {
    const isAuthorized = await injected.isAuthorized();
    if (isAuthorized) await activate(injected, undefined, true);
    setTried(true);
  };

  useEffect(() => {
    if (!active) tryConnect();
  }, [activate, active]);

  useEffect(() => {
    if (active) setTried(true);
  }, [active]);

  useEffect(() => {
    if (tried && !networkActive && !networkError && !active)
      activateNetwork(network);
  }, [tried, networkActive, networkError, activateNetwork, active]);

  return { tried, error: networkError };
}
