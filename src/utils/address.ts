import { getAddress } from "@ethersproject/address";
import { ChainId } from "enums/ChainId";
import { CHAIN } from "constants/chains";
import { base2048 } from "./misc";

export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${address.substring(0, chars + 1)}...${address.substring(
    42 - chars
  )}`;
}

export const phraseFromAddress = (
  account?: string | null,
  count: number = 8
) => {
  if (!account) return;
  const address = account.slice(2);
  const words = base2048.encode(Buffer.from(address, "hex"));
  return words.split(" ").slice(0, count).join(" ").toUpperCase();
};

export const explorerLink = (address: string, chainId: ChainId) =>
  `${CHAIN[chainId].EXPLORER}/address/${address}`;
