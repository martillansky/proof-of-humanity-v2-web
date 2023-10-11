"use client";

import Accordion from "components/Accordion";
import Identicon from "components/Identicon";
import Progress from "components/Progress";
import { formatEth } from "utils/misc";
import usePoHWrite from "contracts/hooks/usePoHWrite";
import { Address, Hash } from "viem";

interface AppealProps {
  pohId: Hash;
  requester: Address;
  challenger: Address;
  disputeId: bigint;
  requestIndex: bigint;
  challengeIndex: bigint;
  start: number;
  end: number;
  challengerFunds: bigint;
  requesterFunds: bigint;
}

const Appeal: React.FC<AppealProps> = ({
  pohId,
  requestIndex,
  challengeIndex,
  disputeId,
  requester,
  challenger,
  start,
  end,
  challengerFunds,
  requesterFunds,
}) => {
  const [fundAppeal] = usePoHWrite("fundAppeal");

  // const [requesterInput, setRequesterInput] = useState(0);
  // const [challengerInput, setChallengerInput] = useState(0);

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
              <Identicon diameter={32} address={requester} />
              <div className="flex flex-col">
                <span className="text-sm">{requester}</span>
                <span className="text-xs">Claimer</span>
              </div>
            </div>
            <div className="flex gap-1">
              {/* <Field
                type="number"
                onChange={(v) => setRequesterInput(+v.target.value)}
              /> */}
              <button
                className="px-4 gradient rounded text-white"
                onClick={async () => {
                  fundAppeal({
                    args: [
                      pohId,
                      requestIndex,
                      challengeIndex,
                      1, // requester
                    ],
                    // value: requesterInput,
                  });
                }}
              >
                Fund
              </button>
            </div>
            <Progress
              value={33}
              label={`${formatEth(requesterFunds)} ETH of ${formatEth(
                appealCost
              )} ETH`}
            />
          </div>

          <div className="w-full p-4 border">
            <div className="mb-2 flex gap-2">
              <Identicon diameter={32} address={challenger} />
              <div className="flex flex-col">
                <span className="text-sm">{challenger}</span>
                <span className="text-xs">Challenger</span>
              </div>
            </div>
            <div className="flex gap-1">
              {/* <Field
                type="number"
                onChange={(v) => setChallengerInput(+v.target.value)}
              /> */}
              <button
                className="px-4 gradient rounded text-white"
                onClick={async () => {
                  fundAppeal({
                    args: [
                      pohId,
                      requestIndex,
                      challengeIndex,
                      2, // challenger
                    ],
                    // value: challengerInput,
                  });
                }}
              >
                Fund
              </button>
            </div>
            <Progress
              value={33}
              label={`${challengerFunds} ETH of ${formatEth(appealCost)} ETH`}
            />
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default Appeal;
