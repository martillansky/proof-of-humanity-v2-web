import { PoHTokenManager } from "generated/contracts";
import useCall from "./useCall";
import { usePoHTokenManager } from "./useContract";
import useSend from "./useSend";

export const usePoHTokenToId = (
  params: Parameters<PoHTokenManager["tokenToPohId"]> | null
) => useCall(usePoHTokenManager(), "tokenToPohId", params);
export const usePoHIdToToken = (pohId?: string | null) =>
  useCall(usePoHTokenManager(), "pohIdToToken", pohId ? [pohId] : null);

export const usePoHConfirmHuman = () =>
  useSend(usePoHTokenManager(), "confirmHuman");
export const usePoHConfirmToken = () =>
  useSend(usePoHTokenManager(), "confirmToken");
export const usePoHConfirmHumanToken = () =>
  useSend(usePoHTokenManager(), "confirmHumanToken");
export const usePoHRemoveMember = () =>
  useSend(usePoHTokenManager(), "removeMember");
export const usePoHRedeem = () =>
  useSend(usePoHTokenManager(), "redeem(address,uint256)");
export const usePoHRedeemToAddress = () =>
  useSend(usePoHTokenManager(), "redeem(address,address,uint256)");
