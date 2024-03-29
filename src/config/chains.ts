import { gnosis, sepolia, /* gnosisChiado */ } from "viem/chains";

export const supportedChains = [gnosis, sepolia, /* gnosisChiado */];
export const defaultChain = supportedChains[0];

export const legacyChain = sepolia;
export const vdbChain = sepolia;
export const tokenChain = gnosis;

export type SupportedChain = ArrayElement<typeof supportedChains>;
export type SupportedChainId = SupportedChain["id"];

export function nameToChain(name: string): SupportedChain | null {
  switch (name.toLowerCase()) {
    case sepolia.name.toLowerCase():
      return sepolia;
    case gnosis.name.toLowerCase():
      return gnosis;
    /* case gnosisChiado.name.toLowerCase():
      return gnosisChiado; */
    default:
      return null;
    // throw new Error("chain not supported");
  }
}

export function idToChain(id: number): SupportedChain | null {
  switch (id) {
    case sepolia.id:
      return sepolia;
    case gnosis.id:
      return gnosis;
    /* case gnosisChiado.id:
      return gnosisChiado; */
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
    case sepolia.id:
      return process.env.SEPOLIA_RPC;
    case gnosis.id:
      return process.env.GNOSIS_RPC;
    /* case gnosisChiado.id:
      return process.env.CHIADO_RPC; */
    default:
      throw new Error("chain not supported");
  }
}
