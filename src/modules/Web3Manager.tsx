import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider, createWeb3ReactRoot } from "@web3-react/core";
import { ReactNode } from "react";
import { useConnect } from "hooks/useConnect";
import useWeb3 from "hooks/useWeb3";

const getLibrary = (provider: any): Web3Provider =>
  new Web3Provider(
    provider,
    typeof provider.chainId === "number"
      ? provider.chainId
      : typeof provider.chainId === "string"
      ? +provider.chainId
      : "any"
  );

const Web3ProviderNetwork = createWeb3ReactRoot("NETWORK");

const Web3Connect: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { tried, error } = useConnect();
  const { active } = useWeb3();

  if (!active && tried && error) return <div>Error occured</div>;

  return <>{children}</>;
};

const Web3Manager: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Web3ReactProvider getLibrary={getLibrary}>
    <Web3ProviderNetwork getLibrary={getLibrary}>
      <Web3Connect>{children}</Web3Connect>
    </Web3ProviderNetwork>
  </Web3ReactProvider>
);

export default Web3Manager;
