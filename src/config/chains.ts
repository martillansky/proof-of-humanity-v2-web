import { gnosis, mainnet, sepolia } from "viem/chains";

export const supportedChains = [gnosis, sepolia];
export const defaultChain = supportedChains[0];

export const legacyChain = sepolia;
export const vdbChain = sepolia;
export const tokenChain = gnosis;

export type SupportedChain = ArrayElement<typeof supportedChains>;
export type SupportedChainId = SupportedChain["id"];

export function nameToChain(name: string): SupportedChain | null {
  switch (name.toLowerCase()) {
    // case mainnet.name:
    //   return mainnet;
    case sepolia.name.toLowerCase():
      return sepolia;
    case gnosis.name.toLowerCase():
      return gnosis;
    default:
      return null;
    // throw new Error("chain not supported");
  }
}

export function idToChain(id: number): SupportedChain | null {
  switch (id) {
    // case mainnet.id:
    //   return mainnet;
    case sepolia.id:
      return sepolia;
    case gnosis.id:
      return gnosis;
    default:
      return null;
    // throw new Error("chain not supported");
  }
}

export function paramToChain(param: string): SupportedChain | null {
  if (nameToChain(param)) return nameToChain(param);
  else return idToChain(+param);
  // try {
  //   return ;
  // } catch (err) {
  // }
}

export function getChainRpc(id: number): string {
  switch (id) {
    case mainnet.id:
      return process.env.MAINNET_RPC;
    case sepolia.id:
      return process.env.SEPOLIA_RPC;
    case gnosis.id:
      return process.env.GNOSIS_RPC;
    default:
      throw new Error("chain not supported");
  }
}
