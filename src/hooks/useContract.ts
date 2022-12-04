import { PoHContract } from "enums/PoHContract";
import { BaseContract, Contract } from "ethers";
import { useMemo } from "react";
import { CONTRACT } from "constants/contracts";
import useWeb3 from "./useWeb3";

const useContract = <T extends BaseContract = Contract>(
  contract: PoHContract,
  onlyNetwork: boolean = false
) => {
  const { account, chainId, library } = useWeb3(onlyNetwork);

  return useMemo(() => {
    if (!library || !chainId) return null;

    console.log({ contract, chainId, address: CONTRACT[contract][chainId] });

    return new Contract(
      CONTRACT[contract][chainId],
      CONTRACT[contract].ABI,
      account ? library.getSigner(account).connectUnchecked() : library
    ) as T;
  }, [library, chainId, account]);
};

export default useContract;
