import { Status } from "generated/graphql";

export const REQUESTS_DISPLAY_BATCH = 12;
export const HUMANITIES_DISPLAY_BATCH = 12;

export const STATUS_TO_COLOR: Record<Status, string> = {
  Vouching: "vouching",
  Resolving: "resolving",
  Disputed: "disputed",
  Resolved: "resolved",
};
