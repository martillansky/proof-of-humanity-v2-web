import { Contracts } from "constants/contracts";
import { ProofOfHumanity } from "generated/contracts";
import useCall from "./useCall";
import { useContract } from "./useContract";
import { useArbitrationCost as useKLARbitrationCost } from "./useKlerosLiquid";
import useSend from "./useSend";

const useProofOfHumanity = () =>
  useContract<ProofOfHumanity>(Contracts.PROOF_OF_HUMANITY);

export default useProofOfHumanity;

export const useClaimSoul = (defaultId?: boolean) =>
  useSend(
    useProofOfHumanity(),
    defaultId ? "claimSoul(string,string)" : "claimSoul(uint160,string,string)"
  );
export const useRevokeSoul = () => useSend(useProofOfHumanity(), "revokeSoul");
export const useRenewSoul = () => useSend(useProofOfHumanity(), "renewSoul");
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

export const useIsRegistered = (
  params: Parameters<ProofOfHumanity["isRegistered"]> | null
) => useCall(useProofOfHumanity(), "isRegistered", params);
export const useVouches = (
  params: Parameters<ProofOfHumanity["vouches"]> | null
) => useCall(useProofOfHumanity(), "vouches", params);
export const useSoulLifespan = () =>
  useCall(useProofOfHumanity(), "soulLifespan", []);
export const useChallengePeriodDuration = () =>
  useCall(useProofOfHumanity(), "challengePeriodDuration", []);
export const useRequiredNumberOfVouches = () =>
  useCall(useProofOfHumanity(), "requiredNumberOfVouches", []);
export const useRequestBaseDeposit = () =>
  useCall(useProofOfHumanity(), "requestBaseDeposit", []);
export const useArbitratorDataListCount = () =>
  useCall(useProofOfHumanity(), "getArbitratorDataListCount", []);
export const useArbitratorDataList = (
  params: Parameters<ProofOfHumanity["arbitratorDataList"]> | null
) => useCall(useProofOfHumanity(), "arbitratorDataList", params);

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
  return arbitrationCost && requestBaseDeposit
    ? arbitrationCost.add(requestBaseDeposit)
    : null;
};

// export const useAddSubmission = () =>
//   useSend(useProofOfHumanity(), "addSubmission");
// export const useRemoveSubmission = () =>
//   useSend(useProofOfHumanity(), "removeSubmission");
// export const useReapplySubmission = () =>
//   useSend(useProofOfHumanity(), "reapplySubmission");
// export const useFundSubmission = () =>
//   useSend(useProofOfHumanity(), "fundSubmission");
// export const useWithdrawSubmission = () =>
//   useSend(useProofOfHumanity(), "withdrawSubmission");
// export const useAddVouch = () => useSend(useProofOfHumanity(), "addVouch");
// export const useRemoveVouch = () =>
//   useSend(useProofOfHumanity(), "removeVouch");
// export const useChangeStateToPending = () =>
//   useSend(useProofOfHumanity(), "changeStateToPending");
// export const useChallengeRequest = () =>
//   useSend(useProofOfHumanity(), "challengeRequest");
// export const useFundAppeal = () => useSend(useProofOfHumanity(), "fundAppeal");
// export const useExecuteRequest = () =>
//   useSend(useProofOfHumanity(), "executeRequest");
// export const useProcessVouches = () =>
//   useSend(useProofOfHumanity(), "processVouches");
// export const useWithdrawFeesAndRewards = () =>
//   useSend(useProofOfHumanity(), "withdrawFeesAndRewards");
// export const useSubmitEvidence = () =>
//   useSend(useProofOfHumanity(), "submitEvidence");

// export const useIsRegistered = (
//   params: Parameters<ProofOfHumanity["isRegistered"]> | null
// ) => useCall(useProofOfHumanity(), "isRegistered", params);
// export const useVouches = (
//   params: Parameters<ProofOfHumanity["vouches"]> | null
// ) => useCall(useProofOfHumanity(), "vouches", params);
// export const useSubmissionDuration = () =>
//   useCall(useProofOfHumanity(), "submissionDuration", []);
// export const useRequiredNumberOfVouches = () =>
//   useCall(useProofOfHumanity(), "requiredNumberOfVouches", []);
// export const useSubmissionBaseDeposit = () =>
//   useCall(useProofOfHumanity(), "submissionBaseDeposit", []);
// export const useArbitratorDataListCount = () =>
//   useCall(useProofOfHumanity(), "getArbitratorDataListCount", []);
// export const useArbitratorDataList = (
//   params: Parameters<ProofOfHumanity["arbitratorDataList"]> | null
// ) => useCall(useProofOfHumanity(), "arbitratorDataList", params);
