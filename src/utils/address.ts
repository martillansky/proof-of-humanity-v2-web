import { SupportedChain } from "config/chains";
import { isAddress } from "viem";

export function shortenAddress(address: string, chars = 4): string {
  if (!isAddress(address))
    throw Error(`Invalid 'address' parameter '${address}'.`);

  return `${address.substring(0, chars)}..${address.substring(42 - chars)}`;
}

export const explorerLink = (address: string, chain: SupportedChain) =>
  `${chain.blockExplorers.default.url}/address/${address}`;
