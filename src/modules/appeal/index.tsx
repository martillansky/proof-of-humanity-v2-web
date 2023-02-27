import { PartyEnum } from "enums/Party";
import { useState } from "react";
import { RequestQueryItem } from "api/types";
import Accordion from "components/Accordion";
import Field from "components/Field";
import Identicon from "components/Identicon";
import Progress from "components/Progress";
import { Status } from "generated/graphql";
import { useAppealCost } from "hooks/useKlerosLiquid";
import { useFundAppeal } from "hooks/useProofOfHumanity";
import { formatEth } from "utils/misc";

interface AppealProps {
  request: RequestQueryItem;
}

const Appeal: React.FC<AppealProps> = ({ request }) => {
  const lastChallenge = request.challenges.at(-1);
  const [appealCost] = useAppealCost([lastChallenge?.disputeId, "0x00"]);
  const fundAppeal = useFundAppeal();
  console.log({ request, appealCost, disputeId: lastChallenge?.disputeId });

  const [requesterInput, setRequesterInput] = useState(0);
  const [challengerInput, setChallengerInput] = useState(0);

  if (
    request.status !== Status.Disputed ||
    !lastChallenge ||
    lastChallenge.nbRounds === 0 ||
    lastChallenge.appealPeriodStart === 0 ||
    !appealCost
  )
    return null;

  return (
    <Accordion className="mb-4" title="Appeal">
      <div className="paper px-16 py-8">
        <h1 className="mb-4 text-xl">Appeal the decision</h1>
        <p className="txt">
          In order to appeal the decision, you need to fully fund the
          crowdfunding deposit. The dispute will be sent to the jurors when the
          full deposit is reached. Note that if the previous round loser funds
          its side, the previous round winner should also fully fund its side,
          in order not to lose the case.
        </p>

        <div className="flex">
          <div className="w-full p-4 border">
            <div className="mb-2 flex gap-2">
              <Identicon diameter={32} address={request.requester} />
              <div className="flex flex-col">
                <span className="text-sm">{request.requester}</span>
                <span className="text-xs">Claimer</span>
              </div>
            </div>
            <div className="flex gap-1">
              <Field
                type="number"
                onChange={(v) => setRequesterInput(+v.target.value)}
              />
              <button
                className="px-4 gradient rounded text-white"
                onClick={async () => {
                  await fundAppeal(
                    request.humanity.id,
                    request.index,
                    request.challenges.length - 1,
                    PartyEnum.Requester,
                    { value: requesterInput }
                  );
                }}
              >
                Fund
              </button>
            </div>
            <Progress
              value={33}
              label={`${formatEth(
                lastChallenge.rounds.at(0)?.requesterFunds
              )} ETH of ${formatEth(appealCost)} ETH`}
            />
          </div>

          <div className="w-full p-4 border">
            <div className="mb-2 flex gap-2">
              <Identicon diameter={32} address={lastChallenge.challenger} />
              <div className="flex flex-col">
                <span className="text-sm">{lastChallenge.challenger}</span>
                <span className="text-xs">Challenger</span>
              </div>
            </div>
            <div className="flex gap-1">
              <Field
                type="number"
                onChange={(v) => setChallengerInput(+v.target.value)}
              />
              <button
                className="px-4 gradient rounded text-white"
                onClick={async () => {
                  await fundAppeal(
                    request.humanity.id,
                    request.index,
                    request.challenges.length - 1,
                    PartyEnum.Challenger,
                    { value: challengerInput }
                  );
                }}
              >
                Fund
              </button>
            </div>
            <Progress
              value={33}
              label={`${
                lastChallenge.rounds.at(0)?.challengerFunds
              } ETH of ${formatEth(appealCost)} ETH`}
            />
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default Appeal;
