import { useCrossChainPoH } from "./useContract";
import useSend from "./useSend";

export const useTransferHumanity = () =>
  useSend(useCrossChainPoH(), "transferHumanity");
export const useUpdateHumanity = () =>
  useSend(useCrossChainPoH(), "updateHumanity");
