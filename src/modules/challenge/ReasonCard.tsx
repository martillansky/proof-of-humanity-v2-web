import cn from "classnames";
import DoesNotExistImage from "assets/images/does-not-exist.png";
import DuplicateImage from "assets/images/duplicate.png";
import IncorrectSubmissionImage from "assets/images/incorrect-submission.png";
import DeceasedImage from "assets/images/deceased.png";
import { Reason } from "constants/enum";

const reasonToImage = {
  [Reason.DoesNotExist]: DoesNotExistImage,
  [Reason.Duplicate]: DuplicateImage,
  [Reason.IncorrectSubmission]: IncorrectSubmissionImage,
  [Reason.Deceased]: DeceasedImage,
};

interface ReasonCardInterface {
  text: string;
  reason: Reason;
  currentReason: Reason | null;
  setReason: React.Dispatch<React.SetStateAction<Reason | null>>;
}

const ReasonCard: React.FC<ReasonCardInterface> = ({
  text,
  reason,
  currentReason,
  setReason,
}) => (
  <div
    className={cn(
      "bg-slate-200 p-0.5 rounded-sm cursor-pointer uppercase text-black text-lg",
      reason === currentReason ? "gradient font-bold" : "grayscale"
    )}
    onClick={() => setReason(reason)}
  >
    <div className="flex flex-col h-full p-4 bg-white rounded-sm text-center">
      <img src={reasonToImage[reason]} />
      {text}
    </div>
  </div>
);

export default ReasonCard;
