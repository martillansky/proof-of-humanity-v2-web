import { HashZero } from "@ethersproject/constants";

export const prettifyId = (id: string) => id.slice(2).toUpperCase();

export const machinifyId = (s: string) =>
  `0x${HashZero.concat(s.toLowerCase()).slice(-40)}`;

export const shortenId = (id: string, chars = 4) =>
  id.length <= 2 * chars
    ? id
    : `${id.substring(0, chars)}~👻~${id.substring(id.length - chars)}`;
