import { Contracts } from "constants/contracts";
import { CrossChainProofOfHumanity } from "generated/contracts";
import useContract from "./useContract";
import useSend from "./useSend";

const useCrossChainPoH = (signer?: boolean) =>
  useContract<CrossChainProofOfHumanity>(Contracts.CROSS_CHAIN_POH, signer);

export default useCrossChainPoH;

export const useTransferHumanity = () =>
  useSend(useCrossChainPoH(true), "transferHumanity");
export const useUpdateHumanity = () =>
  useSend(useCrossChainPoH(true), "updateHumanity");
