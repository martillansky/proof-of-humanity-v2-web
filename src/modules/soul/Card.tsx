import { SoulInterface } from "api/souls";
import { HTMLAttributes } from "react";
import ProofOfHumanityLogo from "../../assets/svg/ProofOfHumanityLogo.svg";

interface SoulCardProps extends HTMLAttributes<HTMLDivElement> {
  soul: SoulInterface;
}

const SoulCard: React.FC<SoulCardProps> = ({ soul, ...props }) => (
  <div
    className="mt-8 p-4 relative flex flex-col items-end border bg-white rounded cursor-pointer"
    {...props}
  >
    <div className="absolute left-8 -top-8 w-32 h-32 px-6 pt-5 rounded-full border-2 bg-white shadow">
      <ProofOfHumanityLogo />
    </div>
    <strong>{soul.id}</strong>
    <div>{soul.claimed ? `Claimed` : `Not claimed`}</div>
    <div className="px-2 py-1 bg-blue-500 text-white font-bold rounded-full">
      {soul.nbPendingRequests}
    </div>
  </div>
);

export default SoulCard;
