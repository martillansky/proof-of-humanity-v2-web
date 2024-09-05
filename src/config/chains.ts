import { ChainSet, configSetSelection } from "contracts";
import { mainnet, gnosis, sepolia, gnosisChiado } from "viem/chains";
import { 
  supportedChains as supportedChainsMain, 
  legacyChain as legacyChainMain, 
  nameToChain as nameToChainMain, 
  idToChain as idToChainMain,
  getForeignChain as getForeignChainMain 
} from "./chains.mainnets";
import { supportedChains as supportedChainsTest, 
  legacyChain as legacyChainTest, 
  nameToChain as nameToChainTest, 
  idToChain as idToChainTest,
  getForeignChain as getForeignChainTest 
} from "./chains.testnets";

export var supportedChains = (configSetSelection.chainSet === ChainSet.MAINNETS? supportedChainsMain : supportedChainsTest);
export var defaultChain = supportedChains[0];

export var legacyChain = (configSetSelection.chainSet === ChainSet.MAINNETS? legacyChainMain : legacyChainTest);

export const handleUpdateChains = (configSetSelection:any) => {
  supportedChains = (configSetSelection.chainSet === ChainSet.MAINNETS? supportedChainsMain : supportedChainsTest);
  defaultChain = supportedChains[0];
  
  legacyChain = (configSetSelection.chainSet === ChainSet.MAINNETS? legacyChainMain : legacyChainTest);
  
}

export type SupportedChain = ArrayElement<typeof supportedChains>;
export type SupportedChainId = SupportedChain["id"];

export function nameToChain(name: string): SupportedChain | null {
  return (configSetSelection.chainSet === ChainSet.MAINNETS? nameToChainMain(name) : nameToChainTest(name));
}

export function idToChain(id: number): SupportedChain | null {
  return (configSetSelection.chainSet === ChainSet.MAINNETS? idToChainMain(id) : idToChainTest(id));
}

export function paramToChain(param: string): SupportedChain | null {
  if (nameToChain(param)) return nameToChain(param);
  else return idToChain(+param);
}

export function getChainRpc(id: number): string {
  switch (id) {
    case mainnet.id:
      return process.env.MAINNET_RPC;
    case gnosis.id:
      return process.env.GNOSIS_RPC;
    case sepolia.id:
      return process.env.SEPOLIA_RPC;
    case gnosisChiado.id:
      return process.env.CHIADO_RPC;
    default:
      throw new Error("chain not supported");
  }
}

export function getForeignChain(chainId: number) {
  return (configSetSelection.chainSet === ChainSet.MAINNETS? getForeignChainMain(chainId) : getForeignChainTest(chainId));
}