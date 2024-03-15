import axios from "axios";

export const IPFS_GATEWAY = process.env.REACT_APP_IPFS_GATEWAY || "ipfs.kleros.io";

export const uploadToIPFS = async (data: FormData) => {
  const result = await axios.post("/api/ipfs-upload", data);
  return result.data.uri;
};

export const ipfs = (uri: string) => `https://${IPFS_GATEWAY}${uri}`;
//export const ipfs = (uri: string) => `https://ipfs.kleros.io${uri}`;

export const ipfsFetch = async <F>(ipfsURI: string) =>
  (await axios.get(ipfs(ipfsURI))).data as F;
