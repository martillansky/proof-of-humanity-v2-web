import { Hash, toBytes, zeroAddress } from "viem";

export const prettifyId = (id: string) => id.slice(2).toUpperCase();

export const machinifyId = (s: string) => {
  const id = `0x${zeroAddress.concat(s.toLowerCase()).slice(-40)}` as Hash;
  try {
    toBytes(BigInt(id), { size: 20 });
    return id;
  } catch (err) {
    console.error(`String ${s} can't be transformed to bytes`);
    return null;
  }
};
