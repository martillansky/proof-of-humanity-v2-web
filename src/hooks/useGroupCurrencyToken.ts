import useCall from "./useCall";
import { useGroupCurrencyToken } from "./useContract";
import useSend from "./useSend";

export const useGCTAllowance = (owner?: string | null, spender?: string) =>
  useCall(
    useGroupCurrencyToken(),
    "allowance",
    owner && spender ? [owner, spender] : null
  );
export const useGCTBalanceOf = (account?: string | null) =>
  useCall(useGroupCurrencyToken(), "balanceOf", account ? [account] : null);
export const useGCTMember = (token?: string) =>
  useCall(useGroupCurrencyToken(), "directMembers", token ? [token] : null);

export const useGCTApprove = () => useSend(useGroupCurrencyToken(), "approve");
export const useGCTTransfer = () =>
  useSend(useGroupCurrencyToken(), "transfer");
export const useGCTMint = () => useSend(useGroupCurrencyToken(), "mint");
