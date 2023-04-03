import useCall from "./useCall";
import { useToken } from "./useContract";
import useSend from "./useSend";

export const useTokenAllowance = (
  token: string,
  owner?: string | null,
  spender?: string
) =>
  useCall(
    useToken(token),
    "allowance",
    owner && spender ? [owner, spender] : null
  );
export const useTokenBalanceOf = (token: string, account?: string | null) =>
  useCall(useToken(token, true), "balanceOf", account ? [account] : null);

export const useTokenApprove = (token: string) =>
  useSend(useToken(token), "approve");
export const useTokenTransfer = (token: string) =>
  useSend(useToken(token), "transfer");
