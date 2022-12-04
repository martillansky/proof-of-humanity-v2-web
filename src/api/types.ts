import { ChainId } from "enums/ChainId";
import { HumanityQuery, RequestQuery, RequestsQuery } from "generated/graphql";

export type RequestQueryItem = NonNullable<RequestQuery["request"]>;
export type RequestsQueryItem = ArrayElement<RequestsQuery["requests"]>;

export type PendingRequest = ArrayElement<
  NonNullable<HumanityQuery["humanity"]>["pendingRequests"]
> & { chainId: ChainId };
