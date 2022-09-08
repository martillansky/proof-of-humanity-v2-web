import { RequestsQueryItem } from "api/types";

export const LoadingFallback = () => (
  <div className="p-2 h-84 flex flex-col items-center bg-white">
    <div className="animate-pulse mx-auto mb-2 h-32 w-32 bg-slate-200 rounded-full" />
    <div className="animate-pulse w-1/2 h-4 bg-slate-200 rounded" />
  </div>
);

export const ErrorFallback: React.FC<{ request: RequestsQueryItem }> = ({
  request,
}) => (
  <div className="animate-pulse p-2 h-84 flex flex-col items-center bg-white">
    <div className="mx-auto mb-2 h-32 w-32 bg-slate-200 rounded-full" />
    <span className="font-semibold">{request.claimer?.name}</span>
    <span>Some error occurred...</span>
  </div>
);
