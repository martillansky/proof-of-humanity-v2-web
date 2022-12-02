import { Status } from "generated/graphql";

export const REQUEST_STATUS = {
  all: { filter: {} },
  vouching: { filter: { status: Status.Vouching } },
  pendingClaim: { filter: { status: Status.Resolving, registration: true } },
  pendingRevocation: {
    filter: { status: Status.Resolving, registration: false },
  },
  disputedClaim: { filter: { status: Status.Disputed, registration: true } },
  disputedRevocation: {
    filter: { status: Status.Disputed, registration: false },
  },
  resolvedClaim: { filter: { status: Status.Resolved, registration: true } },
  resolvedRevocation: {
    filter: { status: Status.Resolved, registration: false },
  },
  withdrawn: { filter: { status: Status.Withdrawn } },
} as const;

export type RequestStatus = keyof typeof REQUEST_STATUS;

export const queryToStatus = (
  status: Status,
  registration: boolean
): RequestStatus => {
  switch (status) {
    case Status.Vouching:
      return "vouching";
    case Status.Resolving:
      return registration ? "pendingClaim" : "pendingRevocation";
    case Status.Disputed:
      return registration ? "disputedClaim" : "disputedRevocation";
    case Status.Resolved:
      return registration ? "resolvedClaim" : "resolvedRevocation";
    case Status.Withdrawn:
      return "withdrawn";
    default:
      return "all";
  }
};

export const statusFilters = Object.keys(REQUEST_STATUS) as RequestStatus[];
