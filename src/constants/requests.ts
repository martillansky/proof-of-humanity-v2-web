import { Status } from "generated/graphql";

export const REQUEST_STATUS = {
  all: { filter: {} },
  vouching: { filter: { status: Status.Vouching } },
  resolvingClaim: { filter: { status: Status.Resolving, registration: true } },
  resolvingRevokal: {
    filter: { status: Status.Resolving, registration: false },
  },
  disputedClaim: { filter: { status: Status.Disputed, registration: true } },
  disputedRevokal: { filter: { status: Status.Disputed, registration: false } },
  resolvedClaim: { filter: { status: Status.Resolved, registration: true } },
  resolvedRevokal: { filter: { status: Status.Resolved, registration: false } },
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
      return registration ? "resolvingClaim" : "resolvingRevokal";
    case Status.Disputed:
      return registration ? "disputedClaim" : "disputedRevokal";
    case Status.Resolved:
      return registration ? "resolvedClaim" : "resolvedRevokal";
    default:
      return "all";
  }
};

export const statusFilters = Object.keys(REQUEST_STATUS) as RequestStatus[];