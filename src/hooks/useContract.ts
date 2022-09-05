import { JsonRpcProvider } from "@ethersproject/providers";
import { BaseContract, Contract, ContractInterface } from "ethers";
import { useMemo } from "react";
import { CONTRACT, Contracts } from "constants/contracts";
import useWeb3 from "./useWeb3";

const getProviderOrSigner = (provider: JsonRpcProvider, account?: string) =>
  account ? provider.getSigner(account).connectUnchecked() : provider;

export const getContract = (
  address: string,
  abi: ContractInterface,
  provider: JsonRpcProvider,
  account?: string
) => new Contract(address, abi, getProviderOrSigner(provider, account));

export const useContract = <T extends BaseContract = Contract>(
  contract: Contracts,
  useNetwork: boolean = true
) => {
  const { provider, account, chainId } = useWeb3(useNetwork);

  return useMemo(() => {
    if (!provider || !chainId) return null;
    const address = CONTRACT[contract][chainId];
    if (!address) return null;
    return getContract(address, CONTRACT[contract].ABI, provider, account);
  }, [provider, chainId, account]) as T | null;
};
