import cn from "classnames";
import { Link } from "react-router-dom";
import { HumanityInterface } from "api/humanities";
import ProofOfHumanityLogo from "assets/svg/ProofOfHumanityLogo.svg";
import { prettifyId, shortenId } from "utils/identifier";

interface HumanityCardProps extends React.RefAttributes<HTMLAnchorElement> {
  humanity: HumanityInterface;
}

const HumanityCard: React.FC<HumanityCardProps> = ({ humanity, ...props }) => (
  <Link
    to={`/humanity/${prettifyId(humanity.id)}`}
    className="paper mt-8 p-4 relative flex flex-col items-end cursor-pointer"
    {...props}
  >
    <div className="absolute left-8 -top-8 w-32 h-32 px-6 pt-5 rounded-full border-2 bg-white shadow">
      <ProofOfHumanityLogo />
    </div>

    <div className="flex flex-col items-end">
      <span className="text-xs text-slate-400">Humanity ID</span>
      <span className="font-semibold text-xl">
        {shortenId(prettifyId(humanity.id))}
      </span>
    </div>
    <div className="text-theme font-semibold">
      {humanity.claimed ? `Claimed` : `Not claimed`}
    </div>

    <div
      className={cn(
        "absolute -top-4 -right-4 w-8 h-8 centered text-white font-bold rounded-full",
        parseInt(humanity.nbPendingRequests) ? "bg-blue-500" : "bg-slate-400"
      )}
    >
      {parseInt(humanity.nbPendingRequests) > 9
        ? "9+"
        : humanity.nbPendingRequests}
    </div>
  </Link>
);

export default HumanityCard;
