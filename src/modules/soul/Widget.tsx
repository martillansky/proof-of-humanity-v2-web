import { SoulInterface } from "api/souls";
import { CHAIN_ID_TO_NAME } from "constants/chains";
import { shortenAddress } from "utils/address";
import ProofOfHumanityLogo from "../../assets/svg/ProofOfHumanityLogo.svg";

interface SoulWidgetProps {
  soul: SoulInterface;
}

const SoulWidget: React.FC<SoulWidgetProps> = ({ soul }) => {
  return (
    <div className="px-8 pb-8 flex flex-col justify-center items-center rounded bg-white">
      <div className="bordered absolute -top-16 w-32 h-32 rounded-full shadow-md">
        <div className="w-full h-full px-6 pt-5 rounded-full bg-white shadow-md">
          <ProofOfHumanityLogo />
        </div>
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="mt-20">
          Soul ID: <strong>{soul.id}</strong>
          <div>{soul.claimed ? `Claimed` : `Not claimed`}</div>
          {soul.claimed && <div>Owner: {shortenAddress(soul.owner!.id)}</div>}
        </div>
        <div>
          Home chain: <strong>{CHAIN_ID_TO_NAME[soul.chainID]}</strong>
        </div>
        <div className="px-2 py-1 bg-blue-500 text-white font-bold rounded-full">
          {soul.nbPendingRequests} pending requests
        </div>
        <div className="mb-8">Claimed</div>
        <button className="btn-main">Claim this soul</button>
      </div>
    </div>
  );
};

export default SoulWidget;
