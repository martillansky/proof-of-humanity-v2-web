import Image from "components/Image";
import {
  useArbitratorData,
  useSubmissionBaseDeposit,
  useTotalSubmissionCost,
} from "hooks/useProofOfHumanity";
import Challenge from "modules/Challenge";
import Evidence from "modules/Evidence";
import { format as formatTime } from "timeago.js";

interface RequestsProps {}

const Requests: React.FC<RequestsProps> = () => {
  const submissionCost = useTotalSubmissionCost();
  const [baseDeposit] = useSubmissionBaseDeposit();
  const [arbData] = useArbitratorData();

  return (
    <div className="p-8 flex flex-col justify-center">
      <div className="p-4 border flex justify-between rounded shadow">
        <span>Request</span>
        <div className="flex items-center">
          <span className="text-green-400">Pending Claim</span>
          <span className="m-1 h-2 w-2 bg-green-400 rounded-full" />
        </div>
      </div>

      <div className="my-6 border flex rounded shadow">
        <div className="p-4 h-full flex flex-col bg-amber-100 items-center">
          <Image
            uri="https://imgs.search.brave.com/K7iqM-nbN2xnwpE5ETDEExzwL3VvFp6OAoEzSwuO6EU/rs:fit:960:720:1/g:ce/aHR0cHM6Ly9zLnlp/bWcuY29tL255L2Fw/aS9yZXMvMS4yLzQw/SDRHeDRRSk16Qlp6/bDdqN0c5WFEtLS9Z/WEJ3YVdROWFHbG5h/R3hoYm1SbGNqdDNQ/VGsyTUR0b1BUY3lN/QS0tL2h0dHBzOi8v/cy55aW1nLmNvbS91/dS9hcGkvcmVzLzEu/Mi9wM05QSjFCdVdy/OHRQRTJXUzNSdWx3/LS1-/Qi9hRDAzTmpnN2R6/MHhNREkwTzJGd2NH/bGtQWGwwWVdOb2VX/OXUvaHR0cHM6Ly9t/ZWRpYS56ZW5mcy5j/b20vZW4vdGhlX2lu/ZGVwZW5kZW50XzYz/NS8yMmE4YTg1Y2Iy/MDk5MGI2MDNjY2U4/YTJjMjg5NGE3Ng"
            rounded
            previewed
          />
          <span className="font-bold">Alice</span>
          <span>Challenge deadline</span>
          <span>{formatTime(1658000000000)}</span>

          <Challenge />
        </div>
        <div className="flex flex-col">
          <span>Alice Smith</span>
          <span>{baseDeposit && baseDeposit.toString()}</span>
          <span>{arbData && arbData.toString()}</span>
          <span>{submissionCost && submissionCost.toString()}</span>
        </div>
      </div>

      <Evidence />
    </div>
  );
};

export default Requests;
