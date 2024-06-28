import { mainnet, gnosis, sepolia, gnosisChiado } from "viem/chains";

//export const supportedChains = [mainnet, gnosis];
export const supportedChains = [sepolia, gnosisChiado];
export const defaultChain = supportedChains[0];

export const legacyChain = sepolia;
//export const legacyChain = mainnet;

export type SupportedChain = ArrayElement<typeof supportedChains>;
export type SupportedChainId = SupportedChain["id"];

export function nameToChain(name: string): SupportedChain | null {
  switch (name.toLowerCase()) {
    /* case mainnet.name.toLowerCase():
      return mainnet; */
    /* case gnosis.name.toLowerCase():
      return gnosis; */
      //-----------
    case sepolia.name.toLowerCase():
      return sepolia;
    case gnosisChiado.name.toLowerCase().replace(/ /g, '%20'):
      return gnosisChiado;
      //-----------
    default:
      return null;
    // throw new Error("chain not supported");
  }
}

export function idToChain(id: number): SupportedChain | null {
  switch (id) {
    /* case mainnet.id:
      return mainnet; */
    /* case gnosis.id:
      return gnosis; */
      //-----------
    case sepolia.id:
      return sepolia;
    case gnosisChiado.id:
      return gnosisChiado;
      //-----------
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
    /* case mainnet.id:
      return process.env.MAINNET_RPC; */
    /* case gnosis.id:
      return process.env.GNOSIS_RPC; */
      //-----------
    case sepolia.id:
      return process.env.SEPOLIA_RPC;
    case gnosisChiado.id:
      return process.env.CHIADO_RPC;
      //-----------
    default:
      throw new Error("chain not supported");
  }
}


export function getForeignChain(chainId: number) {
  switch (chainId) {
    //-----------
    case 10200:
      return 11155111;
    case 11155111:
      return 10200;
    //-----------
    /* case 1:
      return 100;
    case 100:
      return 1; */
    default:
      throw new Error("chain not supported");
  }
}