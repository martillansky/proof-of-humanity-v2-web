import { useMemo } from "react";
import { timeAgo } from "utils/time";

interface TimeAgoProps {
  time: number;
}

const TimeAgo: React.FC<TimeAgoProps> = ({ time }) => (
  <span
    className="w-fit cursor-pointer"
    title={useMemo(() => new Date(time * 1000).toLocaleString(), [time])}
  >
    {timeAgo(time)}
  </span>
);

export default TimeAgo;
