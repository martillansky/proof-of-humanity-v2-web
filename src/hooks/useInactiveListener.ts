import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { injected } from "utils/connectors";

export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3React();

  useEffect(() => {
    const ethereum = window.ethereum;
    if (!ethereum || !ethereum.on || active || error || suppress) return;

    const handleChainChanged = async () => {
      try {
        await activate(injected, undefined, true);
      } catch (err) {
        console.error("Failed to activate after chain changed", err);
      }
    };

    const handleAccountsChanged = async (accounts: string[]) => {
      if (!accounts.length) return;
      try {
        activate(injected, undefined, true);
      } catch (err) {
        console.error("Failed to activate after accounts changed", err);
      }
    };

    ethereum.on("chainChanged", handleChainChanged);
    ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      if (!ethereum.removeListener) return;
      ethereum.removeListener("chainChanged", handleChainChanged);
      ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, [active, error, suppress, activate]);
}

export default useInactiveListener;
