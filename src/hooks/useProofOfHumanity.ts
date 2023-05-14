import { useMemo } from "react";
import { ProofOfHumanity } from "generated/contracts";
import useCall from "./useCall";
import { useProofOfHumanity } from "./useContract";
import { useArbitrationCost as useKLARbitrationCost } from "./useKlerosLiquid";
import useSend from "./useSend";

export const useClaimHumanity = (defaultId?: boolean) =>
  useSend(
    useProofOfHumanity(),
    defaultId ? "claimHumanityDefault" : "claimHumanity"
  );
export const useRevokeHumanity = () =>
  useSend(useProofOfHumanity(), "revokeHumanity");
export const useRenewHumanity = () =>
  useSend(useProofOfHumanity(), "renewHumanity");
export const useFundRequest = () =>
  useSend(useProofOfHumanity(), "fundRequest");
export const useWithdrawRequest = () =>
  useSend(useProofOfHumanity(), "withdrawRequest");
export const useAddVouch = () => useSend(useProofOfHumanity(), "addVouch");
export const useRemoveVouch = () =>
  useSend(useProofOfHumanity(), "removeVouch");
export const useAdvanceState = () =>
  useSend(useProofOfHumanity(), "advanceState");
export const useChallengeRequest = () =>
  useSend(useProofOfHumanity(), "challengeRequest");
export const useFundAppeal = () => useSend(useProofOfHumanity(), "fundAppeal");
export const useExecuteRequest = () =>
  useSend(useProofOfHumanity(), "executeRequest");
export const useProcessVouches = () =>
  useSend(useProofOfHumanity(), "processVouches");
export const useWithdrawFeesAndRewards = () =>
  useSend(useProofOfHumanity(), "withdrawFeesAndRewards");
export const useSubmitEvidence = () =>
  useSend(useProofOfHumanity(), "submitEvidence");

export const useIsHuman = (
  params: Parameters<ProofOfHumanity["isHuman"]> | null
) => useCall(useProofOfHumanity(true), "isHuman", params);
export const useHumanityOf = (account?: string | null) =>
  useCall(useProofOfHumanity(true), "humanityOf", account ? [account] : null);
export const useVouches = (
  params: Parameters<ProofOfHumanity["vouches"]> | null
) => useCall(useProofOfHumanity(true), "vouches", params);
export const useHumanityLifespan = () =>
  useCall(useProofOfHumanity(true), "humanityLifespan", []);
export const useChallengePeriodDuration = () =>
  useCall(useProofOfHumanity(true), "challengePeriodDuration", []);
export const useRequiredNumberOfVouches = () =>
  useCall(useProofOfHumanity(true), "requiredNumberOfVouches", []);
export const useRequestBaseDeposit = () =>
  useCall(useProofOfHumanity(true), "requestBaseDeposit", []);
export const useArbitratorDataListCount = () =>
  useCall(useProofOfHumanity(true), "getArbitratorDataListCount", []);
export const useArbitratorDataList = (
  params: Parameters<ProofOfHumanity["arbitratorDataList"]> | null
) => useCall(useProofOfHumanity(true), "arbitratorDataList", params);

export const useArbitratorData = () => {
  const [dataListCount] = useArbitratorDataListCount();
  return useArbitratorDataList(
    dataListCount ? [dataListCount.toNumber() - 1] : null
  );
};

export const useArbitrationCost = () => {
  const [arbitratorData] = useArbitratorData();
  const [arbitrationCost] = useKLARbitrationCost(
    arbitratorData ? [arbitratorData.arbitratorExtraData] : null
  );
  return arbitrationCost ? arbitrationCost : null;
};

export const useRequestTotalCost = () => {
  const [requestBaseDeposit] = useRequestBaseDeposit();
  const arbitrationCost = useArbitrationCost();
  return useMemo(
    () =>
      arbitrationCost && requestBaseDeposit
        ? arbitrationCost.add(requestBaseDeposit)
        : null,
    [arbitrationCost, requestBaseDeposit]
  );
};
