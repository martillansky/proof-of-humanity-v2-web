import { Status } from "generated/graphql";

export const REQUEST_STATUS = {
  all: { filter: {} },
  vouching: { filter: { status: "Vouching" } },
  resolvingClaim: { filter: { status: "Resolving", registration: true } },
  resolvingRevokal: { filter: { status: "Resolving", registration: false } },
  disputedClaim: { filter: { status: "Disputed", registration: true } },
  disputedRevokal: { filter: { status: "Disputed", registration: false } },
  resolvedClaim: { filter: { status: "Resolved", registration: true } },
  resolvedRevokal: { filter: { status: "Resolved", registration: false } },
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
