import { ChainId } from "enums/ChainId";
import { useParams } from "react-router-dom";

const useSuggestedChain = (): ChainId | null => {
  const { chain: queryChain } = useParams();
  console.log({ queryChain }, queryChain && ChainId[queryChain.toUpperCase()]);
  return queryChain ? ChainId[queryChain.toUpperCase()] ?? null : null;
};

export default useSuggestedChain;
