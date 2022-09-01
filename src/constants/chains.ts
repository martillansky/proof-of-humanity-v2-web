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

export const RPC_ENDPOINTS: { [key in ChainId]: string } = {
  [ChainId.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  [ChainId.RINKEBY]: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
  [ChainId.GNOSIS]: `https://rpc.gnosischain.com/`,
};

export const CHAIN_ID_TO_NAME: { [key in ChainId]: string } = {
  [ChainId.MAINNET]: "Mainnet",
  [ChainId.RINKEBY]: "Rinkeby",
  [ChainId.GNOSIS]: "Gnosis",
};

export const CHAIN_LOGO: {
  [key in ChainId]: React.FC<React.SVGAttributes<SVGElement>>;
} = {
  [ChainId.MAINNET]: EthereumLogo,
  [ChainId.RINKEBY]: TestnetLogo,
  [ChainId.GNOSIS]: GnosisLogo,
};

export const EXPLORER_URL: { [key in ChainId]: string } = {
  [ChainId.MAINNET]: "https://etherscan.io",
  [ChainId.RINKEBY]: "https://rinkeby.etherscan.io",
  [ChainId.GNOSIS]: "https://gnosisscan.io",
};

export const NATIVE_CURRENCY: { [key in ChainId]: string } = {
  [ChainId.MAINNET]: "ETH",
  [ChainId.RINKEBY]: "ETH",
  [ChainId.GNOSIS]: "xDAI",
};

export const CHAIN_SETTING = {
  ...chainSetting(ChainId.MAINNET),
  ...chainSetting(ChainId.RINKEBY),
  ...chainSetting(ChainId.GNOSIS),
};

export const FALLBACK_CHAIN = ChainId.RINKEBY;

export const SUPPORTED_CHAIN_IDS = [ChainId.RINKEBY, ChainId.MAINNET];
