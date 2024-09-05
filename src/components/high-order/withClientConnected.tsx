import { Web3Modal } from "@web3modal/react";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
//import { supportedChains} from "config/chains";
import { useEffect } from "react";
import mainConfig from "mainConfig";

/* const projectId = "9185f693b1bc3d1d3440300c1559a202";

var { publicClient } = configureChains(supportedChains as any, [
  w3mProvider({ projectId }),
]);

var wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains: supportedChains }),
  publicClient,
});

var ethereumClient = new EthereumClient(wagmiConfig, supportedChains);


export function handleUpdateWagmi() {
  
    ({ publicClient } = configureChains(supportedChains as any, [
      w3mProvider({ projectId }),
    ]));

    wagmiConfig = createConfig({
      autoConnect: true,
      connectors: w3mConnectors({ projectId, chains: supportedChains }),
      publicClient,
    });

    ethereumClient = new EthereumClient(wagmiConfig, supportedChains);

}
 */
export default function withClientConnected<T extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<T>
) {
  return function (props: T) {
    const supportedChains = mainConfig().configGlobal.supportedChains;
    console.log("SUPPPP >>> ", supportedChains)
    const projectId = "9185f693b1bc3d1d3440300c1559a202";
    //const configGlobal = mainConfig.
    const { publicClient } = configureChains(supportedChains as any, [
      w3mProvider({ projectId }),
    ]);

    var wagmiConfig = createConfig({
      autoConnect: true,
      connectors: w3mConnectors({ projectId, chains: supportedChains }),
      publicClient,
    });

    const ethereumClient = new EthereumClient(wagmiConfig, supportedChains);

    /* useEffect(() => {
      wagmiConfig = createConfig({
        autoConnect: true,
        connectors: w3mConnectors({ projectId, chains: supportedChains }),
        publicClient,
      });
    }, []); */

    return (
      <>
        <WagmiConfig config={wagmiConfig}>
          <Component {...props} />
        </WagmiConfig>
        <Web3Modal
          themeMode="light"
          projectId={projectId}
          ethereumClient={ethereumClient}
        />
      </>
    );
  };
}
