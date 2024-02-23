export const REQUESTS_DISPLAY_BATCH = 12;

export const statusToColor = {
  vouching: "vouching",
  withdrawn: "withdrawn",
  pendingRevocation: "revocation",
  pendingClaim: "claim",
  disputedRevocation: "challenged",
  disputedClaim: "challenged",
  resolvedRevocation: "removed",
  resolvedClaim: "registered",
};

// vouching
// registered
// removed
// revocation
// claim
// challenged

export const colorForStatus = (status: string, revocation: boolean, expired: boolean) => {
  switch (status) {
    case "vouching":
    case "withdrawn":
      return status;
    case "resolving":
      return revocation ? "revocation" : "claim";
    case "disputed":
      return "challenged";
    case "resolved":
      return revocation ? "removed" : expired? "expired" : "registered";
    default:
      throw new Error("status error");
  }
};
