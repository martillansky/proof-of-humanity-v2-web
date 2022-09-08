import { network } from "utils/connectors";

const useWeb3Network = () => ({
  account: undefined,
  chainId: network.hooks.useChainId(),
  isActive: network.hooks.useIsActive(),
  provider: network.hooks.useProvider(),
});

export default useWeb3Network;
