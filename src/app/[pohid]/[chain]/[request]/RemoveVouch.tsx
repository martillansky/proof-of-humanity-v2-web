import usePoHWrite from "contracts/hooks/usePoHWrite";
import { Address, Hash } from "viem";
import { useMemo } from "react";
import { useLoading } from "hooks/useLoading";
import { enableReactUse } from "@legendapp/state/config/enableReactUse";
import { toast } from "react-toastify";
import { useEffectOnce } from "@legendapp/state/react";
import axios from "axios";
import useChainParam from "hooks/useChainParam";
import { useAccount, useSignTypedData } from "wagmi";
import { Contract } from "contracts";

enableReactUse();

interface RemoveVouchProps {
  pohId: Hash;
  requester: Address;
  isOnchain: boolean;
}

export default function RemoveVouch({ pohId, requester, isOnchain }: RemoveVouchProps) {
  const loading = useLoading();
  const [pending] = loading.use();
  const chain = useChainParam()!;

  const [prepareRemoveVouch, removeOnchainVouch] = usePoHWrite(
    "removeVouch",
    useMemo(
      () => ({
        onError() {
          toast.error("Transaction rejected");
        },
        onLoading() {
          loading.start();
          toast.info("Transaction pending");
        },
        onSuccess() {
          toast.success("Request remove vouch successful");
        },
      }),
      [loading]
    )
  );
    
  useEffectOnce(() => {
    prepareRemoveVouch({ args: [requester, pohId] });
  });

  const { address } = useAccount();
  const voucher = address!.toLowerCase();
  const expiration = useMemo(
    () => Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 * 6,
    []
  );

  const { signTypedData } = useSignTypedData({
    onSuccess: async (signature) => {
      try {
        await axios.delete(`/api/vouch/${chain.name}/remove`, {
          data: {
            pohId: pohId,
            voucher: voucher,
            claimer: requester,
            expiration: expiration,
            signature
          }
        });
        toast.success("Vouch removed successfully");
      } catch (err) {
        console.error(err);
        toast.error("Some error occurred");
      }
    },
  });

  const removeOffchainVouch = () => {
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
        vouched: requester,
        humanityId: pohId,
        expirationTimestamp: BigInt(expiration),
      },
    });
  };
  /* const removeOffchainVouch = async () => {
    try {
      await axios.delete(`/api/vouch/${chain.name}/remove`, {
        data: {
          pohId: pohId,
          voucher: voucher
        }
      });
      toast.success("Vouch removed successfully");
    } catch (err) {
      console.error(err);
      toast.error("Some error occurred");
    }
  };
   */
  const removeVouch = () => {
    if (isOnchain)
      removeOnchainVouch()
    else
      removeOffchainVouch()
  }

  return (
    <div className="flex gap-4">
      <button
        disabled={pending}
        className="btn-main mb-2"
        onClick={removeVouch}
      >
        Remove Vouch
      </button>
    </div>
  );
};
