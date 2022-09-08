import cn from "classnames";
import { RequestInterface } from "api/requests";
import ProofOfHumanityLogo from "../../assets/svg/ProofOfHumanityLogo.svg";
import Card from "./Individual";

const CardList: React.FC<{ requests: RequestInterface[] }> = ({ requests }) => (
  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
    {requests.map((requests, i) => (
      <Card key={i} request={requests} />
    ))}
  </div>
);

export default CardList;

export const LoadingCardList: React.FC = () => (
  <div className="animate-pulse grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
    {[...Array(12)].map((_, i) => (
      <div
        key={i}
        className="h-72 rounded bg-white shadow-xl shadow-orange-500/10 flex items-center justify-center"
      >
        <ProofOfHumanityLogo
          className={cn({ "-scale-x-100 scale-y-100": Math.random() > 0.5 })}
          height={64}
          width={64}
        />
      </div>
    ))}
  </div>
);
