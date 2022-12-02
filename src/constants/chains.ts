import { AddEthereumChainParameter } from "@web3-react/types";
import TestnetLogo from "../assets/svg/SandboxMajor.svg";
import EthereumLogo from "../assets/svg/ethereum.svg";
import GnosisLogo from "../assets/svg/gnosis.svg";

export enum ChainId {
  MAINNET = 1,
  GOERLI = 5,
  OPGOERLI = 420,
  GNOSIS = 100,
}

const INFURA_KEY = process.env.INFURA_KEY;

export const RPC_ENDPOINT: { [key in ChainId]: string } = {
  [ChainId.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  [ChainId.GOERLI]: `https://goerli.infura.io/v3/${INFURA_KEY}`,
  [ChainId.OPGOERLI]: "https://goerli.optimism.io",
  [ChainId.GNOSIS]: "https://rpc.gnosischain.com/",
};

const ETH: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Ether",
  symbol: "ETH",
  decimals: 18,
};

const xDAI: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Ether",
  symbol: "ETH",
  decimals: 18,
};

export const CHAIN = {
  [ChainId.MAINNET]: {
    NAME: "Mainnet",
    Logo: EthereumLogo,
    RPC: RPC_ENDPOINT[ChainId.MAINNET],
    EXPLORER: "https://etherscan.io",
    CURRENCY: ETH,
  },
  [ChainId.GOERLI]: {
    NAME: "Goerli",
    Logo: TestnetLogo,
    RPC: RPC_ENDPOINT[ChainId.GOERLI],
    EXPLORER: "https://goerli.etherscan.io",
    CURRENCY: ETH,
  },
  [ChainId.OPGOERLI]: {
    NAME: "OpGoerli",
    Logo: TestnetLogo,
    RPC: RPC_ENDPOINT[ChainId.OPGOERLI],
    EXPLORER: "https://goerli-optimism.etherscan.io",
    CURRENCY: ETH,
  },
  [ChainId.GNOSIS]: {
    NAME: "Gnosis",
    Logo: GnosisLogo,
    RPC: RPC_ENDPOINT[ChainId.GNOSIS],
    EXPLORER: "https://gnosisscan.io",
    CURRENCY: xDAI,
  },
} as const;

export const chainSetting = (chain: ChainId) =>
  ({
    [chain]: {
      chainId: chain,
      chainName: CHAIN[chain].NAME,
      nativeCurrency: CHAIN[chain].CURRENCY,
      rpcUrls: [CHAIN[chain].RPC],
      blockExplorerUrls: [CHAIN[chain].EXPLORER],
    },
  } as Record<ChainId, AddEthereumChainParameter>);

export const CHAIN_SETTING = {
  ...chainSetting(ChainId.MAINNET),
  ...chainSetting(ChainId.GOERLI),
  ...chainSetting(ChainId.OPGOERLI),
  ...chainSetting(ChainId.GNOSIS),
};

export const FALLBACK_CHAIN = ChainId.GOERLI;

export const SUPPORTED_CHAIN_IDS = [
  ChainId.GOERLI,
  ChainId.OPGOERLI,
  // ChainId.GNOSIS,
];

export const VDB_CHAIN = ChainId.GOERLI;
