import { ChainId } from "enums/ChainId";
import useSWR from "swr";
import { supportedChainIds } from "constants/chains";
import { ContractQuery } from "generated/graphql";
import { sdk } from ".";

function useContractData(): Record<ChainId, ContractQuery> | undefined;
function useContractData(chain: ChainId): ContractQuery | undefined;
function useContractData(
  chain?: ChainId
): Record<ChainId, ContractQuery> | ContractQuery | undefined {
  return chain
    ? useSWR(["Contract", chain], async (_, c) => await sdk[c]["Contract"]())
        .data
    : useSWR(["Contract"], async () => {
        const res = await Promise.all(
          supportedChainIds.map((c) => sdk[c]["Contract"]())
        );
        return supportedChainIds.reduce(
          (acc, chain, i) => ({ ...acc, [chain]: res[i] }),
          {} as Record<ChainId, ContractQuery>
        );
      }).data;
}

export default useContractData;
