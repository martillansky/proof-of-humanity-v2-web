import { SoulInterface } from "api/souls";
import { CHAIN_ID_TO_NAME } from "constants/chains";
import useWeb3 from "hooks/useWeb3";
import { Link } from "react-router-dom";
import { shortenAddress } from "utils/address";
import { encodeId } from "utils/identifier";
import ProofOfHumanityLogo from "../../assets/svg/ProofOfHumanityLogo.svg";

interface SoulWidgetProps {
  soul: SoulInterface;
}

const SoulWidget: React.FC<SoulWidgetProps> = ({ soul }) => {
  const { account } = useWeb3();

  return (
    <div className="px-8 pb-8 flex flex-col justify-center items-center rounded bg-white">
      <div className="bordered absolute -top-16 w-32 h-32 rounded-full shadow-md">
        <div className="w-full h-full px-6 pt-5 rounded-full bg-white shadow-md">
          <ProofOfHumanityLogo />
        </div>
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="mt-20">
          Soul ID: <strong>{encodeId(soul.id)}</strong>
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
        <Link className="btn-main" to={`/claim/${encodeId(soul.id)}`}>
          Claim this soul
        </Link>
        {soul.claimed && account && account === soul.owner!.id && (
          <button className="btn-main">Transfer to another chain</button>
        )}
      </div>
    </div>
  );
};

export default SoulWidget;
