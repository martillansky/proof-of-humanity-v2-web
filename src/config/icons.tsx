import { SVGProps } from "react";
import { mainnet, sepolia, gnosis } from "viem/chains";
import MainnetIcon from "icons/mainnet.svg";
import TestnetIcon from "icons/testnet.svg";
import GnosisIcon from "icons/gnosis.svg";

export function getChainLogo(id: number): React.FC<SVGProps<any>> {
  switch (id) {
    case mainnet.id:
      return MainnetIcon;
    case sepolia.id:
      return TestnetIcon;
    case gnosis.id:
      return GnosisIcon;
    default:
      throw new Error("chain not supported");
  }
}
