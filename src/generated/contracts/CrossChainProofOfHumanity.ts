/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";

export interface CrossChainProofOfHumanityInterface extends utils.Interface {
  functions: {
    "addBridgeGateway(address,address)": FunctionFragment;
    "bridgeGateways(address)": FunctionFragment;
    "changeGovernor(address)": FunctionFragment;
    "changeProofOfHumanity(address)": FunctionFragment;
    "governor()": FunctionFragment;
    "humanityMapping(bytes20)": FunctionFragment;
    "humans(address)": FunctionFragment;
    "initialize(address,uint256)": FunctionFragment;
    "initialized()": FunctionFragment;
    "isClaimed(bytes20)": FunctionFragment;
    "isHuman(address)": FunctionFragment;
    "proofOfHumanity()": FunctionFragment;
    "receiveTransfer(address,bytes20,uint64,bytes32)": FunctionFragment;
    "receiveUpdate(address,bytes20,uint64,bool)": FunctionFragment;
    "receivedTransferHashes(bytes32)": FunctionFragment;
    "removeBridgeGateway(address)": FunctionFragment;
    "retryFailedTransfer(bytes20,address)": FunctionFragment;
    "setTransferCooldown(uint256)": FunctionFragment;
    "transferCooldown()": FunctionFragment;
    "transferHumanity(address)": FunctionFragment;
    "transfers(bytes20)": FunctionFragment;
    "updateHumanity(address,bytes20)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addBridgeGateway"
      | "bridgeGateways"
      | "changeGovernor"
      | "changeProofOfHumanity"
      | "governor"
      | "humanityMapping"
      | "humans"
      | "initialize"
      | "initialized"
      | "isClaimed"
      | "isHuman"
      | "proofOfHumanity"
      | "receiveTransfer"
      | "receiveUpdate"
      | "receivedTransferHashes"
      | "removeBridgeGateway"
      | "retryFailedTransfer"
      | "setTransferCooldown"
      | "transferCooldown"
      | "transferHumanity"
      | "transfers"
      | "updateHumanity"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addBridgeGateway",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "bridgeGateways",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "changeGovernor",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "changeProofOfHumanity",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "governor", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "humanityMapping",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "humans",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "initialized",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isClaimed",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "isHuman",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "proofOfHumanity",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "receiveTransfer",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "receiveUpdate",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<boolean>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "receivedTransferHashes",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "removeBridgeGateway",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "retryFailedTransfer",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setTransferCooldown",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferCooldown",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferHumanity",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "transfers",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateHumanity",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;

  decodeFunctionResult(
    functionFragment: "addBridgeGateway",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "bridgeGateways",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeGovernor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeProofOfHumanity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "governor", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "humanityMapping",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "humans", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "initialized",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isClaimed", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isHuman", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "proofOfHumanity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "receiveTransfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "receiveUpdate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "receivedTransferHashes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeBridgeGateway",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "retryFailedTransfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTransferCooldown",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferCooldown",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferHumanity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfers", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "updateHumanity",
    data: BytesLike
  ): Result;

  events: {
    "GatewayAdded(address,address)": EventFragment;
    "GatewayRemoved(address)": EventFragment;
    "TransferInitiated(bytes20,address,uint160,address,bytes32)": EventFragment;
    "TransferReceived(bytes20,address,uint160,bytes32)": EventFragment;
    "TransferRetry(bytes32)": EventFragment;
    "UpdateInitiated(bytes20,address,uint160,address,bool)": EventFragment;
    "UpdateReceived(bytes20,address,uint160,bool)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "GatewayAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GatewayRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TransferInitiated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TransferReceived"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TransferRetry"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdateInitiated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdateReceived"): EventFragment;
}

export interface GatewayAddedEventObject {
  bridgeGateway: string;
  foreignProxy: string;
}
export type GatewayAddedEvent = TypedEvent<
  [string, string],
  GatewayAddedEventObject
>;

export type GatewayAddedEventFilter = TypedEventFilter<GatewayAddedEvent>;

export interface GatewayRemovedEventObject {
  bridgeGateway: string;
}
export type GatewayRemovedEvent = TypedEvent<
  [string],
  GatewayRemovedEventObject
>;

export type GatewayRemovedEventFilter = TypedEventFilter<GatewayRemovedEvent>;

export interface TransferInitiatedEventObject {
  humanityId: string;
  owner: string;
  expirationTime: BigNumber;
  gateway: string;
  transferHash: string;
}
export type TransferInitiatedEvent = TypedEvent<
  [string, string, BigNumber, string, string],
  TransferInitiatedEventObject
>;

export type TransferInitiatedEventFilter =
  TypedEventFilter<TransferInitiatedEvent>;

export interface TransferReceivedEventObject {
  humanityId: string;
  owner: string;
  expirationTime: BigNumber;
  transferHash: string;
}
export type TransferReceivedEvent = TypedEvent<
  [string, string, BigNumber, string],
  TransferReceivedEventObject
>;

export type TransferReceivedEventFilter =
  TypedEventFilter<TransferReceivedEvent>;

export interface TransferRetryEventObject {
  transferHash: string;
}
export type TransferRetryEvent = TypedEvent<[string], TransferRetryEventObject>;

export type TransferRetryEventFilter = TypedEventFilter<TransferRetryEvent>;

export interface UpdateInitiatedEventObject {
  humanityId: string;
  owner: string;
  expirationTime: BigNumber;
  gateway: string;
  claimed: boolean;
}
export type UpdateInitiatedEvent = TypedEvent<
  [string, string, BigNumber, string, boolean],
  UpdateInitiatedEventObject
>;

export type UpdateInitiatedEventFilter = TypedEventFilter<UpdateInitiatedEvent>;

export interface UpdateReceivedEventObject {
  humanityId: string;
  owner: string;
  expirationTime: BigNumber;
  claimed: boolean;
}
export type UpdateReceivedEvent = TypedEvent<
  [string, string, BigNumber, boolean],
  UpdateReceivedEventObject
>;

export type UpdateReceivedEventFilter = TypedEventFilter<UpdateReceivedEvent>;

export interface CrossChainProofOfHumanity extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CrossChainProofOfHumanityInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addBridgeGateway(
      _bridgeGateway: PromiseOrValue<string>,
      _foreignProxy: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    bridgeGateways(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string, boolean] & { foreignProxy: string; approved: boolean }>;

    changeGovernor(
      _governor: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    changeProofOfHumanity(
      _proofOfHumanity: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    governor(overrides?: CallOverrides): Promise<[string]>;

    humanityMapping(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [boolean, number, string, number] & {
        isHomeChain: boolean;
        expirationTime: number;
        owner: string;
        lastTransferTime: number;
      }
    >;

    humans(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    initialize(
      _proofOfHumanity: PromiseOrValue<string>,
      _transferCooldown: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    initialized(overrides?: CallOverrides): Promise<[boolean]>;

    isClaimed(
      _humanityId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isHuman(
      _owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    proofOfHumanity(overrides?: CallOverrides): Promise<[string]>;

    receiveTransfer(
      _owner: PromiseOrValue<string>,
      _humanityId: PromiseOrValue<BytesLike>,
      _expirationTime: PromiseOrValue<BigNumberish>,
      _transferHash: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    receiveUpdate(
      _owner: PromiseOrValue<string>,
      _humanityId: PromiseOrValue<BytesLike>,
      _expirationTime: PromiseOrValue<BigNumberish>,
      _isActive: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    receivedTransferHashes(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    removeBridgeGateway(
      _bridgeGateway: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    retryFailedTransfer(
      _humanityId: PromiseOrValue<BytesLike>,
      _bridgeGateway: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setTransferCooldown(
      _transferCooldown: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferCooldown(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferHumanity(
      _bridgeGateway: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transfers(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, string, string] & {
        humanityId: string;
        humanityExpirationTime: BigNumber;
        transferHash: string;
        foreignProxy: string;
      }
    >;

    updateHumanity(
      _bridgeGateway: PromiseOrValue<string>,
      _humanityId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  addBridgeGateway(
    _bridgeGateway: PromiseOrValue<string>,
    _foreignProxy: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  bridgeGateways(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<[string, boolean] & { foreignProxy: string; approved: boolean }>;

  changeGovernor(
    _governor: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  changeProofOfHumanity(
    _proofOfHumanity: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  governor(overrides?: CallOverrides): Promise<string>;

  humanityMapping(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<
    [boolean, number, string, number] & {
      isHomeChain: boolean;
      expirationTime: number;
      owner: string;
      lastTransferTime: number;
    }
  >;

  humans(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  initialize(
    _proofOfHumanity: PromiseOrValue<string>,
    _transferCooldown: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  initialized(overrides?: CallOverrides): Promise<boolean>;

  isClaimed(
    _humanityId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isHuman(
    _owner: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  proofOfHumanity(overrides?: CallOverrides): Promise<string>;

  receiveTransfer(
    _owner: PromiseOrValue<string>,
    _humanityId: PromiseOrValue<BytesLike>,
    _expirationTime: PromiseOrValue<BigNumberish>,
    _transferHash: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  receiveUpdate(
    _owner: PromiseOrValue<string>,
    _humanityId: PromiseOrValue<BytesLike>,
    _expirationTime: PromiseOrValue<BigNumberish>,
    _isActive: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  receivedTransferHashes(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  removeBridgeGateway(
    _bridgeGateway: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  retryFailedTransfer(
    _humanityId: PromiseOrValue<BytesLike>,
    _bridgeGateway: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setTransferCooldown(
    _transferCooldown: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferCooldown(overrides?: CallOverrides): Promise<BigNumber>;

  transferHumanity(
    _bridgeGateway: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transfers(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber, string, string] & {
      humanityId: string;
      humanityExpirationTime: BigNumber;
      transferHash: string;
      foreignProxy: string;
    }
  >;

  updateHumanity(
    _bridgeGateway: PromiseOrValue<string>,
    _humanityId: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addBridgeGateway(
      _bridgeGateway: PromiseOrValue<string>,
      _foreignProxy: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    bridgeGateways(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string, boolean] & { foreignProxy: string; approved: boolean }>;

    changeGovernor(
      _governor: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    changeProofOfHumanity(
      _proofOfHumanity: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    governor(overrides?: CallOverrides): Promise<string>;

    humanityMapping(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [boolean, number, string, number] & {
        isHomeChain: boolean;
        expirationTime: number;
        owner: string;
        lastTransferTime: number;
      }
    >;

    humans(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    initialize(
      _proofOfHumanity: PromiseOrValue<string>,
      _transferCooldown: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    initialized(overrides?: CallOverrides): Promise<boolean>;

    isClaimed(
      _humanityId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isHuman(
      _owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    proofOfHumanity(overrides?: CallOverrides): Promise<string>;

    receiveTransfer(
      _owner: PromiseOrValue<string>,
      _humanityId: PromiseOrValue<BytesLike>,
      _expirationTime: PromiseOrValue<BigNumberish>,
      _transferHash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    receiveUpdate(
      _owner: PromiseOrValue<string>,
      _humanityId: PromiseOrValue<BytesLike>,
      _expirationTime: PromiseOrValue<BigNumberish>,
      _isActive: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    receivedTransferHashes(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    removeBridgeGateway(
      _bridgeGateway: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    retryFailedTransfer(
      _humanityId: PromiseOrValue<BytesLike>,
      _bridgeGateway: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setTransferCooldown(
      _transferCooldown: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferCooldown(overrides?: CallOverrides): Promise<BigNumber>;

    transferHumanity(
      _bridgeGateway: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    transfers(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, string, string] & {
        humanityId: string;
        humanityExpirationTime: BigNumber;
        transferHash: string;
        foreignProxy: string;
      }
    >;

    updateHumanity(
      _bridgeGateway: PromiseOrValue<string>,
      _humanityId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "GatewayAdded(address,address)"(
      bridgeGateway?: PromiseOrValue<string> | null,
      foreignProxy?: null
    ): GatewayAddedEventFilter;
    GatewayAdded(
      bridgeGateway?: PromiseOrValue<string> | null,
      foreignProxy?: null
    ): GatewayAddedEventFilter;

    "GatewayRemoved(address)"(
      bridgeGateway?: PromiseOrValue<string> | null
    ): GatewayRemovedEventFilter;
    GatewayRemoved(
      bridgeGateway?: PromiseOrValue<string> | null
    ): GatewayRemovedEventFilter;

    "TransferInitiated(bytes20,address,uint160,address,bytes32)"(
      humanityId?: PromiseOrValue<BytesLike> | null,
      owner?: PromiseOrValue<string> | null,
      expirationTime?: null,
      gateway?: null,
      transferHash?: null
    ): TransferInitiatedEventFilter;
    TransferInitiated(
      humanityId?: PromiseOrValue<BytesLike> | null,
      owner?: PromiseOrValue<string> | null,
      expirationTime?: null,
      gateway?: null,
      transferHash?: null
    ): TransferInitiatedEventFilter;

    "TransferReceived(bytes20,address,uint160,bytes32)"(
      humanityId?: PromiseOrValue<BytesLike> | null,
      owner?: PromiseOrValue<string> | null,
      expirationTime?: null,
      transferHash?: null
    ): TransferReceivedEventFilter;
    TransferReceived(
      humanityId?: PromiseOrValue<BytesLike> | null,
      owner?: PromiseOrValue<string> | null,
      expirationTime?: null,
      transferHash?: null
    ): TransferReceivedEventFilter;

    "TransferRetry(bytes32)"(transferHash?: null): TransferRetryEventFilter;
    TransferRetry(transferHash?: null): TransferRetryEventFilter;

    "UpdateInitiated(bytes20,address,uint160,address,bool)"(
      humanityId?: PromiseOrValue<BytesLike> | null,
      owner?: PromiseOrValue<string> | null,
      expirationTime?: null,
      gateway?: null,
      claimed?: null
    ): UpdateInitiatedEventFilter;
    UpdateInitiated(
      humanityId?: PromiseOrValue<BytesLike> | null,
      owner?: PromiseOrValue<string> | null,
      expirationTime?: null,
      gateway?: null,
      claimed?: null
    ): UpdateInitiatedEventFilter;

    "UpdateReceived(bytes20,address,uint160,bool)"(
      humanityId?: PromiseOrValue<BytesLike> | null,
      owner?: PromiseOrValue<string> | null,
      expirationTime?: null,
      claimed?: null
    ): UpdateReceivedEventFilter;
    UpdateReceived(
      humanityId?: PromiseOrValue<BytesLike> | null,
      owner?: PromiseOrValue<string> | null,
      expirationTime?: null,
      claimed?: null
    ): UpdateReceivedEventFilter;
  };

  estimateGas: {
    addBridgeGateway(
      _bridgeGateway: PromiseOrValue<string>,
      _foreignProxy: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    bridgeGateways(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    changeGovernor(
      _governor: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    changeProofOfHumanity(
      _proofOfHumanity: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    governor(overrides?: CallOverrides): Promise<BigNumber>;

    humanityMapping(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    humans(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      _proofOfHumanity: PromiseOrValue<string>,
      _transferCooldown: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    initialized(overrides?: CallOverrides): Promise<BigNumber>;

    isClaimed(
      _humanityId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isHuman(
      _owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    proofOfHumanity(overrides?: CallOverrides): Promise<BigNumber>;

    receiveTransfer(
      _owner: PromiseOrValue<string>,
      _humanityId: PromiseOrValue<BytesLike>,
      _expirationTime: PromiseOrValue<BigNumberish>,
      _transferHash: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    receiveUpdate(
      _owner: PromiseOrValue<string>,
      _humanityId: PromiseOrValue<BytesLike>,
      _expirationTime: PromiseOrValue<BigNumberish>,
      _isActive: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    receivedTransferHashes(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    removeBridgeGateway(
      _bridgeGateway: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    retryFailedTransfer(
      _humanityId: PromiseOrValue<BytesLike>,
      _bridgeGateway: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setTransferCooldown(
      _transferCooldown: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferCooldown(overrides?: CallOverrides): Promise<BigNumber>;

    transferHumanity(
      _bridgeGateway: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transfers(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    updateHumanity(
      _bridgeGateway: PromiseOrValue<string>,
      _humanityId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addBridgeGateway(
      _bridgeGateway: PromiseOrValue<string>,
      _foreignProxy: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    bridgeGateways(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    changeGovernor(
      _governor: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    changeProofOfHumanity(
      _proofOfHumanity: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    governor(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    humanityMapping(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    humans(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      _proofOfHumanity: PromiseOrValue<string>,
      _transferCooldown: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    initialized(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isClaimed(
      _humanityId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isHuman(
      _owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    proofOfHumanity(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    receiveTransfer(
      _owner: PromiseOrValue<string>,
      _humanityId: PromiseOrValue<BytesLike>,
      _expirationTime: PromiseOrValue<BigNumberish>,
      _transferHash: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    receiveUpdate(
      _owner: PromiseOrValue<string>,
      _humanityId: PromiseOrValue<BytesLike>,
      _expirationTime: PromiseOrValue<BigNumberish>,
      _isActive: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    receivedTransferHashes(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    removeBridgeGateway(
      _bridgeGateway: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    retryFailedTransfer(
      _humanityId: PromiseOrValue<BytesLike>,
      _bridgeGateway: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setTransferCooldown(
      _transferCooldown: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferCooldown(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferHumanity(
      _bridgeGateway: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transfers(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    updateHumanity(
      _bridgeGateway: PromiseOrValue<string>,
      _humanityId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
