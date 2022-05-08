// export enum SubmissionStatus {
//   ALL,
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
} as const;

export type SubmissionStatus = keyof typeof SUBMISSIONS_STATUS;

export const statusFilters = Object.keys(
  SUBMISSIONS_STATUS
) as SubmissionStatus[];
