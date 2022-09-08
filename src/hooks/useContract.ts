import { BaseContract, Contract } from "ethers";
import { useMemo } from "react";
import { CONTRACT, Contracts } from "constants/contracts";
import useWeb3 from "./useWeb3";
import useWeb3Network from "./useWeb3Network";

export const useContract = <T extends BaseContract = Contract>(
  contract: Contracts,
  signer: boolean = false
) => {
  const { account, chainId, provider } = signer ? useWeb3() : useWeb3Network();

  return useMemo(() => {
    if (!provider || !chainId) return null;

    const address = CONTRACT[contract][chainId];
    if (!address) return null;

    return new Contract(
      address,
      CONTRACT[contract].ABI,
      signer && account
        ? provider.getSigner(account).connectUnchecked()
        : provider
    );
  }, [provider, chainId, account]) as T | null;
};
