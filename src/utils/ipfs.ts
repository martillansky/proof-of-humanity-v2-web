import axios from "axios";

export const uploadToIPFS = async (data: FormData) => {
  const result = await axios.post(
    "http://localhost:8888/.netlify/functions/hello",
    data
  );

  return `/ipfs/${result.data.uri}`;
};

export const ipfs = (uri: string) => `https://ipfs.kleros.io${uri}`;
