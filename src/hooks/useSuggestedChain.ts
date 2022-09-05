import { useParams } from "react-router-dom";
import { ChainId } from "constants/chains";

const useSuggestedChain = (): ChainId | null => {
  const { chain: urlChain } = useParams();
  return urlChain ? ChainId[urlChain.toUpperCase()] ?? null : null;
};

export default useSuggestedChain;
