import { KlerosLiquid } from "generated/contracts";
import useCall from "./useCall";
import { useKlerosLiquid } from "./useContract";

export const useArbitrationCost = (
  params: Parameters<KlerosLiquid["arbitrationCost"]> | null
) => useCall(useKlerosLiquid(), "arbitrationCost", params);
export const useAppealCost = (
  params: Parameters<KlerosLiquid["appealCost"]> | null
) => useCall(useKlerosLiquid(), "appealCost", params);
export const useAppealPeriod = (
  params: Parameters<KlerosLiquid["appealPeriod"]> | null
) => useCall(useKlerosLiquid(), "appealPeriod", params);
export const useCurrentRuling = (
  params: Parameters<KlerosLiquid["currentRuling"]> | null
) => useCall(useKlerosLiquid(), "currentRuling", params);
