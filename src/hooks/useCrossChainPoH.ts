import { PoHContract } from "enums/PoHContract";
import { CrossChainProofOfHumanity } from "generated/contracts";
import useContract from "./useContract";
import useSend from "./useSend";

const useCrossChainPoH = () =>
  useContract<CrossChainProofOfHumanity>(PoHContract.CROSS_CHAIN_POH);

export const useTransferHumanity = () =>
  useSend(useCrossChainPoH(), "transferHumanity");
export const useUpdateHumanity = () =>
  useSend(useCrossChainPoH(), "updateHumanity");
