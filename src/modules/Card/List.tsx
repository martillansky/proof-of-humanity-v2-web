import { SubmissionInterface } from "src/api";
import Card from ".";
import ProofOfHumanityLogo from "../../assets/svg/ProofOfHumanityLogo.svg";
import cn from "classnames";

interface CardListInterface {
  submissions: SubmissionInterface[];
}

const CardList: React.FC<CardListInterface> = ({ submissions }) => (
  <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
    {submissions.map((submission, i) => (
      <Card key={i} submission={submission} />
    ))}
  </div>
);

export default CardList;

export const LoadingCardList: React.FC = () => (
  <div className="animate-pulse grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
    {[...Array(12)].map((_, i) => (
      <div
        key={i}
        className="h-72 rounded bg-white shadow-xl shadow-yellow flex items-center justify-center"
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
