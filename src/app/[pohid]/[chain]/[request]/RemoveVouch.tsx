import usePoHWrite from "contracts/hooks/usePoHWrite";
import { Address, Hash } from "viem";
import { useMemo } from "react";
import { useLoading } from "hooks/useLoading";
import { enableReactUse } from "@legendapp/state/config/enableReactUse";
import { toast } from "react-toastify";
import { useEffectOnce } from "@legendapp/state/react";
import axios from "axios";
import useChainParam from "hooks/useChainParam";

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

  const [prepareRemoveVouch, remove_onchain_vouch] = usePoHWrite(
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

  /* const remove_offchain_vouch = async () => {
    try {
      await axios.delete(`/api/vouch/${chain.name}/remove`, {
        requester,
        pohId,
        voucher: address!,
        expiration,
        signature,
      });
      toast.success("Vouched successfully");
    } catch (err) {
      console.error(err);
      toast.error("Some error occurred");
    }
  }; */
  
  const removeVouch = () => {
    if (isOnchain)
      remove_onchain_vouch()
    else
      remove_onchain_vouch() //remove_offchain_vouch()
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
