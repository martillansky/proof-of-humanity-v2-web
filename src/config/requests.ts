import { Request_Filter } from "generated/graphql";

export const requestStatus = {
  all: { filter: {} },
  vouching: { filter: { status: "vouching" } },
  pendingClaim: { filter: { status: "resolving", revocation: false } },
  pendingRevocation: { filter: { status: "resolving", revocation: true } },
  disputedClaim: { filter: { status: "disputed", revocation: false } },
  disputedRevocation: { filter: { status: "disputed", revocation: true } },
  resolvedClaim: { filter: { status: "resolved", revocation: false } },
  resolvedRevocation: { filter: { status: "resolved", revocation: true } },
  withdrawn: { filter: { status: "withdrawn" } },
} as Record<string, { filter: Request_Filter }>;

export type RequestStatus = keyof typeof requestStatus;

export const queryToStatus = (
  status: string,
  revocation: boolean
): RequestStatus => {
  switch (status) {
    case "vouching":
    case "withdrawn":
      return status;
    case "resolving":
      return revocation ? "pendingRevocation" : "pendingClaim";
    case "disputed":
      return revocation ? "disputedRevocation" : "disputedClaim";
    case "resolved":
      return revocation ? "resolvedRevocation" : "resolvedClaim";
    default:
      return "all";
  }
};

export const statusFilters = Object.keys(requestStatus) as RequestStatus[];
