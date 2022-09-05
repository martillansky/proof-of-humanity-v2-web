import { Link } from "react-router-dom";
import { HumanityInterface } from "api/humanities";
import { prettifyId } from "utils/identifier";
import ProofOfHumanityLogo from "../../assets/svg/ProofOfHumanityLogo.svg";

interface HumanityCardProps extends React.RefAttributes<HTMLAnchorElement> {
  humanity: HumanityInterface;
}

const HumanityCard: React.FC<HumanityCardProps> = ({ humanity, ...props }) => (
  <Link
    to={`/humanity/${prettifyId(humanity.id)}`}
    className="mt-8 p-4 relative flex flex-col items-end border bg-white rounded cursor-pointer"
    {...props}
  >
    <div className="absolute left-8 -top-8 w-32 h-32 px-6 pt-5 rounded-full border-2 bg-white shadow">
      <ProofOfHumanityLogo />
    </div>
    <strong>Humanity ID: {prettifyId(humanity.id)}</strong>
    <div>{humanity.claimed ? `Claimed` : `Not claimed`}</div>
    <div className="px-2 py-1 bg-blue-500 text-white font-bold rounded-full">
      {humanity.nbPendingRequests}
    </div>
  </Link>
);

export default HumanityCard;
