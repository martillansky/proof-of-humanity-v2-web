import type { Web3Provider } from "@ethersproject/providers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CHAIN_SETTING, ChainId } from "constants/chains";
import { ConnectionMapping, ConnectionType } from "utils/connectors";
import useConnector from "./useConnector";

// import type { Web3Provider } from "@ethersproject/providers";
// import { useCallback, useEffect, useMemo, useState } from "react";
// import { CHAIN_SETTING, ChainId } from "constants/chains";
// import { ConnectionMapping, ConnectionType } from "utils/connectors";
// import useConnector from "./useConnector";

// const {
//   useChainId,
//   useAccounts,
//   useIsActivating,
//   useIsActive,
//   useProvider,
//   useENSNames,
// } = ConnectionMapping["INJECTED"].hooks;

// const useWeb3 = () => {
//   const chainId = useChainId();
//   const accounts = useAccounts();
//   const isActivating = useIsActivating();

//   const isActive = useIsActive();

//   const provider = useProvider();
//   const ENSNames = useENSNames(provider);

//   const [error, setError] = useState(undefined);

//   // attempt to connect eagerly on mount
//   useEffect(() => {
//     void metaMask.connectEagerly().catch(() => {
//       console.debug("Failed to connect eagerly to metamask");
//     });
//   }, []);

//   const disconnect = () => {
//     if (connector && connector.deactivate) connector.deactivate();
//     connector.resetState();
//     setConnectionType("");
//     setWeb3State(defaultWeb3State);
//   };
//   return { ...web3State, changeChain, disconnect };
// };

// export default useWeb3;

interface Web3State {
  isActive: boolean;
  chainId: number | undefined;
  account: string | undefined;
  provider: Web3Provider | undefined;
}

const defaultWeb3State: Web3State = {
  chainId: undefined,
  account: undefined,
  isActive: false,
  provider: undefined,
};

const useConnectorData = (connectionType: ConnectionType): Web3State => {
  const { useIsActive, useProvider, useChainId, useAccount } =
    ConnectionMapping[connectionType].hooks;

  const provider = useProvider();
  const isActive = useIsActive();
  const chainId = useChainId();
  const account = useAccount();

  return useMemo(
    () => ({ provider, isActive, chainId, account }),
    [provider, isActive, chainId, account]
  );
};

const useWeb3 = () => {
  const { connector, connectionType, setConnectionType } = useConnector();

  const injectedData = useConnectorData(ConnectionType.INJECTED);
  const walConData = useConnectorData(ConnectionType.WALLET_CONNECT);

  const [web3State, setWeb3State] = useState<Web3State>(defaultWeb3State);

  useEffect(() => {
    switch (connectionType) {
      case ConnectionType.INJECTED:
        return setWeb3State(injectedData);
      case ConnectionType.WALLET_CONNECT:
        return setWeb3State(walConData);
      default:
        return;
    }
  }, [injectedData, walConData]);

  const changeChain = useCallback(
    async (desiredChainId?: ChainId) => {
      if (
        !desiredChainId ||
        (web3State.account && desiredChainId === web3State.chainId)
      )
        return false;
      await connector.activate(CHAIN_SETTING[desiredChainId]);
      return true;
    },
    [web3State.chainId]
  );

  const disconnect = () => {
    if (connector && connector.deactivate) connector.deactivate();
    connector.resetState();
    setConnectionType("");
    setWeb3State(defaultWeb3State);
  };

  return { ...web3State, changeChain, disconnect };
};

export default useWeb3;
