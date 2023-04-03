import { PoHContract } from "enums/PoHContract";
import { BaseContract, Contract } from "ethers";
import { useMemo } from "react";
import { CONTRACT } from "constants/contracts";
import {
  CrossChainProofOfHumanity,
  GroupCurrencyToken,
  IHUB,
  KlerosLiquid,
  PoHTokenManager,
  ProofOfHumanity,
  Token,
} from "generated/contracts";
import TokenABI from "../assets/contracts/Token.json";
import useWeb3 from "./useWeb3";

const useContract = <T extends BaseContract = Contract>(
  contract: PoHContract,
  onlyNetwork: boolean = false
) => {
  const { account, chainId, library } = useWeb3(onlyNetwork);

  return useMemo(() => {
    if (!library || !chainId) return null;

    return new Contract(
      CONTRACT[contract][chainId],
      CONTRACT[contract].ABI,
      account ? library.getSigner(account).connectUnchecked() : library
    ) as T;
  }, [library, chainId, account]);
};

export default useContract;

export const useProofOfHumanity = (onlyNetwork = false) =>
  useContract<ProofOfHumanity>(PoHContract.PROOF_OF_HUMANITY, onlyNetwork);

export const useCrossChainPoH = () =>
  useContract<CrossChainProofOfHumanity>(PoHContract.CROSS_CHAIN_POH);

export const useKlerosLiquid = () =>
  useContract<KlerosLiquid>(PoHContract.ARBITRATOR, true);

export const useHub = () => useContract<IHUB>(PoHContract.HUB, true);

export const useGroupCurrencyToken = (onlyNetwork = false) =>
  useContract<GroupCurrencyToken>(
    PoHContract.GROUP_CURRENCY_TOKEN,
    onlyNetwork
  );

export const usePoHTokenManager = (onlyNetwork = false) =>
  useContract<PoHTokenManager>(PoHContract.POH_TOKEN_MANAGER, onlyNetwork);

export const useToken = (address: string, onlyNetwork = false) => {
  const { account, library } = useWeb3(onlyNetwork);

  return useMemo(() => {
    if (!library) return null;

    return new Contract(
      address,
      TokenABI,
      account ? library.getSigner(account).connectUnchecked() : library
    ) as Token;
  }, [library, account]);
};
