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
  /**
   * Start and end appeal period [start, end].
   *
   */
  appealPeriod: Array<Scalars['BigInt']>;
  /**
   * In-contract challenge ID
   *
   */
  challengeID: Scalars['BigInt'];
  /**
   * The address of the challenger.
   *
   */
  challenger?: Maybe<Scalars['Bytes']>;
  /**
   * The creation time.
   *
   */
  creationTime: Scalars['BigInt'];
  /**
   * The challenge's dispute ID.
   *
   */
  disputeID?: Maybe<Scalars['BigInt']>;
  /**
   * The submission which is a supposed duplicate of the challenged submission. This is only used for `Reason.Duplicate`.
   *
   */
  duplicateSubmission?: Maybe<Submission>;
  /**
   * The challenge's ID, keccak256(requestID, "Challenge-" + challengeIndex).
   *
   */
  id: Scalars['ID'];
  /**
   * The ID of the last round.
   *
   */
  lastRoundID: Scalars['BigInt'];
  /**
   * The challenge's reason.
   *
   */
  reason?: Maybe<Reason>;
  /**
   * The request the challenge is for.
   *
   */
  request: Request;
  /**
   * The address of the requesterd.
   *
   */
  requester?: Maybe<Scalars['Bytes']>;
  /**
   * The IDs of the rounds of this challenge.
   *
   */
  roundIDs: Array<Scalars['String']>;
  /**
   * The rounds for the challenge.
   *
   */
  rounds: Array<Round>;
  /**
   * The final ruling.
   *
   */
  ruling?: Maybe<Scalars['BigInt']>;
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
  appealPeriod?: InputMaybe<Array<Scalars['BigInt']>>;
  appealPeriod_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  appealPeriod_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  appealPeriod_not?: InputMaybe<Array<Scalars['BigInt']>>;
  appealPeriod_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  appealPeriod_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  challengeID?: InputMaybe<Scalars['BigInt']>;
  challengeID_gt?: InputMaybe<Scalars['BigInt']>;
  challengeID_gte?: InputMaybe<Scalars['BigInt']>;
  challengeID_in?: InputMaybe<Array<Scalars['BigInt']>>;
  challengeID_lt?: InputMaybe<Scalars['BigInt']>;
  challengeID_lte?: InputMaybe<Scalars['BigInt']>;
  challengeID_not?: InputMaybe<Scalars['BigInt']>;
  challengeID_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  disputeID?: InputMaybe<Scalars['BigInt']>;
  disputeID_gt?: InputMaybe<Scalars['BigInt']>;
  disputeID_gte?: InputMaybe<Scalars['BigInt']>;
  disputeID_in?: InputMaybe<Array<Scalars['BigInt']>>;
  disputeID_lt?: InputMaybe<Scalars['BigInt']>;
  disputeID_lte?: InputMaybe<Scalars['BigInt']>;
  disputeID_not?: InputMaybe<Scalars['BigInt']>;
  disputeID_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  duplicateSubmission?: InputMaybe<Scalars['String']>;
  duplicateSubmission_contains?: InputMaybe<Scalars['String']>;
  duplicateSubmission_contains_nocase?: InputMaybe<Scalars['String']>;
  duplicateSubmission_ends_with?: InputMaybe<Scalars['String']>;
  duplicateSubmission_ends_with_nocase?: InputMaybe<Scalars['String']>;
  duplicateSubmission_gt?: InputMaybe<Scalars['String']>;
  duplicateSubmission_gte?: InputMaybe<Scalars['String']>;
  duplicateSubmission_in?: InputMaybe<Array<Scalars['String']>>;
  duplicateSubmission_lt?: InputMaybe<Scalars['String']>;
  duplicateSubmission_lte?: InputMaybe<Scalars['String']>;
  duplicateSubmission_not?: InputMaybe<Scalars['String']>;
  duplicateSubmission_not_contains?: InputMaybe<Scalars['String']>;
  duplicateSubmission_not_contains_nocase?: InputMaybe<Scalars['String']>;
  duplicateSubmission_not_ends_with?: InputMaybe<Scalars['String']>;
  duplicateSubmission_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  duplicateSubmission_not_in?: InputMaybe<Array<Scalars['String']>>;
  duplicateSubmission_not_starts_with?: InputMaybe<Scalars['String']>;
  duplicateSubmission_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  duplicateSubmission_starts_with?: InputMaybe<Scalars['String']>;
  duplicateSubmission_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  lastRoundID?: InputMaybe<Scalars['BigInt']>;
  lastRoundID_gt?: InputMaybe<Scalars['BigInt']>;
  lastRoundID_gte?: InputMaybe<Scalars['BigInt']>;
  lastRoundID_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastRoundID_lt?: InputMaybe<Scalars['BigInt']>;
  lastRoundID_lte?: InputMaybe<Scalars['BigInt']>;
  lastRoundID_not?: InputMaybe<Scalars['BigInt']>;
  lastRoundID_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reason?: InputMaybe<Reason>;
  reason_in?: InputMaybe<Array<Reason>>;
  reason_not?: InputMaybe<Reason>;
  reason_not_in?: InputMaybe<Array<Reason>>;
  request?: InputMaybe<Scalars['String']>;
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
  requester?: InputMaybe<Scalars['Bytes']>;
  requester_contains?: InputMaybe<Scalars['Bytes']>;
  requester_in?: InputMaybe<Array<Scalars['Bytes']>>;
  requester_not?: InputMaybe<Scalars['Bytes']>;
  requester_not_contains?: InputMaybe<Scalars['Bytes']>;
  requester_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  roundIDs?: InputMaybe<Array<Scalars['String']>>;
  roundIDs_contains?: InputMaybe<Array<Scalars['String']>>;
  roundIDs_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  roundIDs_not?: InputMaybe<Array<Scalars['String']>>;
  roundIDs_not_contains?: InputMaybe<Array<Scalars['String']>>;
  roundIDs_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  ruling?: InputMaybe<Scalars['BigInt']>;
  ruling_gt?: InputMaybe<Scalars['BigInt']>;
  ruling_gte?: InputMaybe<Scalars['BigInt']>;
  ruling_in?: InputMaybe<Array<Scalars['BigInt']>>;
  ruling_lt?: InputMaybe<Scalars['BigInt']>;
  ruling_lte?: InputMaybe<Scalars['BigInt']>;
  ruling_not?: InputMaybe<Scalars['BigInt']>;
  ruling_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Challenge_OrderBy {
  AppealPeriod = 'appealPeriod',
  ChallengeId = 'challengeID',
  Challenger = 'challenger',
  CreationTime = 'creationTime',
  DisputeId = 'disputeID',
  DuplicateSubmission = 'duplicateSubmission',
  Id = 'id',
  LastRoundId = 'lastRoundID',
  Reason = 'reason',
  Request = 'request',
  Requester = 'requester',
  RoundIDs = 'roundIDs',
  Rounds = 'rounds',
  Ruling = 'ruling'
}

export type Contract = {
  __typename?: 'Contract';
  /**
   * Proof of Humanity contract address
   *
   */
  address: Scalars['Bytes'];
  /**
   * The arbitrator contract's address.
   *
   */
  arbitrator: Scalars['Bytes'];
  /**
   * Extra data to require particular dispute and appeal behaviour.
   *
   */
  arbitratorExtraData: Scalars['Bytes'];
  /**
   * The time after which a request becomes executable if not challenged. Note that this value should be less than the time spent on potential dispute's resolution, to avoid complications of parallel dispute handling.
   *
   */
  challengePeriodDuration: Scalars['BigInt'];
  /**
   * The current clearing meta evidence.
   *
   */
  clearingMetaEvidence?: Maybe<MetaEvidence>;
  /**
   * The address that can make governance changes to the parameters of the contract.
   *
   */
  governor: Scalars['Bytes'];
  /**
   * The singleton entity's ID, "0".
   *
   */
  id: Scalars['ID'];
  /**
   * Multiplier for calculating the fee stake paid by the party that lost the previous round.
   *
   */
  loserStakeMultiplier: Scalars['BigInt'];
  /**
   * The number of times the meta evidence has been updated. Used to track the latest meta evidence ID.
   *
   */
  metaEvidenceUpdates: Scalars['BigInt'];
  /**
   * The current registration meta evidence.
   *
   */
  registrationMetaEvidence?: Maybe<MetaEvidence>;
  /**
   * Denotes the point in time of the submission period after which it becomes possible for the submission to reapply (to refresh the duration of the submission period).
   *
   */
  renewalTime: Scalars['BigInt'];
  /**
   * The number of registered users that have to vouch for a new registration request in order for it to enter `Status.PendingRegistration` status.
   *
   */
  requiredNumberOfVouches: Scalars['BigInt'];
  /**
   * Multiplier for calculating the fee stake that must be paid in a case where the arbitrator refused to arbitrate.
   *
   */
  sharedStakeMultiplier: Scalars['BigInt'];
  /**
   * The base deposit to make a new request for a submission.
   *
   */
  submissionBaseDeposit: Scalars['BigInt'];
  /**
   * The base deposit to challenge a request.
   *
   */
  submissionChallengeBaseDeposit: Scalars['BigInt'];
  /**
   * Time after which the registered submission will no longer be considered registered. The submitter has to reapply to the list to refresh it.
   *
   */
  submissionDuration: Scalars['BigInt'];
  /**
   * Multiplier for calculating the fee stake paid by the party that won the previous round.
   *
   */
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
  challengePeriodDuration?: InputMaybe<Scalars['BigInt']>;
  challengePeriodDuration_gt?: InputMaybe<Scalars['BigInt']>;
  challengePeriodDuration_gte?: InputMaybe<Scalars['BigInt']>;
  challengePeriodDuration_in?: InputMaybe<Array<Scalars['BigInt']>>;
  challengePeriodDuration_lt?: InputMaybe<Scalars['BigInt']>;
  challengePeriodDuration_lte?: InputMaybe<Scalars['BigInt']>;
  challengePeriodDuration_not?: InputMaybe<Scalars['BigInt']>;
  challengePeriodDuration_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  clearingMetaEvidence?: InputMaybe<Scalars['String']>;
  clearingMetaEvidence_contains?: InputMaybe<Scalars['String']>;
  clearingMetaEvidence_contains_nocase?: InputMaybe<Scalars['String']>;
  clearingMetaEvidence_ends_with?: InputMaybe<Scalars['String']>;
  clearingMetaEvidence_ends_with_nocase?: InputMaybe<Scalars['String']>;
  clearingMetaEvidence_gt?: InputMaybe<Scalars['String']>;
  clearingMetaEvidence_gte?: InputMaybe<Scalars['String']>;
  clearingMetaEvidence_in?: InputMaybe<Array<Scalars['String']>>;
  clearingMetaEvidence_lt?: InputMaybe<Scalars['String']>;
  clearingMetaEvidence_lte?: InputMaybe<Scalars['String']>;
  clearingMetaEvidence_not?: InputMaybe<Scalars['String']>;
  clearingMetaEvidence_not_contains?: InputMaybe<Scalars['String']>;
  clearingMetaEvidence_not_contains_nocase?: InputMaybe<Scalars['String']>;
  clearingMetaEvidence_not_ends_with?: InputMaybe<Scalars['String']>;
  clearingMetaEvidence_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  clearingMetaEvidence_not_in?: InputMaybe<Array<Scalars['String']>>;
  clearingMetaEvidence_not_starts_with?: InputMaybe<Scalars['String']>;
  clearingMetaEvidence_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  clearingMetaEvidence_starts_with?: InputMaybe<Scalars['String']>;
  clearingMetaEvidence_starts_with_nocase?: InputMaybe<Scalars['String']>;
  governor?: InputMaybe<Scalars['Bytes']>;
  governor_contains?: InputMaybe<Scalars['Bytes']>;
  governor_in?: InputMaybe<Array<Scalars['Bytes']>>;
  governor_not?: InputMaybe<Scalars['Bytes']>;
  governor_not_contains?: InputMaybe<Scalars['Bytes']>;
  governor_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
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
  registrationMetaEvidence?: InputMaybe<Scalars['String']>;
  registrationMetaEvidence_contains?: InputMaybe<Scalars['String']>;
  registrationMetaEvidence_contains_nocase?: InputMaybe<Scalars['String']>;
  registrationMetaEvidence_ends_with?: InputMaybe<Scalars['String']>;
  registrationMetaEvidence_ends_with_nocase?: InputMaybe<Scalars['String']>;
  registrationMetaEvidence_gt?: InputMaybe<Scalars['String']>;
  registrationMetaEvidence_gte?: InputMaybe<Scalars['String']>;
  registrationMetaEvidence_in?: InputMaybe<Array<Scalars['String']>>;
  registrationMetaEvidence_lt?: InputMaybe<Scalars['String']>;
  registrationMetaEvidence_lte?: InputMaybe<Scalars['String']>;
  registrationMetaEvidence_not?: InputMaybe<Scalars['String']>;
  registrationMetaEvidence_not_contains?: InputMaybe<Scalars['String']>;
  registrationMetaEvidence_not_contains_nocase?: InputMaybe<Scalars['String']>;
  registrationMetaEvidence_not_ends_with?: InputMaybe<Scalars['String']>;
  registrationMetaEvidence_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  registrationMetaEvidence_not_in?: InputMaybe<Array<Scalars['String']>>;
  registrationMetaEvidence_not_starts_with?: InputMaybe<Scalars['String']>;
  registrationMetaEvidence_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  registrationMetaEvidence_starts_with?: InputMaybe<Scalars['String']>;
  registrationMetaEvidence_starts_with_nocase?: InputMaybe<Scalars['String']>;
  renewalTime?: InputMaybe<Scalars['BigInt']>;
  renewalTime_gt?: InputMaybe<Scalars['BigInt']>;
  renewalTime_gte?: InputMaybe<Scalars['BigInt']>;
  renewalTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  renewalTime_lt?: InputMaybe<Scalars['BigInt']>;
  renewalTime_lte?: InputMaybe<Scalars['BigInt']>;
  renewalTime_not?: InputMaybe<Scalars['BigInt']>;
  renewalTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  submissionBaseDeposit?: InputMaybe<Scalars['BigInt']>;
  submissionBaseDeposit_gt?: InputMaybe<Scalars['BigInt']>;
  submissionBaseDeposit_gte?: InputMaybe<Scalars['BigInt']>;
  submissionBaseDeposit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  submissionBaseDeposit_lt?: InputMaybe<Scalars['BigInt']>;
  submissionBaseDeposit_lte?: InputMaybe<Scalars['BigInt']>;
  submissionBaseDeposit_not?: InputMaybe<Scalars['BigInt']>;
  submissionBaseDeposit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  submissionChallengeBaseDeposit?: InputMaybe<Scalars['BigInt']>;
  submissionChallengeBaseDeposit_gt?: InputMaybe<Scalars['BigInt']>;
  submissionChallengeBaseDeposit_gte?: InputMaybe<Scalars['BigInt']>;
  submissionChallengeBaseDeposit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  submissionChallengeBaseDeposit_lt?: InputMaybe<Scalars['BigInt']>;
  submissionChallengeBaseDeposit_lte?: InputMaybe<Scalars['BigInt']>;
  submissionChallengeBaseDeposit_not?: InputMaybe<Scalars['BigInt']>;
  submissionChallengeBaseDeposit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  submissionDuration?: InputMaybe<Scalars['BigInt']>;
  submissionDuration_gt?: InputMaybe<Scalars['BigInt']>;
  submissionDuration_gte?: InputMaybe<Scalars['BigInt']>;
  submissionDuration_in?: InputMaybe<Array<Scalars['BigInt']>>;
  submissionDuration_lt?: InputMaybe<Scalars['BigInt']>;
  submissionDuration_lte?: InputMaybe<Scalars['BigInt']>;
  submissionDuration_not?: InputMaybe<Scalars['BigInt']>;
  submissionDuration_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  Arbitrator = 'arbitrator',
  ArbitratorExtraData = 'arbitratorExtraData',
  ChallengePeriodDuration = 'challengePeriodDuration',
  ClearingMetaEvidence = 'clearingMetaEvidence',
  Governor = 'governor',
  Id = 'id',
  LoserStakeMultiplier = 'loserStakeMultiplier',
  MetaEvidenceUpdates = 'metaEvidenceUpdates',
  RegistrationMetaEvidence = 'registrationMetaEvidence',
  RenewalTime = 'renewalTime',
  RequiredNumberOfVouches = 'requiredNumberOfVouches',
  SharedStakeMultiplier = 'sharedStakeMultiplier',
  SubmissionBaseDeposit = 'submissionBaseDeposit',
  SubmissionChallengeBaseDeposit = 'submissionChallengeBaseDeposit',
  SubmissionDuration = 'submissionDuration',
  WinnerStakeMultiplier = 'winnerStakeMultiplier'
}

export type Contribution = {
  __typename?: 'Contribution';
  /**
   * The address of the contributor.
   *
   */
  contributor: Scalars['Bytes'];
  /**
   * The creation time.
   *
   */
  creationTime: Scalars['BigInt'];
  /**
   * The contribution's ID, keccak256(roundID, contributor).
   *
   */
  id: Scalars['ID'];
  /**
   * The request receiving the contribution.
   *
   */
  requestIndex: Scalars['BigInt'];
  /**
   * Whether the request is resolved
   *
   */
  requestResolved: Scalars['Boolean'];
  /**
   * The round the contribution is for.
   *
   */
  round: Round;
  /**
   * The round receiving the contribution.
   *
   */
  roundIndex: Scalars['BigInt'];
  /**
   * The contributions for each side.
   *
   */
  values: Array<Scalars['BigInt']>;
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
  creationTime?: InputMaybe<Scalars['BigInt']>;
  creationTime_gt?: InputMaybe<Scalars['BigInt']>;
  creationTime_gte?: InputMaybe<Scalars['BigInt']>;
  creationTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  creationTime_lt?: InputMaybe<Scalars['BigInt']>;
  creationTime_lte?: InputMaybe<Scalars['BigInt']>;
  creationTime_not?: InputMaybe<Scalars['BigInt']>;
  creationTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  requestIndex?: InputMaybe<Scalars['BigInt']>;
  requestIndex_gt?: InputMaybe<Scalars['BigInt']>;
  requestIndex_gte?: InputMaybe<Scalars['BigInt']>;
  requestIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  requestIndex_lt?: InputMaybe<Scalars['BigInt']>;
  requestIndex_lte?: InputMaybe<Scalars['BigInt']>;
  requestIndex_not?: InputMaybe<Scalars['BigInt']>;
  requestIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  requestResolved?: InputMaybe<Scalars['Boolean']>;
  requestResolved_in?: InputMaybe<Array<Scalars['Boolean']>>;
  requestResolved_not?: InputMaybe<Scalars['Boolean']>;
  requestResolved_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  round?: InputMaybe<Scalars['String']>;
  roundIndex?: InputMaybe<Scalars['BigInt']>;
  roundIndex_gt?: InputMaybe<Scalars['BigInt']>;
  roundIndex_gte?: InputMaybe<Scalars['BigInt']>;
  roundIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  roundIndex_lt?: InputMaybe<Scalars['BigInt']>;
  roundIndex_lte?: InputMaybe<Scalars['BigInt']>;
  roundIndex_not?: InputMaybe<Scalars['BigInt']>;
  roundIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  values?: InputMaybe<Array<Scalars['BigInt']>>;
  values_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  values_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  values_not?: InputMaybe<Array<Scalars['BigInt']>>;
  values_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  values_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Contribution_OrderBy {
  Contributor = 'contributor',
  CreationTime = 'creationTime',
  Id = 'id',
  RequestIndex = 'requestIndex',
  RequestResolved = 'requestResolved',
  Round = 'round',
  RoundIndex = 'roundIndex',
  Values = 'values'
}

export type Counter = {
  __typename?: 'Counter';
  /**
   * Number of submissions with Challenged Registration
   *
   */
  challengedRegistration: Scalars['BigInt'];
  /**
   * Number of submissions with Challenged Removal
   *
   */
  challengedRemoval: Scalars['BigInt'];
  /**
   * Number of submissions Expired
   *
   */
  expired: Scalars['BigInt'];
  /**
   * The singleton entity's ID, "1".
   *
   */
  id: Scalars['ID'];
  /**
   * Number of submissions Pending Registration
   *
   */
  pendingRegistration: Scalars['BigInt'];
  /**
   * Number of submissions Pending Removal
   *
   */
  pendingRemoval: Scalars['BigInt'];
  /**
   * Number of submissions Registered
   *
   */
  registered: Scalars['BigInt'];
  /**
   * Number of submissions Removed
   *
   */
  removed: Scalars['BigInt'];
  /**
   * Number of submissions in the Vouching Phase
   *
   */
  vouchingPhase: Scalars['BigInt'];
};

export type Counter_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  challengedRegistration?: InputMaybe<Scalars['BigInt']>;
  challengedRegistration_gt?: InputMaybe<Scalars['BigInt']>;
  challengedRegistration_gte?: InputMaybe<Scalars['BigInt']>;
  challengedRegistration_in?: InputMaybe<Array<Scalars['BigInt']>>;
  challengedRegistration_lt?: InputMaybe<Scalars['BigInt']>;
  challengedRegistration_lte?: InputMaybe<Scalars['BigInt']>;
  challengedRegistration_not?: InputMaybe<Scalars['BigInt']>;
  challengedRegistration_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  challengedRemoval?: InputMaybe<Scalars['BigInt']>;
  challengedRemoval_gt?: InputMaybe<Scalars['BigInt']>;
  challengedRemoval_gte?: InputMaybe<Scalars['BigInt']>;
  challengedRemoval_in?: InputMaybe<Array<Scalars['BigInt']>>;
  challengedRemoval_lt?: InputMaybe<Scalars['BigInt']>;
  challengedRemoval_lte?: InputMaybe<Scalars['BigInt']>;
  challengedRemoval_not?: InputMaybe<Scalars['BigInt']>;
  challengedRemoval_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expired?: InputMaybe<Scalars['BigInt']>;
  expired_gt?: InputMaybe<Scalars['BigInt']>;
  expired_gte?: InputMaybe<Scalars['BigInt']>;
  expired_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expired_lt?: InputMaybe<Scalars['BigInt']>;
  expired_lte?: InputMaybe<Scalars['BigInt']>;
  expired_not?: InputMaybe<Scalars['BigInt']>;
  expired_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  pendingRegistration?: InputMaybe<Scalars['BigInt']>;
  pendingRegistration_gt?: InputMaybe<Scalars['BigInt']>;
  pendingRegistration_gte?: InputMaybe<Scalars['BigInt']>;
  pendingRegistration_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pendingRegistration_lt?: InputMaybe<Scalars['BigInt']>;
  pendingRegistration_lte?: InputMaybe<Scalars['BigInt']>;
  pendingRegistration_not?: InputMaybe<Scalars['BigInt']>;
  pendingRegistration_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pendingRemoval?: InputMaybe<Scalars['BigInt']>;
  pendingRemoval_gt?: InputMaybe<Scalars['BigInt']>;
  pendingRemoval_gte?: InputMaybe<Scalars['BigInt']>;
  pendingRemoval_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pendingRemoval_lt?: InputMaybe<Scalars['BigInt']>;
  pendingRemoval_lte?: InputMaybe<Scalars['BigInt']>;
  pendingRemoval_not?: InputMaybe<Scalars['BigInt']>;
  pendingRemoval_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  vouchingPhase?: InputMaybe<Scalars['BigInt']>;
  vouchingPhase_gt?: InputMaybe<Scalars['BigInt']>;
  vouchingPhase_gte?: InputMaybe<Scalars['BigInt']>;
  vouchingPhase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  vouchingPhase_lt?: InputMaybe<Scalars['BigInt']>;
  vouchingPhase_lte?: InputMaybe<Scalars['BigInt']>;
  vouchingPhase_not?: InputMaybe<Scalars['BigInt']>;
  vouchingPhase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Counter_OrderBy {
  ChallengedRegistration = 'challengedRegistration',
  ChallengedRemoval = 'challengedRemoval',
  Expired = 'expired',
  Id = 'id',
  PendingRegistration = 'pendingRegistration',
  PendingRemoval = 'pendingRemoval',
  Registered = 'registered',
  Removed = 'removed',
  VouchingPhase = 'vouchingPhase'
}

export type Evidence = {
  __typename?: 'Evidence';
  /**
   * The URI of the evidence file.
   *
   */
  URI: Scalars['String'];
  /**
   * The creation time.
   *
   */
  creationTime: Scalars['BigInt'];
  /**
   * The evidence's ID, keccak256(requestID, "Evidence-" + requestEvidenceLength).
   *
   */
  id: Scalars['ID'];
  /**
   * The request the evidence is for.
   *
   */
  request: Request;
  /**
   * The address of the sender.
   *
   */
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
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  request?: InputMaybe<Scalars['String']>;
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

export type MetaEvidence = {
  __typename?: 'MetaEvidence';
  /**
   * The URI of the meta evidence file.
   *
   */
  URI: Scalars['String'];
  /**
   * The meta evidence ID.
   *
   */
  id: Scalars['ID'];
};

export type MetaEvidence_Filter = {
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
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
};

export enum MetaEvidence_OrderBy {
  Uri = 'URI',
  Id = 'id'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  challenge?: Maybe<Challenge>;
  challenges: Array<Challenge>;
  contract?: Maybe<Contract>;
  contracts: Array<Contract>;
  contribution?: Maybe<Contribution>;
  contributions: Array<Contribution>;
  counter?: Maybe<Counter>;
  counters: Array<Counter>;
  evidence?: Maybe<Evidence>;
  evidences: Array<Evidence>;
  metaEvidence?: Maybe<MetaEvidence>;
  metaEvidences: Array<MetaEvidence>;
  request?: Maybe<Request>;
  requests: Array<Request>;
  round?: Maybe<Round>;
  rounds: Array<Round>;
  submission?: Maybe<Submission>;
  submissionSearch: Array<Submission>;
  submissions: Array<Submission>;
  submissionsRegistries: Array<SubmissionsRegistry>;
  submissionsRegistry?: Maybe<SubmissionsRegistry>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
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


export type QueryMetaEvidenceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryMetaEvidencesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MetaEvidence_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MetaEvidence_Filter>;
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


export type QuerySubmissionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerySubmissionSearchArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  text: Scalars['String'];
};


export type QuerySubmissionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Submission_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Submission_Filter>;
};


export type QuerySubmissionsRegistriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SubmissionsRegistry_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SubmissionsRegistry_Filter>;
};


export type QuerySubmissionsRegistryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export enum Reason {
  /**
   * The submitter has existed but does not exist anymore.
   *
   */
  Deceased = 'Deceased',
  /**
   * The submitter is not real. For example, this can be used for videos showing computer generated persons.
   *
   */
  DoesNotExist = 'DoesNotExist',
  /**
   * The submitter is already registered. The challenger has to point to the identity already registered or to a duplicate submission.
   *
   */
  Duplicate = 'Duplicate',
  /**
   * The submission does not comply with the submission rules.
   *
   */
  IncorrectSubmission = 'IncorrectSubmission',
  /**
   * No reason specified. This option should be used to challenge removal requests.
   *
   */
  None = 'None'
}

export type Request = {
  __typename?: 'Request';
  /**
   * The arbitrator trusted to resolve disputes for the request.
   *
   */
  arbitrator: Scalars['Bytes'];
  /**
   * The extra data for the trusted arbitrator of the request.
   *
   */
  arbitratorExtraData: Scalars['Bytes'];
  /**
   * The challenges for the request.
   *
   */
  challenges: Array<Challenge>;
  /**
   * The creation time.
   *
   */
  creationTime: Scalars['BigInt'];
  /**
   * Current reason the registration request was challenged with. It's left empty for removal requests.
   *
   */
  currentReason: Reason;
  /**
   * True if a dispute was raised. Note that the request can enter disputed state multiple times, once per reason.
   *
   */
  disputed: Scalars['Boolean'];
  /**
   * The evidence for the request.
   *
   */
  evidence: Array<Evidence>;
  /**
   * The request's number of evidence.
   *
   */
  evidenceLength: Scalars['BigInt'];
  /**
   * The request's ID, keccak256(submissionID, submissionRequestsLength).
   *
   */
  id: Scalars['ID'];
  /**
   * The ID of the last challenge, which is equal to the total number of challenges for the request
   *
   */
  lastChallengeID: Scalars['BigInt'];
  /**
   * Time when the submission's status was last updated. It's used to track when the challenge period ends.
   *
   */
  lastStatusChange: Scalars['BigInt'];
  /**
   * The meta evidence for the request.
   *
   */
  metaEvidence: MetaEvidence;
  /**
   * Tracks the number of simultaneously raised disputes. Parallel disputes are only allowed for `Reason.Duplicate`.
   *
   */
  nbParallelDisputes: Scalars['BigInt'];
  /**
   * Stores the index of the last processed vouch in the array of vouches. It's used for partial processing of the vouches in resolved requests.
   *
   */
  penaltyIndex: Scalars['BigInt'];
  /**
   * True if the request is for registration.
   *
   */
  registration: Scalars['Boolean'];
  /**
   * The request index.
   *
   */
  requestIndex: Scalars['BigInt'];
  /**
   * Address that made the request. It matches the submission's ID in registration requests.
   *
   */
  requester: Scalars['Bytes'];
  /**
   * True if the requester has already had a dispute that wasn't ruled in his favor.
   *
   */
  requesterLost: Scalars['Boolean'];
  /**
   * The time the request was resolved.
   *
   */
  resolutionTime: Scalars['BigInt'];
  /**
   * True if the request is executed and/or all raised disputes are resolved.
   *
   */
  resolved: Scalars['Boolean'];
  /**
   * The submission the request is for.
   *
   */
  submission: Submission;
  /**
   * The request type
   *
   */
  type: RequestType;
  /**
   * Address of the challenger who won a dispute, and who users, that vouched for the request, must pay fines to.
   *
   */
  ultimateChallenger?: Maybe<Scalars['Bytes']>;
  /**
   * Stores all reasons that were used to challenge the request, to make sure that each reason was only used once.
   *
   */
  usedReasons: Array<Reason>;
  /**
   * True if vouch was not processed and vouchee is resolved.
   *
   */
  vouchReleaseReady: Scalars['Boolean'];
  /**
   * The submissions that vouched for the request.
   *
   */
  vouches: Array<Submission>;
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
  orderBy?: InputMaybe<Submission_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Submission_Filter>;
};

export enum RequestType {
  /**
   * This is a request to add a profile to the registry
   *
   */
  Registration = 'Registration',
  /**
   * This is a removal request
   *
   */
  Removal = 'Removal'
}

export type Request_Filter = {
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
  disputed?: InputMaybe<Scalars['Boolean']>;
  disputed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  disputed_not?: InputMaybe<Scalars['Boolean']>;
  disputed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  evidenceLength?: InputMaybe<Scalars['BigInt']>;
  evidenceLength_gt?: InputMaybe<Scalars['BigInt']>;
  evidenceLength_gte?: InputMaybe<Scalars['BigInt']>;
  evidenceLength_in?: InputMaybe<Array<Scalars['BigInt']>>;
  evidenceLength_lt?: InputMaybe<Scalars['BigInt']>;
  evidenceLength_lte?: InputMaybe<Scalars['BigInt']>;
  evidenceLength_not?: InputMaybe<Scalars['BigInt']>;
  evidenceLength_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  lastChallengeID?: InputMaybe<Scalars['BigInt']>;
  lastChallengeID_gt?: InputMaybe<Scalars['BigInt']>;
  lastChallengeID_gte?: InputMaybe<Scalars['BigInt']>;
  lastChallengeID_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastChallengeID_lt?: InputMaybe<Scalars['BigInt']>;
  lastChallengeID_lte?: InputMaybe<Scalars['BigInt']>;
  lastChallengeID_not?: InputMaybe<Scalars['BigInt']>;
  lastChallengeID_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastStatusChange?: InputMaybe<Scalars['BigInt']>;
  lastStatusChange_gt?: InputMaybe<Scalars['BigInt']>;
  lastStatusChange_gte?: InputMaybe<Scalars['BigInt']>;
  lastStatusChange_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastStatusChange_lt?: InputMaybe<Scalars['BigInt']>;
  lastStatusChange_lte?: InputMaybe<Scalars['BigInt']>;
  lastStatusChange_not?: InputMaybe<Scalars['BigInt']>;
  lastStatusChange_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  metaEvidence?: InputMaybe<Scalars['String']>;
  metaEvidence_contains?: InputMaybe<Scalars['String']>;
  metaEvidence_contains_nocase?: InputMaybe<Scalars['String']>;
  metaEvidence_ends_with?: InputMaybe<Scalars['String']>;
  metaEvidence_ends_with_nocase?: InputMaybe<Scalars['String']>;
  metaEvidence_gt?: InputMaybe<Scalars['String']>;
  metaEvidence_gte?: InputMaybe<Scalars['String']>;
  metaEvidence_in?: InputMaybe<Array<Scalars['String']>>;
  metaEvidence_lt?: InputMaybe<Scalars['String']>;
  metaEvidence_lte?: InputMaybe<Scalars['String']>;
  metaEvidence_not?: InputMaybe<Scalars['String']>;
  metaEvidence_not_contains?: InputMaybe<Scalars['String']>;
  metaEvidence_not_contains_nocase?: InputMaybe<Scalars['String']>;
  metaEvidence_not_ends_with?: InputMaybe<Scalars['String']>;
  metaEvidence_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  metaEvidence_not_in?: InputMaybe<Array<Scalars['String']>>;
  metaEvidence_not_starts_with?: InputMaybe<Scalars['String']>;
  metaEvidence_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  metaEvidence_starts_with?: InputMaybe<Scalars['String']>;
  metaEvidence_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nbParallelDisputes?: InputMaybe<Scalars['BigInt']>;
  nbParallelDisputes_gt?: InputMaybe<Scalars['BigInt']>;
  nbParallelDisputes_gte?: InputMaybe<Scalars['BigInt']>;
  nbParallelDisputes_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nbParallelDisputes_lt?: InputMaybe<Scalars['BigInt']>;
  nbParallelDisputes_lte?: InputMaybe<Scalars['BigInt']>;
  nbParallelDisputes_not?: InputMaybe<Scalars['BigInt']>;
  nbParallelDisputes_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  penaltyIndex?: InputMaybe<Scalars['BigInt']>;
  penaltyIndex_gt?: InputMaybe<Scalars['BigInt']>;
  penaltyIndex_gte?: InputMaybe<Scalars['BigInt']>;
  penaltyIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  penaltyIndex_lt?: InputMaybe<Scalars['BigInt']>;
  penaltyIndex_lte?: InputMaybe<Scalars['BigInt']>;
  penaltyIndex_not?: InputMaybe<Scalars['BigInt']>;
  penaltyIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  registration?: InputMaybe<Scalars['Boolean']>;
  registration_in?: InputMaybe<Array<Scalars['Boolean']>>;
  registration_not?: InputMaybe<Scalars['Boolean']>;
  registration_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  requestIndex?: InputMaybe<Scalars['BigInt']>;
  requestIndex_gt?: InputMaybe<Scalars['BigInt']>;
  requestIndex_gte?: InputMaybe<Scalars['BigInt']>;
  requestIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  requestIndex_lt?: InputMaybe<Scalars['BigInt']>;
  requestIndex_lte?: InputMaybe<Scalars['BigInt']>;
  requestIndex_not?: InputMaybe<Scalars['BigInt']>;
  requestIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  resolved?: InputMaybe<Scalars['Boolean']>;
  resolved_in?: InputMaybe<Array<Scalars['Boolean']>>;
  resolved_not?: InputMaybe<Scalars['Boolean']>;
  resolved_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  submission?: InputMaybe<Scalars['String']>;
  submission_contains?: InputMaybe<Scalars['String']>;
  submission_contains_nocase?: InputMaybe<Scalars['String']>;
  submission_ends_with?: InputMaybe<Scalars['String']>;
  submission_ends_with_nocase?: InputMaybe<Scalars['String']>;
  submission_gt?: InputMaybe<Scalars['String']>;
  submission_gte?: InputMaybe<Scalars['String']>;
  submission_in?: InputMaybe<Array<Scalars['String']>>;
  submission_lt?: InputMaybe<Scalars['String']>;
  submission_lte?: InputMaybe<Scalars['String']>;
  submission_not?: InputMaybe<Scalars['String']>;
  submission_not_contains?: InputMaybe<Scalars['String']>;
  submission_not_contains_nocase?: InputMaybe<Scalars['String']>;
  submission_not_ends_with?: InputMaybe<Scalars['String']>;
  submission_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  submission_not_in?: InputMaybe<Array<Scalars['String']>>;
  submission_not_starts_with?: InputMaybe<Scalars['String']>;
  submission_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  submission_starts_with?: InputMaybe<Scalars['String']>;
  submission_starts_with_nocase?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<RequestType>;
  type_in?: InputMaybe<Array<RequestType>>;
  type_not?: InputMaybe<RequestType>;
  type_not_in?: InputMaybe<Array<RequestType>>;
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
  vouchReleaseReady?: InputMaybe<Scalars['Boolean']>;
  vouchReleaseReady_in?: InputMaybe<Array<Scalars['Boolean']>>;
  vouchReleaseReady_not?: InputMaybe<Scalars['Boolean']>;
  vouchReleaseReady_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  vouches?: InputMaybe<Array<Scalars['String']>>;
  vouches_contains?: InputMaybe<Array<Scalars['String']>>;
  vouches_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  vouches_not?: InputMaybe<Array<Scalars['String']>>;
  vouches_not_contains?: InputMaybe<Array<Scalars['String']>>;
  vouches_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
};

export enum Request_OrderBy {
  Arbitrator = 'arbitrator',
  ArbitratorExtraData = 'arbitratorExtraData',
  Challenges = 'challenges',
  CreationTime = 'creationTime',
  CurrentReason = 'currentReason',
  Disputed = 'disputed',
  Evidence = 'evidence',
  EvidenceLength = 'evidenceLength',
  Id = 'id',
  LastChallengeId = 'lastChallengeID',
  LastStatusChange = 'lastStatusChange',
  MetaEvidence = 'metaEvidence',
  NbParallelDisputes = 'nbParallelDisputes',
  PenaltyIndex = 'penaltyIndex',
  Registration = 'registration',
  RequestIndex = 'requestIndex',
  Requester = 'requester',
  RequesterLost = 'requesterLost',
  ResolutionTime = 'resolutionTime',
  Resolved = 'resolved',
  Submission = 'submission',
  Type = 'type',
  UltimateChallenger = 'ultimateChallenger',
  UsedReasons = 'usedReasons',
  VouchReleaseReady = 'vouchReleaseReady',
  Vouches = 'vouches'
}

export type Round = {
  __typename?: 'Round';
  /**
   * The challenge the round is for.
   *
   */
  challenge: Challenge;
  /**
   * The IDs of the contributions of this round.
   *
   */
  contributionIDs: Array<Scalars['String']>;
  /**
   * The contributions for the round.
   *
   */
  contributions: Array<Contribution>;
  /**
   * The number of contributions made to this round.
   *
   */
  contributionsLength: Scalars['BigInt'];
  /**
   * The creation time.
   *
   */
  creationTime: Scalars['BigInt'];
  /**
   * Sum of reimbursable fees and stake rewards available to the parties that made contributions to the side that ultimately won.
   *
   */
  feeRewards: Scalars['BigInt'];
  /**
   * True for a side when it has fully paid its fee. False otherwise.
   *
   */
  hasPaid: Array<Scalars['Boolean']>;
  /**
   * The round's ID, keccak256(challengeID, roundIndex).
   *
   */
  id: Scalars['ID'];
  /**
   * Tracks the fees paid by each side in the round.
   *
   */
  paidFees: Array<Scalars['BigInt']>;
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
  contributionIDs?: InputMaybe<Array<Scalars['String']>>;
  contributionIDs_contains?: InputMaybe<Array<Scalars['String']>>;
  contributionIDs_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  contributionIDs_not?: InputMaybe<Array<Scalars['String']>>;
  contributionIDs_not_contains?: InputMaybe<Array<Scalars['String']>>;
  contributionIDs_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  contributionsLength?: InputMaybe<Scalars['BigInt']>;
  contributionsLength_gt?: InputMaybe<Scalars['BigInt']>;
  contributionsLength_gte?: InputMaybe<Scalars['BigInt']>;
  contributionsLength_in?: InputMaybe<Array<Scalars['BigInt']>>;
  contributionsLength_lt?: InputMaybe<Scalars['BigInt']>;
  contributionsLength_lte?: InputMaybe<Scalars['BigInt']>;
  contributionsLength_not?: InputMaybe<Scalars['BigInt']>;
  contributionsLength_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  hasPaid?: InputMaybe<Array<Scalars['Boolean']>>;
  hasPaid_contains?: InputMaybe<Array<Scalars['Boolean']>>;
  hasPaid_contains_nocase?: InputMaybe<Array<Scalars['Boolean']>>;
  hasPaid_not?: InputMaybe<Array<Scalars['Boolean']>>;
  hasPaid_not_contains?: InputMaybe<Array<Scalars['Boolean']>>;
  hasPaid_not_contains_nocase?: InputMaybe<Array<Scalars['Boolean']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  paidFees?: InputMaybe<Array<Scalars['BigInt']>>;
  paidFees_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  paidFees_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  paidFees_not?: InputMaybe<Array<Scalars['BigInt']>>;
  paidFees_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  paidFees_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Round_OrderBy {
  Challenge = 'challenge',
  ContributionIDs = 'contributionIDs',
  Contributions = 'contributions',
  ContributionsLength = 'contributionsLength',
  CreationTime = 'creationTime',
  FeeRewards = 'feeRewards',
  HasPaid = 'hasPaid',
  Id = 'id',
  PaidFees = 'paidFees'
}

export enum Status {
  /**
   * The submission doesn't have a pending status.
   *
   */
  None = 'None',
  /**
   * The submission is in the state where it can be challenged, or accepted to the list, if there are no challenges within the time limit.
   *
   */
  PendingRegistration = 'PendingRegistration',
  /**
   * The submission is in the state where it can be challenged, or removed from the list, if there are no challenges within the time limit.
   *
   */
  PendingRemoval = 'PendingRemoval',
  /**
   * The submission is in the state where it can be vouched for and crowdfunded.
   *
   */
  Vouching = 'Vouching'
}

export type Submission = {
  __typename?: 'Submission';
  /**
   * The creation time.
   *
   */
  creationTime: Scalars['BigInt'];
  /**
   * True if a dispute was raised. Note that the submission can enter disputed state multiple times, once per reason.
   *
   */
  disputed: Scalars['Boolean'];
  /**
   * The submission's address.
   *
   */
  id: Scalars['ID'];
  /**
   * The resolution time of the most recent request.
   *
   */
  latestRequestResolutionTime: Scalars['BigInt'];
  /**
   * The name of the submission.
   *
   */
  name: Scalars['String'];
  /**
   * Whether the submission is in the registry or not.
   *
   */
  registered: Scalars['Boolean'];
  /**
   * True if this submission has been removed.
   *
   */
  removed: Scalars['Boolean'];
  /**
   * The submission's status change requests.
   *
   */
  requests: Array<Request>;
  /**
   * The submission's number of requests.
   *
   */
  requestsLength: Scalars['BigInt'];
  /**
   * True if this submission was part of the seeding event.
   *
   */
  seeded: Scalars['Boolean'];
  /**
   * The current status of the submission.
   *
   */
  status: Status;
  /**
   * The time when the submission was accepted to the list.
   *
   */
  submissionTime?: Maybe<Scalars['BigInt']>;
  /**
   * The vouchee that entered `Status.PendingRegistration` status and is using the submission's vouch.
   *
   */
  usedVouch?: Maybe<Submission>;
  /**
   * Submissions the submission has vouched for.
   *
   */
  vouchees: Array<Submission>;
  /**
   * Submissions that have vouched for this submission. Note that vouches given by signature are added when the submission enters `Status.PendingRegistration`.
   *
   */
  vouchesReceived: Array<Submission>;
  /**
   * Number of vouches received.
   *
   */
  vouchesReceivedLength: Scalars['BigInt'];
};


export type SubmissionRequestsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Request_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Request_Filter>;
};


export type SubmissionVoucheesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Submission_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Submission_Filter>;
};


export type SubmissionVouchesReceivedArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Submission_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Submission_Filter>;
};

export type Submission_Filter = {
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
  disputed?: InputMaybe<Scalars['Boolean']>;
  disputed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  disputed_not?: InputMaybe<Scalars['Boolean']>;
  disputed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  latestRequestResolutionTime?: InputMaybe<Scalars['BigInt']>;
  latestRequestResolutionTime_gt?: InputMaybe<Scalars['BigInt']>;
  latestRequestResolutionTime_gte?: InputMaybe<Scalars['BigInt']>;
  latestRequestResolutionTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  latestRequestResolutionTime_lt?: InputMaybe<Scalars['BigInt']>;
  latestRequestResolutionTime_lte?: InputMaybe<Scalars['BigInt']>;
  latestRequestResolutionTime_not?: InputMaybe<Scalars['BigInt']>;
  latestRequestResolutionTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  registered?: InputMaybe<Scalars['Boolean']>;
  registered_in?: InputMaybe<Array<Scalars['Boolean']>>;
  registered_not?: InputMaybe<Scalars['Boolean']>;
  registered_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  removed?: InputMaybe<Scalars['Boolean']>;
  removed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  removed_not?: InputMaybe<Scalars['Boolean']>;
  removed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  requestsLength?: InputMaybe<Scalars['BigInt']>;
  requestsLength_gt?: InputMaybe<Scalars['BigInt']>;
  requestsLength_gte?: InputMaybe<Scalars['BigInt']>;
  requestsLength_in?: InputMaybe<Array<Scalars['BigInt']>>;
  requestsLength_lt?: InputMaybe<Scalars['BigInt']>;
  requestsLength_lte?: InputMaybe<Scalars['BigInt']>;
  requestsLength_not?: InputMaybe<Scalars['BigInt']>;
  requestsLength_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  seeded?: InputMaybe<Scalars['Boolean']>;
  seeded_in?: InputMaybe<Array<Scalars['Boolean']>>;
  seeded_not?: InputMaybe<Scalars['Boolean']>;
  seeded_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  status?: InputMaybe<Status>;
  status_in?: InputMaybe<Array<Status>>;
  status_not?: InputMaybe<Status>;
  status_not_in?: InputMaybe<Array<Status>>;
  submissionTime?: InputMaybe<Scalars['BigInt']>;
  submissionTime_gt?: InputMaybe<Scalars['BigInt']>;
  submissionTime_gte?: InputMaybe<Scalars['BigInt']>;
  submissionTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  submissionTime_lt?: InputMaybe<Scalars['BigInt']>;
  submissionTime_lte?: InputMaybe<Scalars['BigInt']>;
  submissionTime_not?: InputMaybe<Scalars['BigInt']>;
  submissionTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  usedVouch?: InputMaybe<Scalars['String']>;
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
  vouchees?: InputMaybe<Array<Scalars['String']>>;
  vouchees_contains?: InputMaybe<Array<Scalars['String']>>;
  vouchees_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  vouchees_not?: InputMaybe<Array<Scalars['String']>>;
  vouchees_not_contains?: InputMaybe<Array<Scalars['String']>>;
  vouchees_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  vouchesReceived?: InputMaybe<Array<Scalars['String']>>;
  vouchesReceivedLength?: InputMaybe<Scalars['BigInt']>;
  vouchesReceivedLength_gt?: InputMaybe<Scalars['BigInt']>;
  vouchesReceivedLength_gte?: InputMaybe<Scalars['BigInt']>;
  vouchesReceivedLength_in?: InputMaybe<Array<Scalars['BigInt']>>;
  vouchesReceivedLength_lt?: InputMaybe<Scalars['BigInt']>;
  vouchesReceivedLength_lte?: InputMaybe<Scalars['BigInt']>;
  vouchesReceivedLength_not?: InputMaybe<Scalars['BigInt']>;
  vouchesReceivedLength_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  vouchesReceived_contains?: InputMaybe<Array<Scalars['String']>>;
  vouchesReceived_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  vouchesReceived_not?: InputMaybe<Array<Scalars['String']>>;
  vouchesReceived_not_contains?: InputMaybe<Array<Scalars['String']>>;
  vouchesReceived_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
};

export enum Submission_OrderBy {
  CreationTime = 'creationTime',
  Disputed = 'disputed',
  Id = 'id',
  LatestRequestResolutionTime = 'latestRequestResolutionTime',
  Name = 'name',
  Registered = 'registered',
  Removed = 'removed',
  Requests = 'requests',
  RequestsLength = 'requestsLength',
  Seeded = 'seeded',
  Status = 'status',
  SubmissionTime = 'submissionTime',
  UsedVouch = 'usedVouch',
  Vouchees = 'vouchees',
  VouchesReceived = 'vouchesReceived',
  VouchesReceivedLength = 'vouchesReceivedLength'
}

export type SubmissionsRegistry = {
  __typename?: 'SubmissionsRegistry';
  /**
   * List of all current submissions
   *
   */
  currentSubmissions: Array<Submission>;
  /**
   * List of all expired submissions
   *
   */
  expiredSubmissions: Array<Submission>;
  id: Scalars['ID'];
};


export type SubmissionsRegistryCurrentSubmissionsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Submission_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Submission_Filter>;
};


export type SubmissionsRegistryExpiredSubmissionsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Submission_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Submission_Filter>;
};

export type SubmissionsRegistry_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  currentSubmissions?: InputMaybe<Array<Scalars['String']>>;
  currentSubmissions_contains?: InputMaybe<Array<Scalars['String']>>;
  currentSubmissions_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  currentSubmissions_not?: InputMaybe<Array<Scalars['String']>>;
  currentSubmissions_not_contains?: InputMaybe<Array<Scalars['String']>>;
  currentSubmissions_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  expiredSubmissions?: InputMaybe<Array<Scalars['String']>>;
  expiredSubmissions_contains?: InputMaybe<Array<Scalars['String']>>;
  expiredSubmissions_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  expiredSubmissions_not?: InputMaybe<Array<Scalars['String']>>;
  expiredSubmissions_not_contains?: InputMaybe<Array<Scalars['String']>>;
  expiredSubmissions_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
};

export enum SubmissionsRegistry_OrderBy {
  CurrentSubmissions = 'currentSubmissions',
  ExpiredSubmissions = 'expiredSubmissions',
  Id = 'id'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  challenge?: Maybe<Challenge>;
  challenges: Array<Challenge>;
  contract?: Maybe<Contract>;
  contracts: Array<Contract>;
  contribution?: Maybe<Contribution>;
  contributions: Array<Contribution>;
  counter?: Maybe<Counter>;
  counters: Array<Counter>;
  evidence?: Maybe<Evidence>;
  evidences: Array<Evidence>;
  metaEvidence?: Maybe<MetaEvidence>;
  metaEvidences: Array<MetaEvidence>;
  request?: Maybe<Request>;
  requests: Array<Request>;
  round?: Maybe<Round>;
  rounds: Array<Round>;
  submission?: Maybe<Submission>;
  submissions: Array<Submission>;
  submissionsRegistries: Array<SubmissionsRegistry>;
  submissionsRegistry?: Maybe<SubmissionsRegistry>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
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


export type SubscriptionMetaEvidenceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionMetaEvidencesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MetaEvidence_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MetaEvidence_Filter>;
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


export type SubscriptionSubmissionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionSubmissionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Submission_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Submission_Filter>;
};


export type SubscriptionSubmissionsRegistriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SubmissionsRegistry_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SubmissionsRegistry_Filter>;
};


export type SubscriptionSubmissionsRegistryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
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

export type CounterQueryVariables = Exact<{ [key: string]: never; }>;


export type CounterQuery = { __typename?: 'Query', counter?: { __typename?: 'Counter', vouchingPhase: any, pendingRemoval: any, pendingRegistration: any, challengedRemoval: any, challengedRegistration: any, registered: any, expired: any, removed: any } | null };

export type SubmissionsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Submission_Filter>;
}>;


export type SubmissionsQuery = { __typename?: 'Query', submissions: Array<{ __typename?: 'Submission', id: string, name: string, status: Status, registered: boolean, creationTime: any, submissionTime?: any | null, disputed: boolean, requests: Array<{ __typename?: 'Request', evidence: Array<{ __typename?: 'Evidence', URI: string }> }> }> };


export const CounterDocument = gql`
    query counter {
  counter(id: 1) {
    vouchingPhase
    pendingRemoval
    pendingRegistration
    challengedRemoval
    challengedRegistration
    registered
    expired
    removed
  }
}
    `;
export const SubmissionsDocument = gql`
    query submissions($skip: Int, $first: Int, $where: Submission_filter = {removed: false}) {
  submissions(
    first: $first
    skip: $skip
    where: $where
    orderBy: creationTime
    orderDirection: desc
  ) {
    id
    name
    status
    registered
    creationTime
    submissionTime
    disputed
    requests(
      first: 1
      where: {registration: true}
      orderBy: creationTime
      orderDirection: desc
    ) {
      evidence(orderBy: creationTime, first: 1) {
        URI
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    counter(variables?: CounterQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CounterQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CounterQuery>(CounterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'counter', 'query');
    },
    submissions(variables?: SubmissionsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SubmissionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SubmissionsQuery>(SubmissionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'submissions', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;