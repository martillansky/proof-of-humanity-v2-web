import axios from "axios";
import { bufferFrom, randomString } from "./misc";

export const uploadToIPFS = async (
  content: string | ArrayBuffer,
  // buffer: ArrayBufferLike,
  fileName?: string
) => {
  const result = await axios.post("https://ipfs.kleros.io/add", {
    fileName: fileName || randomString(16),
    buffer: bufferFrom(content),
  });
  const data = result.data.data;
  return `/ipfs/${data[1].hash}${data[0].path}`;
};

export const ipfs = (uri: string) => `https://ipfs.kleros.io${uri}`;
