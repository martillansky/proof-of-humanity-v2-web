import { ChainId } from "enums/ChainId";
import React, { useEffect } from "react";
import useContractData from "api/useContractData";
import Modal from "components/Modal";
import { useProofOfHumanity } from "hooks/useContract";
import { useTransferHumanity } from "hooks/useCrossChainPoH";
import useWeb3 from "hooks/useWeb3";

const Transfer: React.FC<{ homeChain: ChainId }> = ({ homeChain }) => {
  const transferHumanity = useTransferHumanity();
  const poh = useProofOfHumanity();
  const { chainId } = useWeb3();
  const contractData = useContractData(chainId as ChainId);

  useEffect(() => {
    if (!poh) return;
    (async () => {
      console.log(
        await poh.getHumanityInfo("0x753ffedae973f26f7bc4a2ceb21dfe4b06a7b672")
      );
    })();
  }, [poh]);

  return (
    <Modal
      formal
      header="Transfer"
      trigger={<button className="text-sky-500">Transfer</button>}
    >
      <div className="p-4">
        <span className="txt m-2">
          Transfer your humanity to another chain. If you use wallet contract
          make sure it has same address on both chains.
        </span>
        <button
          className="btn-main mt-4"
          onClick={async () => {
            console.log({ chainId, contractData });

            if (!contractData) return;
            console.log("|||", contractData.crossChainGateways[0].id);

            await transferHumanity(
              contractData.crossChainGateways[0].id,
              {},
              { chain: homeChain }
            );
          }}
        >
          Transfer
        </button>
      </div>
    </Modal>
  );
};

export default Transfer;
