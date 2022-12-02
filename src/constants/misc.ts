import { Status } from "generated/graphql";

export const REQUESTS_DISPLAY_BATCH = 12;
export const HUMANITIES_DISPLAY_BATCH = 12;

export const STATUS_TO_COLOR: Record<Status, string> = {
  Vouching: "vouching",
  Resolving: "resolving",
  Disputed: "disputed",
  Resolved: "resolved",
  Withdrawn: "withdrawn",
};

// vouching
// registered
// removed
// revocation
// claim
// challenged

export const getColorForStatus = (status: Status, registration: boolean) => {
  switch (status) {
    case Status.Vouching:
      return "vouching";
    case Status.Resolving:
      return registration ? "claim" : "revocation";
    case Status.Disputed:
      return "challenged";
    case Status.Resolved:
      return registration ? "registered" : "removed";
    case Status.Withdrawn:
      return "withdrawn";
  }
};
