export enum Web3ErrorCode {
  CHAIN_NOT_ADDED = 4902,
  USER_DENIED_TX = 4001,
  EXECUTION_REVERTED = -32000,
}

export enum RPCMethod {
  SWITCH_CHAIN = "wallet_switchEthereumChain",
  ADD_CHAIN = "wallet_addEthereumChain",
}
