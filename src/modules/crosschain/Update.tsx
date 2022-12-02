import React from "react";
import { useParams } from "react-router-dom";
import useContractData from "api/useContractData";
import Modal from "components/Modal";
import { CHAIN, ChainId, SUPPORTED_CHAIN_IDS } from "constants/chains";
import { CONTRACT, Contracts } from "constants/contracts";
import { HumanityQuery } from "generated/graphql";
import { useUpdateHumanity } from "hooks/useCrossChainPoH";
import { machinifyId } from "utils/identifier";
import { timeAgo } from "utils/time";

interface UpdateInterface {
  homeChain: ChainId;
  humanityAllChains: Record<number, HumanityQuery>;
}

const Update: React.FC<UpdateInterface> = ({
  humanityAllChains,
  homeChain,
}) => {
  const { humanity: humanityId } = useParams();
  const updateHumanity = useUpdateHumanity();
  const contractData = useContractData();

  if (!humanityAllChains || !contractData) return null;

  return (
    <Modal
      formal
      header="Update"
      trigger={<button className="btn-main mb-2 w-48 my-4">Update</button>}
    >
      <div className="p-4">
        <span className="txt m-2">
          Update humanity state on another chain. If you use wallet contract
          make sure it has same address on both chains.
        </span>

        <div>
          {SUPPORTED_CHAIN_IDS.map((chainId) => {
            const ChainLogo = CHAIN[chainId].Logo;
            return (
              <div
                key={chainId}
                className="m-2 p-2 flex items-center justify-between border"
              >
                <div className="flex items-center">
                  <ChainLogo className="mr-2" width={16} />{" "}
                  {CHAIN[chainId].NAME}{" "}
                  {chainId === homeChain ||
                  humanityAllChains[chainId].crossChainHumanity?.claimed
                    ? "✔"
                    : "❌"}
                </div>

                {chainId === homeChain ? (
                  <div>Home chain</div>
                ) : (
                  <>
                    {humanityAllChains[chainId].crossChainHumanity?.claimed && (
                      <div>
                        Expiration time:{" "}
                        {timeAgo(
                          humanityAllChains[chainId].crossChainHumanity
                            ?.expirationTime * 1000
                        )}
                      </div>
                    )}
                    <button
                      className="underline underline-offset-2 text-blue-500"
                      onClick={async () => {
                        const gatewayForChain = contractData[
                          homeChain
                        ].crossChainGateways.find(
                          (gateway) =>
                            gateway.foreignProxy ===
                            CONTRACT[Contracts.CROSS_CHAIN_POH][
                              chainId
                            ].toLowerCase()
                        );

                        console.log({ chainId, gatewayForChain });

                        if (!gatewayForChain) return;

                        await updateHumanity(
                          gatewayForChain.id,
                          machinifyId(humanityId!),
                          {},
                          { chain: homeChain }
                        );
                      }}
                    >
                      Relay State Update
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default Update;
