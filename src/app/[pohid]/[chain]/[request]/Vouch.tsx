import { useMemo } from "react";
import Modal from "components/Modal";
import usePoHWrite from "contracts/hooks/usePoHWrite";
import { Address, Hash } from "viem";
import useChainParam from "hooks/useChainParam";
import { useAccount, useSignTypedData } from "wagmi";
import { useEffectOnce } from "@legendapp/state/react";
import axios from "axios";
import { Contract } from "contracts";
import cn from "classnames";

interface VouchButtonProps {
  pohId: Hash;
  claimer: Address;
}

export default function Vouch({ pohId, claimer }: VouchButtonProps) {
  const [prepare, addVouch] = usePoHWrite("addVouch");
  const { address } = useAccount();

  useEffectOnce(() => {
    prepare({ args: [claimer, pohId] });
  });

  const chain = useChainParam()!;
  const expiration = useMemo(
    () => Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 * 6,
    []
  );

  const { signTypedData } = useSignTypedData({
    onSuccess: async (signature) =>
      await axios.post(`/api/vouch/${chain.name}/add`, {
        claimer,
        pohId,
        voucher: address!,
        expiration,
        signature,
      }),
  });

  const gaslessVouch = () => {
    signTypedData({
      domain: {
        name: "Proof of Humanity",
        chainId: chain.id,
        verifyingContract: Contract.ProofOfHumanity[chain.id],
      },
      types: {
        IsHumanVoucher: [
          { name: "vouched", type: "address" },
          { name: "humanityId", type: "bytes20" },
          { name: "expirationTimestamp", type: "uint256" },
        ],
      },
      primaryType: "IsHumanVoucher",
      message: {
        vouched: claimer,
        humanityId: pohId,
        expirationTimestamp: BigInt(expiration),
      },
    });
  };

  return (
    <Modal
      formal
      header="Vouch"
      trigger={<button className="btn-main mb-2">Vouch</button>}
    >
      <div className="p-4 flex flex-col items-center">
        <span className="txt m-2">
          Make sure the person exists and only vouch for people you have
          physically encountered. Note that in case a profile is removed for
          (Duplicate) or (Does not exist), all people who had vouched for it get
          removed as well. Profiles that do not follow the Policy risk being
          challenged and removed. Make sure you read and understand the Policy
          before proceeding.
        </span>
        <button
          className={cn(
            "p-2 outline -outline-offset-4 outline-theme mt-4 text-theme text-xl font-medium rounded hover:btn-main hover:outline-0"
          )}
          onClick={gaslessVouch}
        >
          VOUCH
        </button>
        <span
          className="mt-4 text-theme text-sm cursor-pointer underline underline-offset-2"
          onClick={addVouch}
        >
          or vouch on chain
        </span>
      </div>
    </Modal>
  );
}
