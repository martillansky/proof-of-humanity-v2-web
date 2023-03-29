import useCall from "./useCall";
import { useHub } from "./useContract";

export const useHubTokenToUser = (token?: string | null) =>
  useCall(useHub(), "tokenToUser", token ? [token] : null);
export const useHubUserToToken = (user?: string | null) =>
  useCall(useHub(), "userToToken", user ? [user] : null);
