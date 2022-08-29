import { RequestQuery, RequestsQuery } from "generated/graphql";

export type RequestQueryItem = NonNullable<RequestQuery["request"]>;
export type RequestsQueryItem = ArrayElement<RequestsQuery["requests"]>;
