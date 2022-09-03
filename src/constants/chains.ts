import { chainSetting } from "utils/misc";
import TestnetLogo from "../assets/svg/SandboxMajor.svg";
import EthereumLogo from "../assets/svg/ethereum.svg";
import GnosisLogo from "../assets/svg/gnosis.svg";

export enum ChainId {
  MAINNET = 1,
  RINKEBY = 4,
  GNOSIS = 100,
}

const INFURA_KEY = process.env.INFURA_KEY;

export const RPC_ENDPOINT: { [key in ChainId]: string } = {
  [ChainId.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  [ChainId.RINKEBY]: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
  [ChainId.GNOSIS]: "https://rpc.gnosischain.com/",
};

export const CHAIN = {
  [ChainId.MAINNET]: {
    NAME: "Mainnet",
    Logo: EthereumLogo,
    RPC: RPC_ENDPOINT[ChainId.MAINNET],
    EXPLORER: "https://etherscan.io",
    CURRENCY: "ETH",
  },
  [ChainId.RINKEBY]: {
    NAME: "Rinkeby",
    Logo: TestnetLogo,
    RPC: RPC_ENDPOINT[ChainId.RINKEBY],
    EXPLORER: "https://rinkeby.etherscan.io",
    CURRENCY: "ETH",
  },
  [ChainId.GNOSIS]: {
    NAME: "Gnosis",
    Logo: GnosisLogo,
    RPC: RPC_ENDPOINT[ChainId.GNOSIS],
    EXPLORER: "https://gnosisscan.io",
    CURRENCY: "xDAI",
  },
} as const;

export const CHAIN_ID_TO_NAME: { [key in ChainId]: string } = {
  [ChainId.MAINNET]: "Mainnet",
  [ChainId.RINKEBY]: "Rinkeby",
  [ChainId.GNOSIS]: "Gnosis",
};

export const CHAIN_SETTING = {
  ...chainSetting(ChainId.MAINNET),
  ...chainSetting(ChainId.RINKEBY),
  ...chainSetting(ChainId.GNOSIS),
};

export const FALLBACK_CHAIN = ChainId.RINKEBY;

export const SUPPORTED_CHAIN_IDS = [
  ChainId.RINKEBY,
  // ChainId.MAINNET
];
