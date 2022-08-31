export const encodeId = (id: string) => id.substring(2).toUpperCase();

export const decodeId = (s: string) => `0x${s}`;
