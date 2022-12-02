import React from "react";
import { RequestQueryItem } from "api/types";
import useVouchDB from "api/useVouchDB";
import Modal from "components/Modal";
import { ChainId } from "constants/chains";
import { CONTRACT, Contracts } from "constants/contracts";
import { useAddVouch } from "hooks/useProofOfHumanity";
import useWeb3 from "hooks/useWeb3";

interface VouchButtonProps {
  request: RequestQueryItem;
}

const VouchButton: React.FC<VouchButtonProps> = ({ request }) => {
  const addVouch = useAddVouch();
  const { provider, account } = useWeb3();

  const { pushVouch } = useVouchDB();

  const gaslessVouch = async () => {
    if (!provider || !account) return;

    const expiration = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 * 6;

    const signature = await provider.getSigner()._signTypedData(
      {
        name: "Proof of Humanity",
        chainId: ChainId.GOERLI,
        verifyingContract:
          CONTRACT[Contracts.PROOF_OF_HUMANITY][ChainId.GOERLI],
      },
      {
        IsHumanVoucher: [
          { name: "vouchedHuman", type: "address" },
          { name: "humanityId", type: "bytes20" },
          { name: "voucherExpirationTimestamp", type: "uint256" },
        ],
      },
      {
        vouchedHuman: request.requester,
        humanityId: request.humanity.id,
        voucherExpirationTimestamp: expiration,
      }
    );

    await pushVouch({
      claimer: request.requester,
      humanity: request.humanity.id,
      voucher: account,
      signature,
      expiration,
    });
  };

  return (
    <>
      <Modal
        formal
        header="Vouch"
        trigger={<button className="btn-main mb-2">Vouch</button>}
      >
        <div className="p-4">
          <span className="txt m-2">
            Make sure the person exists and that you have physically encountered
            them. Note that in the case of a dispute, if a submission is
            rejected for reason “Duplicate” or “Does not exist”, everyone who
            had vouched for it will get removed from the registry. Note that
            your vouch will only be counted when and as long as you are
            registered, and another submission is not using your vouch.
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

      <Modal
        formal
        header="Gasless Vouch"
        trigger={<button className="btn-main mb-2">Gasless Vouch</button>}
      >
        <div className="p-4">
          <span className="txt m-2">
            Make sure the person exists and that you have physically encountered
            them. Note that in the case of a dispute, if a submission is
            rejected for reason “Duplicate” or “Does not exist”, everyone who
            had vouched for it will get removed from the registry. Note that
            your vouch will only be counted when and as long as you are
            registered, and another submission is not using your vouch.
          </span>
          <button className="btn-main mt-4" onClick={gaslessVouch}>
            Gasless Vouch
          </button>
        </div>
      </Modal>
    </>
  );
};

export default VouchButton;
