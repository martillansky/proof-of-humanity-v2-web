import React from "react";
import { RequestQueryItem } from "api/types";
import Modal from "components/Modal";
import { useAddVouch } from "hooks/useProofOfHumanity";

interface VouchButtonProps {
  request: RequestQueryItem;
}

const VouchButton: React.FC<VouchButtonProps> = ({ request }) => {
  const addVouch = useAddVouch();

  return (
    <Modal
      formal
      header="Vouch"
      trigger={<button className="btn-main mb-2">Vouch</button>}
    >
      <div className="p-4">
        <span className="txt m-2">
          Make sure the person exists and that you have physically encountered
          them. Note that in the case of a dispute, if a submission is rejected
          for reason “Duplicate” or “Does not exist”, everyone who had vouched
          for it will get removed from the registry. Note that your vouch will
          only be counted when and as long as you are registered, and another
          submission is not using your vouch.
        </span>
        <button
          className="btn-main mt-4"
          onClick={async () =>
            await addVouch(request.requester, request.humanity.id)
          }
        >
          Vouch
        </button>
      </div>
    </Modal>
  );
};

export default VouchButton;
