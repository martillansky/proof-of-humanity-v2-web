import { Status } from "generated/graphql";

export const REQUEST_STATUS = {
  all: { filter: {} },
  vouching: { filter: { status: Status.Vouching } },
  pendingClaim: { filter: { status: Status.Resolving, revocation: false } },
  pendingRevocation: {
    filter: { status: Status.Resolving, revocation: true },
  },
  disputedClaim: { filter: { status: Status.Disputed, revocation: false } },
  disputedRevocation: {
    filter: { status: Status.Disputed, revocation: true },
  },
  resolvedClaim: { filter: { status: Status.Resolved, revocation: false } },
  resolvedRevocation: {
    filter: { status: Status.Resolved, revocation: true },
  },
  withdrawn: { filter: { status: Status.Withdrawn } },
} as const;

export type RequestStatus = keyof typeof REQUEST_STATUS;

export const queryToStatus = (
  status: Status,
  revocation: boolean
): RequestStatus => {
  switch (status) {
    case Status.Vouching:
      return "vouching";
    case Status.Resolving:
      return revocation ? "pendingRevocation" : "pendingClaim";
    case Status.Disputed:
      return revocation ? "disputedRevocation" : "disputedClaim";
    case Status.Resolved:
      return revocation ? "resolvedRevocation" : "resolvedClaim";
    case Status.Withdrawn:
      return "withdrawn";
    default:
      return "all";
  }
};

export const statusFilters = Object.keys(REQUEST_STATUS) as RequestStatus[];
