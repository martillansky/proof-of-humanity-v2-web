import { SupportedChainId, supportedChains } from "config/chains";
import { sdk } from "config/subgraph";
import { ContractQuery } from "generated/graphql";
import { cache } from "react";

export const getContractData = cache(async (chainId: SupportedChainId) =>
  sdk[chainId].Contract()
);

export const getContractDataAllChains = cache(async () => {
  const res = await Promise.all(
    supportedChains.map((chain) => getContractData(chain.id))
  );

  return supportedChains.reduce(
    (acc, chain, i) => ({ ...acc, [chain.id]: res[i] }),
    {} as Record<SupportedChainId, NonNullable<ContractQuery>>
  );
});
