import { JsonRpcProvider } from "@ethersproject/providers";
import { ABI, Contracts, CONTRACT_ADDRESS } from "constants/contracts";
import { BaseContract, Contract, ContractInterface } from "ethers";
import { useMemo } from "react";
import useWeb3 from "./useWeb3";

const getProviderOrSigner = (provider: JsonRpcProvider, account?: string) =>
  account ? provider.getSigner(account).connectUnchecked() : provider;

const getContract = (
  address: string,
  abi: ContractInterface,
  provider: JsonRpcProvider,
  account?: string
) => new Contract(address, abi, getProviderOrSigner(provider, account));

export const useContract = <T extends BaseContract = Contract>(
  contract: Contracts
) => {
  const { library, account, chainId } = useWeb3();

  return useMemo(() => {
    if (!library || !chainId) return null;

    const address = CONTRACT_ADDRESS[contract][chainId];

    if (!address) return null;

    return getContract(address, ABI[contract], library, account || undefined);
  }, [library, chainId, account]) as T | null;
};
