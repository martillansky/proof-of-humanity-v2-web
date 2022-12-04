import { hexValue } from "@ethersproject/bytes";
import { ChainId } from "enums/ChainId";
import TestnetLogo from "../assets/svg/SandboxMajor.svg";
import EthereumLogo from "../assets/svg/ethereum.svg";
import GnosisLogo from "../assets/svg/gnosis.svg";

const INFURA_KEY = process.env.INFURA_KEY;

export const RPC: { [key in ChainId]: string } = {
  [ChainId.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  [ChainId.GOERLI]: `https://goerli.infura.io/v3/${INFURA_KEY}`,
  [ChainId.OPGOERLI]: "https://goerli.optimism.io",
  [ChainId.GNOSIS]: "https://rpc.gnosischain.com/",
};

interface AddEthereumChainCurrency {
  name: string;
  symbol: string;
  decimals: number;
}

interface AddEthereumChain {
  chainId: string;
  chainName: string;
  nativeCurrency: AddEthereumChainCurrency;
  rpcUrls: string[];
  blockExplorerUrls: string[];
}

const ETH: AddEthereumChainCurrency = {
  name: "Ether",
  symbol: "ETH",
  decimals: 18,
};

const xDAI: AddEthereumChainCurrency = {
  name: "Ether",
  symbol: "ETH",
  decimals: 18,
};

export const CHAIN = {
  [ChainId.MAINNET]: {
    NAME: "Mainnet",
    Logo: EthereumLogo,
    RPC: RPC[ChainId.MAINNET],
    EXPLORER: "https://etherscan.io",
    CURRENCY: ETH,
  },
  [ChainId.GOERLI]: {
    NAME: "Goerli",
    Logo: TestnetLogo,
    RPC: RPC[ChainId.GOERLI],
    EXPLORER: "https://goerli.etherscan.io",
    CURRENCY: ETH,
  },
  [ChainId.OPGOERLI]: {
    NAME: "OpGoerli",
    Logo: TestnetLogo,
    RPC: RPC[ChainId.OPGOERLI],
    EXPLORER: "https://goerli-optimism.etherscan.io",
    CURRENCY: ETH,
  },
  [ChainId.GNOSIS]: {
    NAME: "Gnosis",
    Logo: GnosisLogo,
    RPC: RPC[ChainId.GNOSIS],
    EXPLORER: "https://gnosisscan.io",
    CURRENCY: xDAI,
  },
} as const;

export const chainSetting = (chain: ChainId) =>
  ({
    [chain]: {
      chainId: hexValue(chain),
      chainName: CHAIN[chain].NAME,
      nativeCurrency: CHAIN[chain].CURRENCY,
      rpcUrls: [CHAIN[chain].RPC],
      blockExplorerUrls: [CHAIN[chain].EXPLORER],
    },
  } as Record<ChainId, AddEthereumChain>);

export const CHAIN_SETTING = {
  ...chainSetting(ChainId.MAINNET),
  ...chainSetting(ChainId.GOERLI),
  ...chainSetting(ChainId.OPGOERLI),
  ...chainSetting(ChainId.GNOSIS),
};

export const FALLBACK_CHAIN = ChainId.GOERLI;

export const supportedChainIds = [ChainId.GOERLI, ChainId.OPGOERLI];

export const VDB_CHAIN = ChainId.GOERLI;
