import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type ArbitratorData = {
  __typename?: 'ArbitratorData';
  arbitrator: Scalars['Bytes'];
  arbitratorExtraData: Scalars['Bytes'];
  clearingMeta: Scalars['String'];
  id: Scalars['Bytes'];
  registrationMeta: Scalars['String'];
};

export type ArbitratorData_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  arbitrator?: InputMaybe<Scalars['Bytes']>;
  arbitratorExtraData?: InputMaybe<Scalars['Bytes']>;
  arbitratorExtraData_contains?: InputMaybe<Scalars['Bytes']>;
  arbitratorExtraData_in?: InputMaybe<Array<Scalars['Bytes']>>;
  arbitratorExtraData_not?: InputMaybe<Scalars['Bytes']>;
  arbitratorExtraData_not_contains?: InputMaybe<Scalars['Bytes']>;
  arbitratorExtraData_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  arbitrator_contains?: InputMaybe<Scalars['Bytes']>;
  arbitrator_in?: InputMaybe<Array<Scalars['Bytes']>>;
  arbitrator_not?: InputMaybe<Scalars['Bytes']>;
  arbitrator_not_contains?: InputMaybe<Scalars['Bytes']>;
  arbitrator_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  clearingMeta?: InputMaybe<Scalars['String']>;
  clearingMeta_contains?: InputMaybe<Scalars['String']>;
  clearingMeta_contains_nocase?: InputMaybe<Scalars['String']>;
  clearingMeta_ends_with?: InputMaybe<Scalars['String']>;
  clearingMeta_ends_with_nocase?: InputMaybe<Scalars['String']>;
  clearingMeta_gt?: InputMaybe<Scalars['String']>;
  clearingMeta_gte?: InputMaybe<Scalars['String']>;
  clearingMeta_in?: InputMaybe<Array<Scalars['String']>>;
  clearingMeta_lt?: InputMaybe<Scalars['String']>;
  clearingMeta_lte?: InputMaybe<Scalars['String']>;
  clearingMeta_not?: InputMaybe<Scalars['String']>;
  clearingMeta_not_contains?: InputMaybe<Scalars['String']>;
  clearingMeta_not_contains_nocase?: InputMaybe<Scalars['String']>;
  clearingMeta_not_ends_with?: InputMaybe<Scalars['String']>;
  clearingMeta_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  clearingMeta_not_in?: InputMaybe<Array<Scalars['String']>>;
  clearingMeta_not_starts_with?: InputMaybe<Scalars['String']>;
  clearingMeta_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  clearingMeta_starts_with?: InputMaybe<Scalars['String']>;
  clearingMeta_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  registrationMeta?: InputMaybe<Scalars['String']>;
  registrationMeta_contains?: InputMaybe<Scalars['String']>;
  registrationMeta_contains_nocase?: InputMaybe<Scalars['String']>;
  registrationMeta_ends_with?: InputMaybe<Scalars['String']>;
  registrationMeta_ends_with_nocase?: InputMaybe<Scalars['String']>;
  registrationMeta_gt?: InputMaybe<Scalars['String']>;
  registrationMeta_gte?: InputMaybe<Scalars['String']>;
  registrationMeta_in?: InputMaybe<Array<Scalars['String']>>;
  registrationMeta_lt?: InputMaybe<Scalars['String']>;
  registrationMeta_lte?: InputMaybe<Scalars['String']>;
  registrationMeta_not?: InputMaybe<Scalars['String']>;
  registrationMeta_not_contains?: InputMaybe<Scalars['String']>;
  registrationMeta_not_contains_nocase?: InputMaybe<Scalars['String']>;
  registrationMeta_not_ends_with?: InputMaybe<Scalars['String']>;
  registrationMeta_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  registrationMeta_not_in?: InputMaybe<Array<Scalars['String']>>;
  registrationMeta_not_starts_with?: InputMaybe<Scalars['String']>;
  registrationMeta_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  registrationMeta_starts_with?: InputMaybe<Scalars['String']>;
  registrationMeta_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum ArbitratorData_OrderBy {
  Arbitrator = 'arbitrator',
  ArbitratorExtraData = 'arbitratorExtraData',
  ClearingMeta = 'clearingMeta',
  Id = 'id',
  RegistrationMeta = 'registrationMeta'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Challenge = {
  __typename?: 'Challenge';
  appealPeriodEnd: Scalars['BigInt'];
  appealPeriodStart: Scalars['BigInt'];
  challenger?: Maybe<Scalars['Bytes']>;
  creationTime: Scalars['BigInt'];
  disputeId: Scalars['BigInt'];
  id: Scalars['Bytes'];
  nbRounds: Scalars['BigInt'];
  reason: Reason;
  request: Request;
  rounds: Array<Round>;
  ruling: Party;
};


export type ChallengeRoundsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Round_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Round_Filter>;
};

export type Challenge_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  appealPeriodEnd?: InputMaybe<Scalars['BigInt']>;
  appealPeriodEnd_gt?: InputMaybe<Scalars['BigInt']>;
  appealPeriodEnd_gte?: InputMaybe<Scalars['BigInt']>;
  appealPeriodEnd_in?: InputMaybe<Array<Scalars['BigInt']>>;
  appealPeriodEnd_lt?: InputMaybe<Scalars['BigInt']>;
  appealPeriodEnd_lte?: InputMaybe<Scalars['BigInt']>;
  appealPeriodEnd_not?: InputMaybe<Scalars['BigInt']>;
  appealPeriodEnd_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  appealPeriodStart?: InputMaybe<Scalars['BigInt']>;
  appealPeriodStart_gt?: InputMaybe<Scalars['BigInt']>;
  appealPeriodStart_gte?: InputMaybe<Scalars['BigInt']>;
  appealPeriodStart_in?: InputMaybe<Array<Scalars['BigInt']>>;
  appealPeriodStart_lt?: InputMaybe<Scalars['BigInt']>;
  appealPeriodStart_lte?: InputMaybe<Scalars['BigInt']>;
  appealPeriodStart_not?: InputMaybe<Scalars['BigInt']>;
  appealPeriodStart_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  challenger?: InputMaybe<Scalars['Bytes']>;
  challenger_contains?: InputMaybe<Scalars['Bytes']>;
  challenger_in?: InputMaybe<Array<Scalars['Bytes']>>;
  challenger_not?: InputMaybe<Scalars['Bytes']>;
  challenger_not_contains?: InputMaybe<Scalars['Bytes']>;
  challenger_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  creationTime?: InputMaybe<Scalars['BigInt']>;
  creationTime_gt?: InputMaybe<Scalars['BigInt']>;
  creationTime_gte?: InputMaybe<Scalars['BigInt']>;
  creationTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  creationTime_lt?: InputMaybe<Scalars['BigInt']>;
  creationTime_lte?: InputMaybe<Scalars['BigInt']>;
  creationTime_not?: InputMaybe<Scalars['BigInt']>;
  creationTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  disputeId?: InputMaybe<Scalars['BigInt']>;
  disputeId_gt?: InputMaybe<Scalars['BigInt']>;
  disputeId_gte?: InputMaybe<Scalars['BigInt']>;
  disputeId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  disputeId_lt?: InputMaybe<Scalars['BigInt']>;
  disputeId_lte?: InputMaybe<Scalars['BigInt']>;
  disputeId_not?: InputMaybe<Scalars['BigInt']>;
  disputeId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  nbRounds?: InputMaybe<Scalars['BigInt']>;
  nbRounds_gt?: InputMaybe<Scalars['BigInt']>;
  nbRounds_gte?: InputMaybe<Scalars['BigInt']>;
  nbRounds_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nbRounds_lt?: InputMaybe<Scalars['BigInt']>;
  nbRounds_lte?: InputMaybe<Scalars['BigInt']>;
  nbRounds_not?: InputMaybe<Scalars['BigInt']>;
  nbRounds_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reason?: InputMaybe<Reason>;
  reason_in?: InputMaybe<Array<Reason>>;
  reason_not?: InputMaybe<Reason>;
  reason_not_in?: InputMaybe<Array<Reason>>;
  request?: InputMaybe<Scalars['String']>;
  request_?: InputMaybe<Request_Filter>;
  request_contains?: InputMaybe<Scalars['String']>;
  request_contains_nocase?: InputMaybe<Scalars['String']>;
  request_ends_with?: InputMaybe<Scalars['String']>;
  request_ends_with_nocase?: InputMaybe<Scalars['String']>;
  request_gt?: InputMaybe<Scalars['String']>;
  request_gte?: InputMaybe<Scalars['String']>;
  request_in?: InputMaybe<Array<Scalars['String']>>;
  request_lt?: InputMaybe<Scalars['String']>;
  request_lte?: InputMaybe<Scalars['String']>;
  request_not?: InputMaybe<Scalars['String']>;
  request_not_contains?: InputMaybe<Scalars['String']>;
  request_not_contains_nocase?: InputMaybe<Scalars['String']>;
  request_not_ends_with?: InputMaybe<Scalars['String']>;
  request_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  request_not_in?: InputMaybe<Array<Scalars['String']>>;
  request_not_starts_with?: InputMaybe<Scalars['String']>;
  request_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  request_starts_with?: InputMaybe<Scalars['String']>;
  request_starts_with_nocase?: InputMaybe<Scalars['String']>;
  rounds_?: InputMaybe<Round_Filter>;
  ruling?: InputMaybe<Party>;
  ruling_in?: InputMaybe<Array<Party>>;
  ruling_not?: InputMaybe<Party>;
  ruling_not_in?: InputMaybe<Array<Party>>;
};

export enum Challenge_OrderBy {
  AppealPeriodEnd = 'appealPeriodEnd',
  AppealPeriodStart = 'appealPeriodStart',
  Challenger = 'challenger',
  CreationTime = 'creationTime',
  DisputeId = 'disputeId',
  Id = 'id',
  NbRounds = 'nbRounds',
  Reason = 'reason',
  Request = 'request',
  Rounds = 'rounds',
  Ruling = 'ruling'
}

export type Claimer = {
  __typename?: 'Claimer';
  currentRequest?: Maybe<Request>;
  disputed: Scalars['Boolean'];
  hasSoul: Scalars['Boolean'];
  id: Scalars['Bytes'];
  lastRequestTime: Scalars['BigInt'];
  name?: Maybe<Scalars['String']>;
  soul?: Maybe<Soul>;
  targetSoul?: Maybe<Soul>;
  vouches: Array<Vouch>;
  vouchesReceived: Array<Vouch>;
};


export type ClaimerVouchesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vouch_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Vouch_Filter>;
};


export type ClaimerVouchesReceivedArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vouch_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Vouch_Filter>;
};

export type Claimer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  currentRequest?: InputMaybe<Scalars['String']>;
  currentRequest_?: InputMaybe<Request_Filter>;
  currentRequest_contains?: InputMaybe<Scalars['String']>;
  currentRequest_contains_nocase?: InputMaybe<Scalars['String']>;
  currentRequest_ends_with?: InputMaybe<Scalars['String']>;
  currentRequest_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentRequest_gt?: InputMaybe<Scalars['String']>;
  currentRequest_gte?: InputMaybe<Scalars['String']>;
  currentRequest_in?: InputMaybe<Array<Scalars['String']>>;
  currentRequest_lt?: InputMaybe<Scalars['String']>;
  currentRequest_lte?: InputMaybe<Scalars['String']>;
  currentRequest_not?: InputMaybe<Scalars['String']>;
  currentRequest_not_contains?: InputMaybe<Scalars['String']>;
  currentRequest_not_contains_nocase?: InputMaybe<Scalars['String']>;
  currentRequest_not_ends_with?: InputMaybe<Scalars['String']>;
  currentRequest_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentRequest_not_in?: InputMaybe<Array<Scalars['String']>>;
  currentRequest_not_starts_with?: InputMaybe<Scalars['String']>;
  currentRequest_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currentRequest_starts_with?: InputMaybe<Scalars['String']>;
  currentRequest_starts_with_nocase?: InputMaybe<Scalars['String']>;
  disputed?: InputMaybe<Scalars['Boolean']>;
  disputed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  disputed_not?: InputMaybe<Scalars['Boolean']>;
  disputed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  hasSoul?: InputMaybe<Scalars['Boolean']>;
  hasSoul_in?: InputMaybe<Array<Scalars['Boolean']>>;
  hasSoul_not?: InputMaybe<Scalars['Boolean']>;
  hasSoul_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  lastRequestTime?: InputMaybe<Scalars['BigInt']>;
  lastRequestTime_gt?: InputMaybe<Scalars['BigInt']>;
  lastRequestTime_gte?: InputMaybe<Scalars['BigInt']>;
  lastRequestTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastRequestTime_lt?: InputMaybe<Scalars['BigInt']>;
  lastRequestTime_lte?: InputMaybe<Scalars['BigInt']>;
  lastRequestTime_not?: InputMaybe<Scalars['BigInt']>;
  lastRequestTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  soul_?: InputMaybe<Soul_Filter>;
  targetSoul?: InputMaybe<Scalars['String']>;
  targetSoul_?: InputMaybe<Soul_Filter>;
  targetSoul_contains?: InputMaybe<Scalars['String']>;
  targetSoul_contains_nocase?: InputMaybe<Scalars['String']>;
  targetSoul_ends_with?: InputMaybe<Scalars['String']>;
  targetSoul_ends_with_nocase?: InputMaybe<Scalars['String']>;
  targetSoul_gt?: InputMaybe<Scalars['String']>;
  targetSoul_gte?: InputMaybe<Scalars['String']>;
  targetSoul_in?: InputMaybe<Array<Scalars['String']>>;
  targetSoul_lt?: InputMaybe<Scalars['String']>;
  targetSoul_lte?: InputMaybe<Scalars['String']>;
  targetSoul_not?: InputMaybe<Scalars['String']>;
  targetSoul_not_contains?: InputMaybe<Scalars['String']>;
  targetSoul_not_contains_nocase?: InputMaybe<Scalars['String']>;
  targetSoul_not_ends_with?: InputMaybe<Scalars['String']>;
  targetSoul_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  targetSoul_not_in?: InputMaybe<Array<Scalars['String']>>;
  targetSoul_not_starts_with?: InputMaybe<Scalars['String']>;
  targetSoul_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  targetSoul_starts_with?: InputMaybe<Scalars['String']>;
  targetSoul_starts_with_nocase?: InputMaybe<Scalars['String']>;
  vouchesReceived?: InputMaybe<Array<Scalars['String']>>;
  vouchesReceived_?: InputMaybe<Vouch_Filter>;
  vouchesReceived_contains?: InputMaybe<Array<Scalars['String']>>;
  vouchesReceived_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  vouchesReceived_not?: InputMaybe<Array<Scalars['String']>>;
  vouchesReceived_not_contains?: InputMaybe<Array<Scalars['String']>>;
  vouchesReceived_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  vouches_?: InputMaybe<Vouch_Filter>;
};

export enum Claimer_OrderBy {
  CurrentRequest = 'currentRequest',
  Disputed = 'disputed',
  HasSoul = 'hasSoul',
  Id = 'id',
  LastRequestTime = 'lastRequestTime',
  Name = 'name',
  Soul = 'soul',
  TargetSoul = 'targetSoul',
  Vouches = 'vouches',
  VouchesReceived = 'vouchesReceived'
}

export type Contract = {
  __typename?: 'Contract';
  address: Scalars['Bytes'];
  challengePeriodDuration: Scalars['BigInt'];
  governor: Scalars['Bytes'];
  id: Scalars['Bytes'];
  latestArbitratorData: ArbitratorData;
  loserStakeMultiplier: Scalars['BigInt'];
  metaEvidenceUpdates: Scalars['BigInt'];
  renewalTime: Scalars['BigInt'];
  requestBaseDeposit: Scalars['BigInt'];
  requiredNumberOfVouches: Scalars['BigInt'];
  sharedStakeMultiplier: Scalars['BigInt'];
  soulLifespan: Scalars['BigInt'];
  winnerStakeMultiplier: Scalars['BigInt'];
};

export type Contract_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['Bytes']>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  challengePeriodDuration?: InputMaybe<Scalars['BigInt']>;
  challengePeriodDuration_gt?: InputMaybe<Scalars['BigInt']>;
  challengePeriodDuration_gte?: InputMaybe<Scalars['BigInt']>;
  challengePeriodDuration_in?: InputMaybe<Array<Scalars['BigInt']>>;
  challengePeriodDuration_lt?: InputMaybe<Scalars['BigInt']>;
  challengePeriodDuration_lte?: InputMaybe<Scalars['BigInt']>;
  challengePeriodDuration_not?: InputMaybe<Scalars['BigInt']>;
  challengePeriodDuration_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  governor?: InputMaybe<Scalars['Bytes']>;
  governor_contains?: InputMaybe<Scalars['Bytes']>;
  governor_in?: InputMaybe<Array<Scalars['Bytes']>>;
  governor_not?: InputMaybe<Scalars['Bytes']>;
  governor_not_contains?: InputMaybe<Scalars['Bytes']>;
  governor_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  latestArbitratorData?: InputMaybe<Scalars['String']>;
  latestArbitratorData_?: InputMaybe<ArbitratorData_Filter>;
  latestArbitratorData_contains?: InputMaybe<Scalars['String']>;
  latestArbitratorData_contains_nocase?: InputMaybe<Scalars['String']>;
  latestArbitratorData_ends_with?: InputMaybe<Scalars['String']>;
  latestArbitratorData_ends_with_nocase?: InputMaybe<Scalars['String']>;
  latestArbitratorData_gt?: InputMaybe<Scalars['String']>;
  latestArbitratorData_gte?: InputMaybe<Scalars['String']>;
  latestArbitratorData_in?: InputMaybe<Array<Scalars['String']>>;
  latestArbitratorData_lt?: InputMaybe<Scalars['String']>;
  latestArbitratorData_lte?: InputMaybe<Scalars['String']>;
  latestArbitratorData_not?: InputMaybe<Scalars['String']>;
  latestArbitratorData_not_contains?: InputMaybe<Scalars['String']>;
  latestArbitratorData_not_contains_nocase?: InputMaybe<Scalars['String']>;
  latestArbitratorData_not_ends_with?: InputMaybe<Scalars['String']>;
  latestArbitratorData_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  latestArbitratorData_not_in?: InputMaybe<Array<Scalars['String']>>;
  latestArbitratorData_not_starts_with?: InputMaybe<Scalars['String']>;
  latestArbitratorData_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  latestArbitratorData_starts_with?: InputMaybe<Scalars['String']>;
  latestArbitratorData_starts_with_nocase?: InputMaybe<Scalars['String']>;
  loserStakeMultiplier?: InputMaybe<Scalars['BigInt']>;
  loserStakeMultiplier_gt?: InputMaybe<Scalars['BigInt']>;
  loserStakeMultiplier_gte?: InputMaybe<Scalars['BigInt']>;
  loserStakeMultiplier_in?: InputMaybe<Array<Scalars['BigInt']>>;
  loserStakeMultiplier_lt?: InputMaybe<Scalars['BigInt']>;
  loserStakeMultiplier_lte?: InputMaybe<Scalars['BigInt']>;
  loserStakeMultiplier_not?: InputMaybe<Scalars['BigInt']>;
  loserStakeMultiplier_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  metaEvidenceUpdates?: InputMaybe<Scalars['BigInt']>;
  metaEvidenceUpdates_gt?: InputMaybe<Scalars['BigInt']>;
  metaEvidenceUpdates_gte?: InputMaybe<Scalars['BigInt']>;
  metaEvidenceUpdates_in?: InputMaybe<Array<Scalars['BigInt']>>;
  metaEvidenceUpdates_lt?: InputMaybe<Scalars['BigInt']>;
  metaEvidenceUpdates_lte?: InputMaybe<Scalars['BigInt']>;
  metaEvidenceUpdates_not?: InputMaybe<Scalars['BigInt']>;
  metaEvidenceUpdates_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  renewalTime?: InputMaybe<Scalars['BigInt']>;
  renewalTime_gt?: InputMaybe<Scalars['BigInt']>;
  renewalTime_gte?: InputMaybe<Scalars['BigInt']>;
  renewalTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  renewalTime_lt?: InputMaybe<Scalars['BigInt']>;
  renewalTime_lte?: InputMaybe<Scalars['BigInt']>;
  renewalTime_not?: InputMaybe<Scalars['BigInt']>;
  renewalTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  requestBaseDeposit?: InputMaybe<Scalars['BigInt']>;
  requestBaseDeposit_gt?: InputMaybe<Scalars['BigInt']>;
  requestBaseDeposit_gte?: InputMaybe<Scalars['BigInt']>;
  requestBaseDeposit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  requestBaseDeposit_lt?: InputMaybe<Scalars['BigInt']>;
  requestBaseDeposit_lte?: InputMaybe<Scalars['BigInt']>;
  requestBaseDeposit_not?: InputMaybe<Scalars['BigInt']>;
  requestBaseDeposit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  requiredNumberOfVouches?: InputMaybe<Scalars['BigInt']>;
  requiredNumberOfVouches_gt?: InputMaybe<Scalars['BigInt']>;
  requiredNumberOfVouches_gte?: InputMaybe<Scalars['BigInt']>;
  requiredNumberOfVouches_in?: InputMaybe<Array<Scalars['BigInt']>>;
  requiredNumberOfVouches_lt?: InputMaybe<Scalars['BigInt']>;
  requiredNumberOfVouches_lte?: InputMaybe<Scalars['BigInt']>;
  requiredNumberOfVouches_not?: InputMaybe<Scalars['BigInt']>;
  requiredNumberOfVouches_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sharedStakeMultiplier?: InputMaybe<Scalars['BigInt']>;
  sharedStakeMultiplier_gt?: InputMaybe<Scalars['BigInt']>;
  sharedStakeMultiplier_gte?: InputMaybe<Scalars['BigInt']>;
  sharedStakeMultiplier_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sharedStakeMultiplier_lt?: InputMaybe<Scalars['BigInt']>;
  sharedStakeMultiplier_lte?: InputMaybe<Scalars['BigInt']>;
  sharedStakeMultiplier_not?: InputMaybe<Scalars['BigInt']>;
  sharedStakeMultiplier_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  soulLifespan?: InputMaybe<Scalars['BigInt']>;
  soulLifespan_gt?: InputMaybe<Scalars['BigInt']>;
  soulLifespan_gte?: InputMaybe<Scalars['BigInt']>;
  soulLifespan_in?: InputMaybe<Array<Scalars['BigInt']>>;
  soulLifespan_lt?: InputMaybe<Scalars['BigInt']>;
  soulLifespan_lte?: InputMaybe<Scalars['BigInt']>;
  soulLifespan_not?: InputMaybe<Scalars['BigInt']>;
  soulLifespan_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  winnerStakeMultiplier?: InputMaybe<Scalars['BigInt']>;
  winnerStakeMultiplier_gt?: InputMaybe<Scalars['BigInt']>;
  winnerStakeMultiplier_gte?: InputMaybe<Scalars['BigInt']>;
  winnerStakeMultiplier_in?: InputMaybe<Array<Scalars['BigInt']>>;
  winnerStakeMultiplier_lt?: InputMaybe<Scalars['BigInt']>;
  winnerStakeMultiplier_lte?: InputMaybe<Scalars['BigInt']>;
  winnerStakeMultiplier_not?: InputMaybe<Scalars['BigInt']>;
  winnerStakeMultiplier_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Contract_OrderBy {
  Address = 'address',
  ChallengePeriodDuration = 'challengePeriodDuration',
  Governor = 'governor',
  Id = 'id',
  LatestArbitratorData = 'latestArbitratorData',
  LoserStakeMultiplier = 'loserStakeMultiplier',
  MetaEvidenceUpdates = 'metaEvidenceUpdates',
  RenewalTime = 'renewalTime',
  RequestBaseDeposit = 'requestBaseDeposit',
  RequiredNumberOfVouches = 'requiredNumberOfVouches',
  SharedStakeMultiplier = 'sharedStakeMultiplier',
  SoulLifespan = 'soulLifespan',
  WinnerStakeMultiplier = 'winnerStakeMultiplier'
}

export type Contribution = {
  __typename?: 'Contribution';
  contributor: Scalars['Bytes'];
  forChallenger: Scalars['BigInt'];
  forRequester: Scalars['BigInt'];
  id: Scalars['Bytes'];
  round: Round;
};

export type Contribution_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  contributor?: InputMaybe<Scalars['Bytes']>;
  contributor_contains?: InputMaybe<Scalars['Bytes']>;
  contributor_in?: InputMaybe<Array<Scalars['Bytes']>>;
  contributor_not?: InputMaybe<Scalars['Bytes']>;
  contributor_not_contains?: InputMaybe<Scalars['Bytes']>;
  contributor_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  forChallenger?: InputMaybe<Scalars['BigInt']>;
  forChallenger_gt?: InputMaybe<Scalars['BigInt']>;
  forChallenger_gte?: InputMaybe<Scalars['BigInt']>;
  forChallenger_in?: InputMaybe<Array<Scalars['BigInt']>>;
  forChallenger_lt?: InputMaybe<Scalars['BigInt']>;
  forChallenger_lte?: InputMaybe<Scalars['BigInt']>;
  forChallenger_not?: InputMaybe<Scalars['BigInt']>;
  forChallenger_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  forRequester?: InputMaybe<Scalars['BigInt']>;
  forRequester_gt?: InputMaybe<Scalars['BigInt']>;
  forRequester_gte?: InputMaybe<Scalars['BigInt']>;
  forRequester_in?: InputMaybe<Array<Scalars['BigInt']>>;
  forRequester_lt?: InputMaybe<Scalars['BigInt']>;
  forRequester_lte?: InputMaybe<Scalars['BigInt']>;
  forRequester_not?: InputMaybe<Scalars['BigInt']>;
  forRequester_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  round?: InputMaybe<Scalars['String']>;
  round_?: InputMaybe<Round_Filter>;
  round_contains?: InputMaybe<Scalars['String']>;
  round_contains_nocase?: InputMaybe<Scalars['String']>;
  round_ends_with?: InputMaybe<Scalars['String']>;
  round_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_gt?: InputMaybe<Scalars['String']>;
  round_gte?: InputMaybe<Scalars['String']>;
  round_in?: InputMaybe<Array<Scalars['String']>>;
  round_lt?: InputMaybe<Scalars['String']>;
  round_lte?: InputMaybe<Scalars['String']>;
  round_not?: InputMaybe<Scalars['String']>;
  round_not_contains?: InputMaybe<Scalars['String']>;
  round_not_contains_nocase?: InputMaybe<Scalars['String']>;
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  round_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_in?: InputMaybe<Array<Scalars['String']>>;
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  round_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_starts_with?: InputMaybe<Scalars['String']>;
  round_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Contribution_OrderBy {
  Contributor = 'contributor',
  ForChallenger = 'forChallenger',
  ForRequester = 'forRequester',
  Id = 'id',
  Round = 'round'
}

export type Counter = {
  __typename?: 'Counter';
  challengedClaims: Scalars['BigInt'];
  challengedRevokal: Scalars['BigInt'];
  expired: Scalars['BigInt'];
  id: Scalars['Bytes'];
  pendingClaims: Scalars['BigInt'];
  pendingRevokals: Scalars['BigInt'];
  registered: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  vouching: Scalars['BigInt'];
};

export type Counter_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  challengedClaims?: InputMaybe<Scalars['BigInt']>;
  challengedClaims_gt?: InputMaybe<Scalars['BigInt']>;
  challengedClaims_gte?: InputMaybe<Scalars['BigInt']>;
  challengedClaims_in?: InputMaybe<Array<Scalars['BigInt']>>;
  challengedClaims_lt?: InputMaybe<Scalars['BigInt']>;
  challengedClaims_lte?: InputMaybe<Scalars['BigInt']>;
  challengedClaims_not?: InputMaybe<Scalars['BigInt']>;
  challengedClaims_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  challengedRevokal?: InputMaybe<Scalars['BigInt']>;
  challengedRevokal_gt?: InputMaybe<Scalars['BigInt']>;
  challengedRevokal_gte?: InputMaybe<Scalars['BigInt']>;
  challengedRevokal_in?: InputMaybe<Array<Scalars['BigInt']>>;
  challengedRevokal_lt?: InputMaybe<Scalars['BigInt']>;
  challengedRevokal_lte?: InputMaybe<Scalars['BigInt']>;
  challengedRevokal_not?: InputMaybe<Scalars['BigInt']>;
  challengedRevokal_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expired?: InputMaybe<Scalars['BigInt']>;
  expired_gt?: InputMaybe<Scalars['BigInt']>;
  expired_gte?: InputMaybe<Scalars['BigInt']>;
  expired_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expired_lt?: InputMaybe<Scalars['BigInt']>;
  expired_lte?: InputMaybe<Scalars['BigInt']>;
  expired_not?: InputMaybe<Scalars['BigInt']>;
  expired_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  pendingClaims?: InputMaybe<Scalars['BigInt']>;
  pendingClaims_gt?: InputMaybe<Scalars['BigInt']>;
  pendingClaims_gte?: InputMaybe<Scalars['BigInt']>;
  pendingClaims_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pendingClaims_lt?: InputMaybe<Scalars['BigInt']>;
  pendingClaims_lte?: InputMaybe<Scalars['BigInt']>;
  pendingClaims_not?: InputMaybe<Scalars['BigInt']>;
  pendingClaims_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pendingRevokals?: InputMaybe<Scalars['BigInt']>;
  pendingRevokals_gt?: InputMaybe<Scalars['BigInt']>;
  pendingRevokals_gte?: InputMaybe<Scalars['BigInt']>;
  pendingRevokals_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pendingRevokals_lt?: InputMaybe<Scalars['BigInt']>;
  pendingRevokals_lte?: InputMaybe<Scalars['BigInt']>;
  pendingRevokals_not?: InputMaybe<Scalars['BigInt']>;
  pendingRevokals_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  registered?: InputMaybe<Scalars['BigInt']>;
  registered_gt?: InputMaybe<Scalars['BigInt']>;
  registered_gte?: InputMaybe<Scalars['BigInt']>;
  registered_in?: InputMaybe<Array<Scalars['BigInt']>>;
  registered_lt?: InputMaybe<Scalars['BigInt']>;
  registered_lte?: InputMaybe<Scalars['BigInt']>;
  registered_not?: InputMaybe<Scalars['BigInt']>;
  registered_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  removed?: InputMaybe<Scalars['BigInt']>;
  removed_gt?: InputMaybe<Scalars['BigInt']>;
  removed_gte?: InputMaybe<Scalars['BigInt']>;
  removed_in?: InputMaybe<Array<Scalars['BigInt']>>;
  removed_lt?: InputMaybe<Scalars['BigInt']>;
  removed_lte?: InputMaybe<Scalars['BigInt']>;
  removed_not?: InputMaybe<Scalars['BigInt']>;
  removed_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  vouching?: InputMaybe<Scalars['BigInt']>;
  vouching_gt?: InputMaybe<Scalars['BigInt']>;
  vouching_gte?: InputMaybe<Scalars['BigInt']>;
  vouching_in?: InputMaybe<Array<Scalars['BigInt']>>;
  vouching_lt?: InputMaybe<Scalars['BigInt']>;
  vouching_lte?: InputMaybe<Scalars['BigInt']>;
  vouching_not?: InputMaybe<Scalars['BigInt']>;
  vouching_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Counter_OrderBy {
  ChallengedClaims = 'challengedClaims',
  ChallengedRevokal = 'challengedRevokal',
  Expired = 'expired',
  Id = 'id',
  PendingClaims = 'pendingClaims',
  PendingRevokals = 'pendingRevokals',
  Registered = 'registered',
  Removed = 'removed',
  Vouching = 'vouching'
}

export type Evidence = {
  __typename?: 'Evidence';
  URI: Scalars['String'];
  creationTime: Scalars['BigInt'];
  id: Scalars['Bytes'];
  request: Request;
  sender: Scalars['Bytes'];
};

export type Evidence_Filter = {
  URI?: InputMaybe<Scalars['String']>;
  URI_contains?: InputMaybe<Scalars['String']>;
  URI_contains_nocase?: InputMaybe<Scalars['String']>;
  URI_ends_with?: InputMaybe<Scalars['String']>;
  URI_ends_with_nocase?: InputMaybe<Scalars['String']>;
  URI_gt?: InputMaybe<Scalars['String']>;
  URI_gte?: InputMaybe<Scalars['String']>;
  URI_in?: InputMaybe<Array<Scalars['String']>>;
  URI_lt?: InputMaybe<Scalars['String']>;
  URI_lte?: InputMaybe<Scalars['String']>;
  URI_not?: InputMaybe<Scalars['String']>;
  URI_not_contains?: InputMaybe<Scalars['String']>;
  URI_not_contains_nocase?: InputMaybe<Scalars['String']>;
  URI_not_ends_with?: InputMaybe<Scalars['String']>;
  URI_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  URI_not_in?: InputMaybe<Array<Scalars['String']>>;
  URI_not_starts_with?: InputMaybe<Scalars['String']>;
  URI_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  URI_starts_with?: InputMaybe<Scalars['String']>;
  URI_starts_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  creationTime?: InputMaybe<Scalars['BigInt']>;
  creationTime_gt?: InputMaybe<Scalars['BigInt']>;
  creationTime_gte?: InputMaybe<Scalars['BigInt']>;
  creationTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  creationTime_lt?: InputMaybe<Scalars['BigInt']>;
  creationTime_lte?: InputMaybe<Scalars['BigInt']>;
  creationTime_not?: InputMaybe<Scalars['BigInt']>;
  creationTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  request?: InputMaybe<Scalars['String']>;
  request_?: InputMaybe<Request_Filter>;
  request_contains?: InputMaybe<Scalars['String']>;
  request_contains_nocase?: InputMaybe<Scalars['String']>;
  request_ends_with?: InputMaybe<Scalars['String']>;
  request_ends_with_nocase?: InputMaybe<Scalars['String']>;
  request_gt?: InputMaybe<Scalars['String']>;
  request_gte?: InputMaybe<Scalars['String']>;
  request_in?: InputMaybe<Array<Scalars['String']>>;
  request_lt?: InputMaybe<Scalars['String']>;
  request_lte?: InputMaybe<Scalars['String']>;
  request_not?: InputMaybe<Scalars['String']>;
  request_not_contains?: InputMaybe<Scalars['String']>;
  request_not_contains_nocase?: InputMaybe<Scalars['String']>;
  request_not_ends_with?: InputMaybe<Scalars['String']>;
  request_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  request_not_in?: InputMaybe<Array<Scalars['String']>>;
  request_not_starts_with?: InputMaybe<Scalars['String']>;
  request_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  request_starts_with?: InputMaybe<Scalars['String']>;
  request_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sender?: InputMaybe<Scalars['Bytes']>;
  sender_contains?: InputMaybe<Scalars['Bytes']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sender_not?: InputMaybe<Scalars['Bytes']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum Evidence_OrderBy {
  Uri = 'URI',
  CreationTime = 'creationTime',
  Id = 'id',
  Request = 'request',
  Sender = 'sender'
}

export enum OldSubmissionStatus {
  None = 'None',
  PendingRegistration = 'PendingRegistration',
  PendingRemoval = 'PendingRemoval',
  Vouching = 'Vouching'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export enum Party {
  Challenger = 'Challenger',
  None = 'None',
  Requester = 'Requester'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  arbitratorData?: Maybe<ArbitratorData>;
  arbitratorDatas: Array<ArbitratorData>;
  challenge?: Maybe<Challenge>;
  challenges: Array<Challenge>;
  claimer?: Maybe<Claimer>;
  claimers: Array<Claimer>;
  contract?: Maybe<Contract>;
  contracts: Array<Contract>;
  contribution?: Maybe<Contribution>;
  contributions: Array<Contribution>;
  counter?: Maybe<Counter>;
  counters: Array<Counter>;
  evidence?: Maybe<Evidence>;
  evidences: Array<Evidence>;
  request?: Maybe<Request>;
  requests: Array<Request>;
  round?: Maybe<Round>;
  rounds: Array<Round>;
  soul?: Maybe<Soul>;
  souls: Array<Soul>;
  submissionSearch: Array<Claimer>;
  vouch?: Maybe<Vouch>;
  vouches: Array<Vouch>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryArbitratorDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryArbitratorDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ArbitratorData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ArbitratorData_Filter>;
};


export type QueryChallengeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryChallengesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Challenge_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Challenge_Filter>;
};


export type QueryClaimerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryClaimersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Claimer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Claimer_Filter>;
};


export type QueryContractArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryContractsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Contract_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Contract_Filter>;
};


export type QueryContributionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryContributionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Contribution_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Contribution_Filter>;
};


export type QueryCounterArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCountersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Counter_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Counter_Filter>;
};


export type QueryEvidenceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryEvidencesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Evidence_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Evidence_Filter>;
};


export type QueryRequestArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRequestsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Request_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Request_Filter>;
};


export type QueryRoundArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRoundsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Round_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Round_Filter>;
};


export type QuerySoulArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerySoulsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Soul_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Soul_Filter>;
};


export type QuerySubmissionSearchArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  text: Scalars['String'];
};


export type QueryVouchArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryVouchesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vouch_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Vouch_Filter>;
};

export enum Reason {
  Deceased = 'Deceased',
  DoesNotExist = 'DoesNotExist',
  Duplicate = 'Duplicate',
  IncorrectSubmission = 'IncorrectSubmission',
  None = 'None'
}

export type Request = {
  __typename?: 'Request';
  arbitratorData: ArbitratorData;
  challengePeriodEnd: Scalars['BigInt'];
  challenges: Array<Challenge>;
  claimer?: Maybe<Claimer>;
  creationTime: Scalars['BigInt'];
  currentReason: Reason;
  evidence: Array<Evidence>;
  id: Scalars['Bytes'];
  index: Scalars['BigInt'];
  lastProcessedVouchIndex: Scalars['BigInt'];
  lastStatusChange: Scalars['BigInt'];
  nbChallenges: Scalars['BigInt'];
  nbEvidence: Scalars['BigInt'];
  registration: Scalars['Boolean'];
  requester: Scalars['Bytes'];
  requesterLost: Scalars['Boolean'];
  resolutionTime: Scalars['BigInt'];
  soul: Soul;
  status: Status;
  ultimateChallenger?: Maybe<Scalars['Bytes']>;
  usedReasons: Array<Reason>;
  vouches: Array<Vouch>;
};


export type RequestChallengesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Challenge_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Challenge_Filter>;
};


export type RequestEvidenceArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Evidence_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Evidence_Filter>;
};


export type RequestVouchesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vouch_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Vouch_Filter>;
};

export type Request_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  arbitratorData?: InputMaybe<Scalars['String']>;
  arbitratorData_?: InputMaybe<ArbitratorData_Filter>;
  arbitratorData_contains?: InputMaybe<Scalars['String']>;
  arbitratorData_contains_nocase?: InputMaybe<Scalars['String']>;
  arbitratorData_ends_with?: InputMaybe<Scalars['String']>;
  arbitratorData_ends_with_nocase?: InputMaybe<Scalars['String']>;
  arbitratorData_gt?: InputMaybe<Scalars['String']>;
  arbitratorData_gte?: InputMaybe<Scalars['String']>;
  arbitratorData_in?: InputMaybe<Array<Scalars['String']>>;
  arbitratorData_lt?: InputMaybe<Scalars['String']>;
  arbitratorData_lte?: InputMaybe<Scalars['String']>;
  arbitratorData_not?: InputMaybe<Scalars['String']>;
  arbitratorData_not_contains?: InputMaybe<Scalars['String']>;
  arbitratorData_not_contains_nocase?: InputMaybe<Scalars['String']>;
  arbitratorData_not_ends_with?: InputMaybe<Scalars['String']>;
  arbitratorData_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  arbitratorData_not_in?: InputMaybe<Array<Scalars['String']>>;
  arbitratorData_not_starts_with?: InputMaybe<Scalars['String']>;
  arbitratorData_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  arbitratorData_starts_with?: InputMaybe<Scalars['String']>;
  arbitratorData_starts_with_nocase?: InputMaybe<Scalars['String']>;
  challengePeriodEnd?: InputMaybe<Scalars['BigInt']>;
  challengePeriodEnd_gt?: InputMaybe<Scalars['BigInt']>;
  challengePeriodEnd_gte?: InputMaybe<Scalars['BigInt']>;
  challengePeriodEnd_in?: InputMaybe<Array<Scalars['BigInt']>>;
  challengePeriodEnd_lt?: InputMaybe<Scalars['BigInt']>;
  challengePeriodEnd_lte?: InputMaybe<Scalars['BigInt']>;
  challengePeriodEnd_not?: InputMaybe<Scalars['BigInt']>;
  challengePeriodEnd_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  challenges_?: InputMaybe<Challenge_Filter>;
  claimer_?: InputMaybe<Claimer_Filter>;
  creationTime?: InputMaybe<Scalars['BigInt']>;
  creationTime_gt?: InputMaybe<Scalars['BigInt']>;
  creationTime_gte?: InputMaybe<Scalars['BigInt']>;
  creationTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  creationTime_lt?: InputMaybe<Scalars['BigInt']>;
  creationTime_lte?: InputMaybe<Scalars['BigInt']>;
  creationTime_not?: InputMaybe<Scalars['BigInt']>;
  creationTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currentReason?: InputMaybe<Reason>;
  currentReason_in?: InputMaybe<Array<Reason>>;
  currentReason_not?: InputMaybe<Reason>;
  currentReason_not_in?: InputMaybe<Array<Reason>>;
  evidence_?: InputMaybe<Evidence_Filter>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastProcessedVouchIndex?: InputMaybe<Scalars['BigInt']>;
  lastProcessedVouchIndex_gt?: InputMaybe<Scalars['BigInt']>;
  lastProcessedVouchIndex_gte?: InputMaybe<Scalars['BigInt']>;
  lastProcessedVouchIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastProcessedVouchIndex_lt?: InputMaybe<Scalars['BigInt']>;
  lastProcessedVouchIndex_lte?: InputMaybe<Scalars['BigInt']>;
  lastProcessedVouchIndex_not?: InputMaybe<Scalars['BigInt']>;
  lastProcessedVouchIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastStatusChange?: InputMaybe<Scalars['BigInt']>;
  lastStatusChange_gt?: InputMaybe<Scalars['BigInt']>;
  lastStatusChange_gte?: InputMaybe<Scalars['BigInt']>;
  lastStatusChange_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastStatusChange_lt?: InputMaybe<Scalars['BigInt']>;
  lastStatusChange_lte?: InputMaybe<Scalars['BigInt']>;
  lastStatusChange_not?: InputMaybe<Scalars['BigInt']>;
  lastStatusChange_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nbChallenges?: InputMaybe<Scalars['BigInt']>;
  nbChallenges_gt?: InputMaybe<Scalars['BigInt']>;
  nbChallenges_gte?: InputMaybe<Scalars['BigInt']>;
  nbChallenges_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nbChallenges_lt?: InputMaybe<Scalars['BigInt']>;
  nbChallenges_lte?: InputMaybe<Scalars['BigInt']>;
  nbChallenges_not?: InputMaybe<Scalars['BigInt']>;
  nbChallenges_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nbEvidence?: InputMaybe<Scalars['BigInt']>;
  nbEvidence_gt?: InputMaybe<Scalars['BigInt']>;
  nbEvidence_gte?: InputMaybe<Scalars['BigInt']>;
  nbEvidence_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nbEvidence_lt?: InputMaybe<Scalars['BigInt']>;
  nbEvidence_lte?: InputMaybe<Scalars['BigInt']>;
  nbEvidence_not?: InputMaybe<Scalars['BigInt']>;
  nbEvidence_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  registration?: InputMaybe<Scalars['Boolean']>;
  registration_in?: InputMaybe<Array<Scalars['Boolean']>>;
  registration_not?: InputMaybe<Scalars['Boolean']>;
  registration_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  requester?: InputMaybe<Scalars['Bytes']>;
  requesterLost?: InputMaybe<Scalars['Boolean']>;
  requesterLost_in?: InputMaybe<Array<Scalars['Boolean']>>;
  requesterLost_not?: InputMaybe<Scalars['Boolean']>;
  requesterLost_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  requester_contains?: InputMaybe<Scalars['Bytes']>;
  requester_in?: InputMaybe<Array<Scalars['Bytes']>>;
  requester_not?: InputMaybe<Scalars['Bytes']>;
  requester_not_contains?: InputMaybe<Scalars['Bytes']>;
  requester_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  resolutionTime?: InputMaybe<Scalars['BigInt']>;
  resolutionTime_gt?: InputMaybe<Scalars['BigInt']>;
  resolutionTime_gte?: InputMaybe<Scalars['BigInt']>;
  resolutionTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  resolutionTime_lt?: InputMaybe<Scalars['BigInt']>;
  resolutionTime_lte?: InputMaybe<Scalars['BigInt']>;
  resolutionTime_not?: InputMaybe<Scalars['BigInt']>;
  resolutionTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  soul?: InputMaybe<Scalars['String']>;
  soul_?: InputMaybe<Soul_Filter>;
  soul_contains?: InputMaybe<Scalars['String']>;
  soul_contains_nocase?: InputMaybe<Scalars['String']>;
  soul_ends_with?: InputMaybe<Scalars['String']>;
  soul_ends_with_nocase?: InputMaybe<Scalars['String']>;
  soul_gt?: InputMaybe<Scalars['String']>;
  soul_gte?: InputMaybe<Scalars['String']>;
  soul_in?: InputMaybe<Array<Scalars['String']>>;
  soul_lt?: InputMaybe<Scalars['String']>;
  soul_lte?: InputMaybe<Scalars['String']>;
  soul_not?: InputMaybe<Scalars['String']>;
  soul_not_contains?: InputMaybe<Scalars['String']>;
  soul_not_contains_nocase?: InputMaybe<Scalars['String']>;
  soul_not_ends_with?: InputMaybe<Scalars['String']>;
  soul_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  soul_not_in?: InputMaybe<Array<Scalars['String']>>;
  soul_not_starts_with?: InputMaybe<Scalars['String']>;
  soul_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  soul_starts_with?: InputMaybe<Scalars['String']>;
  soul_starts_with_nocase?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Status>;
  status_in?: InputMaybe<Array<Status>>;
  status_not?: InputMaybe<Status>;
  status_not_in?: InputMaybe<Array<Status>>;
  ultimateChallenger?: InputMaybe<Scalars['Bytes']>;
  ultimateChallenger_contains?: InputMaybe<Scalars['Bytes']>;
  ultimateChallenger_in?: InputMaybe<Array<Scalars['Bytes']>>;
  ultimateChallenger_not?: InputMaybe<Scalars['Bytes']>;
  ultimateChallenger_not_contains?: InputMaybe<Scalars['Bytes']>;
  ultimateChallenger_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  usedReasons?: InputMaybe<Array<Reason>>;
  usedReasons_contains?: InputMaybe<Array<Reason>>;
  usedReasons_contains_nocase?: InputMaybe<Array<Reason>>;
  usedReasons_not?: InputMaybe<Array<Reason>>;
  usedReasons_not_contains?: InputMaybe<Array<Reason>>;
  usedReasons_not_contains_nocase?: InputMaybe<Array<Reason>>;
  vouches?: InputMaybe<Array<Scalars['String']>>;
  vouches_?: InputMaybe<Vouch_Filter>;
  vouches_contains?: InputMaybe<Array<Scalars['String']>>;
  vouches_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  vouches_not?: InputMaybe<Array<Scalars['String']>>;
  vouches_not_contains?: InputMaybe<Array<Scalars['String']>>;
  vouches_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
};

export enum Request_OrderBy {
  ArbitratorData = 'arbitratorData',
  ChallengePeriodEnd = 'challengePeriodEnd',
  Challenges = 'challenges',
  Claimer = 'claimer',
  CreationTime = 'creationTime',
  CurrentReason = 'currentReason',
  Evidence = 'evidence',
  Id = 'id',
  Index = 'index',
  LastProcessedVouchIndex = 'lastProcessedVouchIndex',
  LastStatusChange = 'lastStatusChange',
  NbChallenges = 'nbChallenges',
  NbEvidence = 'nbEvidence',
  Registration = 'registration',
  Requester = 'requester',
  RequesterLost = 'requesterLost',
  ResolutionTime = 'resolutionTime',
  Soul = 'soul',
  Status = 'status',
  UltimateChallenger = 'ultimateChallenger',
  UsedReasons = 'usedReasons',
  Vouches = 'vouches'
}

export type Round = {
  __typename?: 'Round';
  challenge: Challenge;
  challengerFunds: Scalars['BigInt'];
  challengerPaid: Scalars['Boolean'];
  contributions: Array<Contribution>;
  creationTime: Scalars['BigInt'];
  feeRewards: Scalars['BigInt'];
  id: Scalars['Bytes'];
  nbContributions: Scalars['BigInt'];
  requesterFunds: Scalars['BigInt'];
  requesterPaid: Scalars['Boolean'];
};


export type RoundContributionsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Contribution_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Contribution_Filter>;
};

export type Round_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  challenge?: InputMaybe<Scalars['String']>;
  challenge_?: InputMaybe<Challenge_Filter>;
  challenge_contains?: InputMaybe<Scalars['String']>;
  challenge_contains_nocase?: InputMaybe<Scalars['String']>;
  challenge_ends_with?: InputMaybe<Scalars['String']>;
  challenge_ends_with_nocase?: InputMaybe<Scalars['String']>;
  challenge_gt?: InputMaybe<Scalars['String']>;
  challenge_gte?: InputMaybe<Scalars['String']>;
  challenge_in?: InputMaybe<Array<Scalars['String']>>;
  challenge_lt?: InputMaybe<Scalars['String']>;
  challenge_lte?: InputMaybe<Scalars['String']>;
  challenge_not?: InputMaybe<Scalars['String']>;
  challenge_not_contains?: InputMaybe<Scalars['String']>;
  challenge_not_contains_nocase?: InputMaybe<Scalars['String']>;
  challenge_not_ends_with?: InputMaybe<Scalars['String']>;
  challenge_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  challenge_not_in?: InputMaybe<Array<Scalars['String']>>;
  challenge_not_starts_with?: InputMaybe<Scalars['String']>;
  challenge_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  challenge_starts_with?: InputMaybe<Scalars['String']>;
  challenge_starts_with_nocase?: InputMaybe<Scalars['String']>;
  challengerFunds?: InputMaybe<Scalars['BigInt']>;
  challengerFunds_gt?: InputMaybe<Scalars['BigInt']>;
  challengerFunds_gte?: InputMaybe<Scalars['BigInt']>;
  challengerFunds_in?: InputMaybe<Array<Scalars['BigInt']>>;
  challengerFunds_lt?: InputMaybe<Scalars['BigInt']>;
  challengerFunds_lte?: InputMaybe<Scalars['BigInt']>;
  challengerFunds_not?: InputMaybe<Scalars['BigInt']>;
  challengerFunds_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  challengerPaid?: InputMaybe<Scalars['Boolean']>;
  challengerPaid_in?: InputMaybe<Array<Scalars['Boolean']>>;
  challengerPaid_not?: InputMaybe<Scalars['Boolean']>;
  challengerPaid_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  contributions_?: InputMaybe<Contribution_Filter>;
  creationTime?: InputMaybe<Scalars['BigInt']>;
  creationTime_gt?: InputMaybe<Scalars['BigInt']>;
  creationTime_gte?: InputMaybe<Scalars['BigInt']>;
  creationTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  creationTime_lt?: InputMaybe<Scalars['BigInt']>;
  creationTime_lte?: InputMaybe<Scalars['BigInt']>;
  creationTime_not?: InputMaybe<Scalars['BigInt']>;
  creationTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feeRewards?: InputMaybe<Scalars['BigInt']>;
  feeRewards_gt?: InputMaybe<Scalars['BigInt']>;
  feeRewards_gte?: InputMaybe<Scalars['BigInt']>;
  feeRewards_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feeRewards_lt?: InputMaybe<Scalars['BigInt']>;
  feeRewards_lte?: InputMaybe<Scalars['BigInt']>;
  feeRewards_not?: InputMaybe<Scalars['BigInt']>;
  feeRewards_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  nbContributions?: InputMaybe<Scalars['BigInt']>;
  nbContributions_gt?: InputMaybe<Scalars['BigInt']>;
  nbContributions_gte?: InputMaybe<Scalars['BigInt']>;
  nbContributions_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nbContributions_lt?: InputMaybe<Scalars['BigInt']>;
  nbContributions_lte?: InputMaybe<Scalars['BigInt']>;
  nbContributions_not?: InputMaybe<Scalars['BigInt']>;
  nbContributions_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  requesterFunds?: InputMaybe<Scalars['BigInt']>;
  requesterFunds_gt?: InputMaybe<Scalars['BigInt']>;
  requesterFunds_gte?: InputMaybe<Scalars['BigInt']>;
  requesterFunds_in?: InputMaybe<Array<Scalars['BigInt']>>;
  requesterFunds_lt?: InputMaybe<Scalars['BigInt']>;
  requesterFunds_lte?: InputMaybe<Scalars['BigInt']>;
  requesterFunds_not?: InputMaybe<Scalars['BigInt']>;
  requesterFunds_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  requesterPaid?: InputMaybe<Scalars['Boolean']>;
  requesterPaid_in?: InputMaybe<Array<Scalars['Boolean']>>;
  requesterPaid_not?: InputMaybe<Scalars['Boolean']>;
  requesterPaid_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
};

export enum Round_OrderBy {
  Challenge = 'challenge',
  ChallengerFunds = 'challengerFunds',
  ChallengerPaid = 'challengerPaid',
  Contributions = 'contributions',
  CreationTime = 'creationTime',
  FeeRewards = 'feeRewards',
  Id = 'id',
  NbContributions = 'nbContributions',
  RequesterFunds = 'requesterFunds',
  RequesterPaid = 'requesterPaid'
}

export type Soul = {
  __typename?: 'Soul';
  claimed: Scalars['Boolean'];
  claimers: Array<Claimer>;
  expirationTime: Scalars['BigInt'];
  id: Scalars['Bytes'];
  nbPendingRequests: Scalars['BigInt'];
  nbRequests: Scalars['BigInt'];
  owner?: Maybe<Claimer>;
  pendingRevokal: Scalars['Boolean'];
  requests: Array<Request>;
  usedVouch?: Maybe<Claimer>;
  vouching: Scalars['Boolean'];
};


export type SoulClaimersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Claimer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Claimer_Filter>;
};


export type SoulRequestsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Request_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Request_Filter>;
};

export type Soul_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  claimed?: InputMaybe<Scalars['Boolean']>;
  claimed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  claimed_not?: InputMaybe<Scalars['Boolean']>;
  claimed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  claimers_?: InputMaybe<Claimer_Filter>;
  expirationTime?: InputMaybe<Scalars['BigInt']>;
  expirationTime_gt?: InputMaybe<Scalars['BigInt']>;
  expirationTime_gte?: InputMaybe<Scalars['BigInt']>;
  expirationTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expirationTime_lt?: InputMaybe<Scalars['BigInt']>;
  expirationTime_lte?: InputMaybe<Scalars['BigInt']>;
  expirationTime_not?: InputMaybe<Scalars['BigInt']>;
  expirationTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  nbPendingRequests?: InputMaybe<Scalars['BigInt']>;
  nbPendingRequests_gt?: InputMaybe<Scalars['BigInt']>;
  nbPendingRequests_gte?: InputMaybe<Scalars['BigInt']>;
  nbPendingRequests_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nbPendingRequests_lt?: InputMaybe<Scalars['BigInt']>;
  nbPendingRequests_lte?: InputMaybe<Scalars['BigInt']>;
  nbPendingRequests_not?: InputMaybe<Scalars['BigInt']>;
  nbPendingRequests_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nbRequests?: InputMaybe<Scalars['BigInt']>;
  nbRequests_gt?: InputMaybe<Scalars['BigInt']>;
  nbRequests_gte?: InputMaybe<Scalars['BigInt']>;
  nbRequests_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nbRequests_lt?: InputMaybe<Scalars['BigInt']>;
  nbRequests_lte?: InputMaybe<Scalars['BigInt']>;
  nbRequests_not?: InputMaybe<Scalars['BigInt']>;
  nbRequests_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  owner?: InputMaybe<Scalars['String']>;
  owner_?: InputMaybe<Claimer_Filter>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pendingRevokal?: InputMaybe<Scalars['Boolean']>;
  pendingRevokal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  pendingRevokal_not?: InputMaybe<Scalars['Boolean']>;
  pendingRevokal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  requests_?: InputMaybe<Request_Filter>;
  usedVouch?: InputMaybe<Scalars['String']>;
  usedVouch_?: InputMaybe<Claimer_Filter>;
  usedVouch_contains?: InputMaybe<Scalars['String']>;
  usedVouch_contains_nocase?: InputMaybe<Scalars['String']>;
  usedVouch_ends_with?: InputMaybe<Scalars['String']>;
  usedVouch_ends_with_nocase?: InputMaybe<Scalars['String']>;
  usedVouch_gt?: InputMaybe<Scalars['String']>;
  usedVouch_gte?: InputMaybe<Scalars['String']>;
  usedVouch_in?: InputMaybe<Array<Scalars['String']>>;
  usedVouch_lt?: InputMaybe<Scalars['String']>;
  usedVouch_lte?: InputMaybe<Scalars['String']>;
  usedVouch_not?: InputMaybe<Scalars['String']>;
  usedVouch_not_contains?: InputMaybe<Scalars['String']>;
  usedVouch_not_contains_nocase?: InputMaybe<Scalars['String']>;
  usedVouch_not_ends_with?: InputMaybe<Scalars['String']>;
  usedVouch_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  usedVouch_not_in?: InputMaybe<Array<Scalars['String']>>;
  usedVouch_not_starts_with?: InputMaybe<Scalars['String']>;
  usedVouch_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  usedVouch_starts_with?: InputMaybe<Scalars['String']>;
  usedVouch_starts_with_nocase?: InputMaybe<Scalars['String']>;
  vouching?: InputMaybe<Scalars['Boolean']>;
  vouching_in?: InputMaybe<Array<Scalars['Boolean']>>;
  vouching_not?: InputMaybe<Scalars['Boolean']>;
  vouching_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
};

export enum Soul_OrderBy {
  Claimed = 'claimed',
  Claimers = 'claimers',
  ExpirationTime = 'expirationTime',
  Id = 'id',
  NbPendingRequests = 'nbPendingRequests',
  NbRequests = 'nbRequests',
  Owner = 'owner',
  PendingRevokal = 'pendingRevokal',
  Requests = 'requests',
  UsedVouch = 'usedVouch',
  Vouching = 'vouching'
}

export enum Status {
  Disputed = 'Disputed',
  Resolved = 'Resolved',
  Resolving = 'Resolving',
  Vouching = 'Vouching'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  arbitratorData?: Maybe<ArbitratorData>;
  arbitratorDatas: Array<ArbitratorData>;
  challenge?: Maybe<Challenge>;
  challenges: Array<Challenge>;
  claimer?: Maybe<Claimer>;
  claimers: Array<Claimer>;
  contract?: Maybe<Contract>;
  contracts: Array<Contract>;
  contribution?: Maybe<Contribution>;
  contributions: Array<Contribution>;
  counter?: Maybe<Counter>;
  counters: Array<Counter>;
  evidence?: Maybe<Evidence>;
  evidences: Array<Evidence>;
  request?: Maybe<Request>;
  requests: Array<Request>;
  round?: Maybe<Round>;
  rounds: Array<Round>;
  soul?: Maybe<Soul>;
  souls: Array<Soul>;
  vouch?: Maybe<Vouch>;
  vouches: Array<Vouch>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionArbitratorDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionArbitratorDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ArbitratorData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ArbitratorData_Filter>;
};


export type SubscriptionChallengeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionChallengesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Challenge_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Challenge_Filter>;
};


export type SubscriptionClaimerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionClaimersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Claimer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Claimer_Filter>;
};


export type SubscriptionContractArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionContractsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Contract_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Contract_Filter>;
};


export type SubscriptionContributionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionContributionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Contribution_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Contribution_Filter>;
};


export type SubscriptionCounterArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCountersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Counter_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Counter_Filter>;
};


export type SubscriptionEvidenceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionEvidencesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Evidence_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Evidence_Filter>;
};


export type SubscriptionRequestArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRequestsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Request_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Request_Filter>;
};


export type SubscriptionRoundArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRoundsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Round_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Round_Filter>;
};


export type SubscriptionSoulArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionSoulsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Soul_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Soul_Filter>;
};


export type SubscriptionVouchArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionVouchesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vouch_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Vouch_Filter>;
};

export type Vouch = {
  __typename?: 'Vouch';
  for: Claimer;
  from: Claimer;
  id: Scalars['Bytes'];
  soul: Soul;
};

export type Vouch_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  for?: InputMaybe<Scalars['String']>;
  for_?: InputMaybe<Claimer_Filter>;
  for_contains?: InputMaybe<Scalars['String']>;
  for_contains_nocase?: InputMaybe<Scalars['String']>;
  for_ends_with?: InputMaybe<Scalars['String']>;
  for_ends_with_nocase?: InputMaybe<Scalars['String']>;
  for_gt?: InputMaybe<Scalars['String']>;
  for_gte?: InputMaybe<Scalars['String']>;
  for_in?: InputMaybe<Array<Scalars['String']>>;
  for_lt?: InputMaybe<Scalars['String']>;
  for_lte?: InputMaybe<Scalars['String']>;
  for_not?: InputMaybe<Scalars['String']>;
  for_not_contains?: InputMaybe<Scalars['String']>;
  for_not_contains_nocase?: InputMaybe<Scalars['String']>;
  for_not_ends_with?: InputMaybe<Scalars['String']>;
  for_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  for_not_in?: InputMaybe<Array<Scalars['String']>>;
  for_not_starts_with?: InputMaybe<Scalars['String']>;
  for_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  for_starts_with?: InputMaybe<Scalars['String']>;
  for_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from?: InputMaybe<Scalars['String']>;
  from_?: InputMaybe<Claimer_Filter>;
  from_contains?: InputMaybe<Scalars['String']>;
  from_contains_nocase?: InputMaybe<Scalars['String']>;
  from_ends_with?: InputMaybe<Scalars['String']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_gt?: InputMaybe<Scalars['String']>;
  from_gte?: InputMaybe<Scalars['String']>;
  from_in?: InputMaybe<Array<Scalars['String']>>;
  from_lt?: InputMaybe<Scalars['String']>;
  from_lte?: InputMaybe<Scalars['String']>;
  from_not?: InputMaybe<Scalars['String']>;
  from_not_contains?: InputMaybe<Scalars['String']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']>;
  from_not_ends_with?: InputMaybe<Scalars['String']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_in?: InputMaybe<Array<Scalars['String']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_starts_with?: InputMaybe<Scalars['String']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  soul?: InputMaybe<Scalars['String']>;
  soul_?: InputMaybe<Soul_Filter>;
  soul_contains?: InputMaybe<Scalars['String']>;
  soul_contains_nocase?: InputMaybe<Scalars['String']>;
  soul_ends_with?: InputMaybe<Scalars['String']>;
  soul_ends_with_nocase?: InputMaybe<Scalars['String']>;
  soul_gt?: InputMaybe<Scalars['String']>;
  soul_gte?: InputMaybe<Scalars['String']>;
  soul_in?: InputMaybe<Array<Scalars['String']>>;
  soul_lt?: InputMaybe<Scalars['String']>;
  soul_lte?: InputMaybe<Scalars['String']>;
  soul_not?: InputMaybe<Scalars['String']>;
  soul_not_contains?: InputMaybe<Scalars['String']>;
  soul_not_contains_nocase?: InputMaybe<Scalars['String']>;
  soul_not_ends_with?: InputMaybe<Scalars['String']>;
  soul_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  soul_not_in?: InputMaybe<Array<Scalars['String']>>;
  soul_not_starts_with?: InputMaybe<Scalars['String']>;
  soul_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  soul_starts_with?: InputMaybe<Scalars['String']>;
  soul_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Vouch_OrderBy {
  For = 'for',
  From = 'from',
  Id = 'id',
  Soul = 'soul'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Timestamp of the block if available, format depends on the chain */
  timestamp?: Maybe<Scalars['String']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type RequestQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RequestQuery = { __typename?: 'Query', request?: { __typename?: 'Request', status: Status, index: any, registration: boolean, requester: any, creationTime: any, lastStatusChange: any, soul: { __typename?: 'Soul', id: any, claimed: boolean }, claimer?: { __typename?: 'Claimer', id: any, name?: string | null, vouchesReceived: Array<{ __typename?: 'Vouch', from: { __typename?: 'Claimer', id: any }, soul: { __typename?: 'Soul', id: any } }> } | null, evidence: Array<{ __typename?: 'Evidence', creationTime: any, id: any, URI: string, sender: any }>, challenges: Array<{ __typename?: 'Challenge', id: any, appealPeriodStart: any, appealPeriodEnd: any, reason: Reason, disputeId: any, challenger?: any | null, nbRounds: any, rounds: Array<{ __typename?: 'Round', requesterPaid: boolean, challengerPaid: boolean, requesterFunds: any, challengerFunds: any }> }> } | null };

export type RequestsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Request_Filter>;
}>;


export type RequestsQuery = { __typename?: 'Query', requests: Array<{ __typename?: 'Request', id: any, index: any, status: Status, registration: boolean, creationTime: any, requester: any, claimer?: { __typename?: 'Claimer', id: any, name?: string | null } | null, soul: { __typename?: 'Soul', id: any, nbRequests: any, claimed: boolean }, evidence: Array<{ __typename?: 'Evidence', URI: string }> }> };

export type SoulsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Soul_Filter>;
}>;


export type SoulsQuery = { __typename?: 'Query', souls: Array<{ __typename?: 'Soul', id: any, claimed: boolean, expirationTime: any, nbPendingRequests: any, owner?: { __typename?: 'Claimer', id: any, name?: string | null } | null, requests: Array<{ __typename?: 'Request', id: any, status: Status }> }> };


export const RequestDocument = gql`
    query Request($id: ID!) {
  request(id: $id) {
    status
    index
    registration
    requester
    creationTime
    lastStatusChange
    soul {
      id
      claimed
    }
    claimer {
      id
      name
      vouchesReceived {
        from {
          id
        }
        soul {
          id
        }
      }
    }
    evidence(orderBy: creationTime) {
      creationTime
      id
      URI
      sender
    }
    challenges(orderBy: creationTime) {
      id
      appealPeriodStart
      appealPeriodEnd
      reason
      disputeId
      challenger
      nbRounds
      rounds(orderBy: creationTime, orderDirection: desc, first: 1) {
        requesterPaid
        challengerPaid
        requesterFunds
        challengerFunds
      }
    }
  }
}
    `;
export const RequestsDocument = gql`
    query Requests($skip: Int, $first: Int, $where: Request_filter) {
  requests(
    first: $first
    skip: $skip
    where: $where
    orderBy: creationTime
    orderDirection: desc
  ) {
    id
    index
    status
    registration
    creationTime
    requester
    claimer {
      id
      name
    }
    soul {
      id
      nbRequests
      claimed
    }
    evidence(orderBy: creationTime) {
      URI
    }
  }
}
    `;
export const SoulsDocument = gql`
    query Souls($skip: Int, $first: Int, $where: Soul_filter) {
  souls(first: $first, skip: $skip, where: $where) {
    id
    claimed
    expirationTime
    owner {
      id
      name
    }
    nbPendingRequests
    requests(where: {status_not: Resolved}) {
      id
      status
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Request(variables: RequestQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RequestQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<RequestQuery>(RequestDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Request', 'query');
    },
    Requests(variables?: RequestsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RequestsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<RequestsQuery>(RequestsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Requests', 'query');
    },
    Souls(variables?: SoulsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SoulsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SoulsQuery>(SoulsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Souls', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;