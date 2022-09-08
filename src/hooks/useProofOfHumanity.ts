import { Contracts } from "constants/contracts";
import { ProofOfHumanity } from "generated/contracts";
import useCall from "./useCall";
import { useContract } from "./useContract";
import { useArbitrationCost as useKLARbitrationCost } from "./useKlerosLiquid";
import useSend from "./useSend";

const useProofOfHumanity = (signer?: boolean) =>
  useContract<ProofOfHumanity>(Contracts.PROOF_OF_HUMANITY, signer);

export default useProofOfHumanity;

export const useClaimHumanity = (defaultId?: boolean) =>
  useSend(
    useProofOfHumanity(true),
    defaultId
      ? "claimHumanity(string,string)"
      : "claimHumanity(bytes20,string,string)"
  );
export const useRevokeHumanity = () =>
  useSend(useProofOfHumanity(true), "revokeHumanity");
export const useRenewHumanity = () =>
  useSend(useProofOfHumanity(true), "renewHumanity");
export const useFundRequest = () =>
  useSend(useProofOfHumanity(true), "fundRequest");
export const useWithdrawRequest = () =>
  useSend(useProofOfHumanity(true), "withdrawRequest");
export const useAddVouch = () => useSend(useProofOfHumanity(true), "addVouch");
export const useRemoveVouch = () =>
  useSend(useProofOfHumanity(true), "removeVouch");
export const useAdvanceState = () =>
  useSend(useProofOfHumanity(true), "advanceState");
export const useChallengeRequest = () =>
  useSend(useProofOfHumanity(true), "challengeRequest");
export const useFundAppeal = () =>
  useSend(useProofOfHumanity(true), "fundAppeal");
export const useExecuteRequest = () =>
  useSend(useProofOfHumanity(true), "executeRequest");
export const useProcessVouches = () =>
  useSend(useProofOfHumanity(true), "processVouches");
export const useWithdrawFeesAndRewards = () =>
  useSend(useProofOfHumanity(true), "withdrawFeesAndRewards");
export const useSubmitEvidence = () =>
  useSend(useProofOfHumanity(true), "submitEvidence");

export const useIsHuman = (
  params: Parameters<ProofOfHumanity["isHuman"]> | null
) => useCall(useProofOfHumanity(), "isHuman", params);
export const useVouches = (
  params: Parameters<ProofOfHumanity["vouches"]> | null
) => useCall(useProofOfHumanity(), "vouches", params);
export const useHumanityLifespan = () =>
  useCall(useProofOfHumanity(), "humanityLifespan", []);
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
