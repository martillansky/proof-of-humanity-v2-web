import { Status } from "generated/graphql";

// enum RealStatus {
//   VOUCHING,
//   PENDING_REGISTRATION,
//   PENDING_REMOVAL,
//   CHALLENGED_REGISTRATION,
//   CHALLENGED_REMOVAL,
//   REGISTERED,
//   EXPIRED,
// }

export const SUBMISSIONS_STATUS = {
  all: {
    filter: {},
  },
  vouching: {
    filter: { status: "Vouching" },
  },
  pendingRegistration: {
    filter: { status: "PendingRegistration", disputed: false },
  },
  pendingRemoval: {
    filter: { status: "PendingRemoval", disputed: false },
  },
  challengedRegistration: {
    filter: { status: "PendingRegistration", disputed: true },
  },
  challengedRemoval: {
    filter: { status: "PendingRemoval", disputed: true },
  },
  registered: {
    filter: (submissionDuration: number) => ({
      status: "None",
      registered: true,
      submissionTime_gte:
        Math.floor(Date.now() / 1000) - (submissionDuration || 0),
    }),
  },
  expired: {
    filter: (submissionDuration: number) => ({
      status: "None",
      registered: true,
      submissionTime_lt:
        Math.floor(Date.now() / 1000) - (submissionDuration || 0),
    }),
  },
  removed: {
    filter: { status: "None", registered: false },
  },
} as const;

interface StatusParams {
  status: Status;
  registered: boolean;
  submissionTime: number;
  disputed: boolean;
  submissionDuration: number;
}

export type SubmissionStatus = keyof typeof SUBMISSIONS_STATUS;

export const queryToStatus = ({
  status,
  disputed,
  registered,
  submissionTime,
  submissionDuration,
}: StatusParams): SubmissionStatus => {
  if (status === Status.Vouching) return "vouching";
  if (status === Status.PendingRegistration)
    return disputed ? "challengedRegistration" : "pendingRegistration";
  if (status === Status.PendingRemoval)
    return disputed ? "challengedRemoval" : "pendingRemoval";
  if (registered)
    return submissionTime < Math.floor(Date.now() / 1000) - submissionDuration
      ? "expired"
      : "registered";
  return "removed";
};

export const statusFilters = Object.keys(
  SUBMISSIONS_STATUS
) as SubmissionStatus[];
