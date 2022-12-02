import { Web3Provider } from "@ethersproject/providers";
import { BaseContract, Contract, Signer } from "ethers";
import { useMemo } from "react";
import { ChainId } from "constants/chains";
import { CONTRACT, Contracts } from "constants/contracts";
import useWeb3 from "./useWeb3";
import useWeb3Network from "./useWeb3Network";

export const getContract = <T extends BaseContract = Contract>(
  contract: Contracts,
  chainId: ChainId,
  signerOrProvider: Signer | Web3Provider
) =>
  new Contract(
    CONTRACT[contract][chainId],
    CONTRACT[contract].ABI,
    signerOrProvider
  ) as T;

const useContract = <T extends BaseContract = Contract>(
  contract: Contracts,
  signer: boolean = false
) => {
  const { account, chainId, provider } = signer ? useWeb3() : useWeb3Network();

  return useMemo(() => {
    if (!provider || !chainId) return null;

    console.log({ chainId, contract, signer });

    return getContract<T>(
      contract,
      chainId,
      signer && account
        ? provider.getSigner(account).connectUnchecked()
        : provider
    );
  }, [provider, chainId, account]);
};

export default useContract;
