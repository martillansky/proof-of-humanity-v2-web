import { Web3ReactProvider } from "@web3-react/core";
import { ReactNode } from "react";
import { injected, network } from "hooks/connectors";

const Web3Manager: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Web3ReactProvider
    connectors={[
      [injected.connector, injected.hooks],
      [network.connector, network.hooks],
    ]}
  >
    {children}
  </Web3ReactProvider>
);

export default Web3Manager;
