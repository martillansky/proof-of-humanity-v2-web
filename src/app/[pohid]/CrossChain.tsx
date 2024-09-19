"use client";

import { useEffect, useMemo, useState } from "react";
import Modal from "components/Modal";
import TimeAgo from "components/TimeAgo";
import withClientConnected from "components/HighOrder/withClientConnected";
import {
  SupportedChain,
  SupportedChainId,
  getChainRpc,
  getForeignChain,
  idToChain,
  supportedChains,
} from "config/chains";
import { Contract, CreationBlockNumber } from "contracts";
import useCCPoHWrite from "contracts/hooks/useCCPoHWrite";
import { HumanityQuery } from "generated/graphql";
import { timeAgo } from "utils/time";
import { Address, Hash, createPublicClient, http } from "viem";
import { mainnet, sepolia, useAccount, useChainId } from "wagmi";
import ChainLogo from "components/ChainLogo";
import { useLoading } from "hooks/useLoading";
import useWeb3Loaded from "hooks/useWeb3Loaded";
import { ContractData } from "data/contract";
import useRelayWrite from "contracts/hooks/useRelayWrite";
import gnosisAmbHelper from "contracts/abis/gnosis-amb-helper";
import crossChainProofOfHumanity from "contracts/abis/cross-chain-proof-of-humanity";
import { gnosisChiado } from "viem/chains";
import { toast } from "react-toastify";

interface CrossChainProps extends JSX.IntrinsicAttributes {
  contractData: Record<SupportedChainId, ContractData>;
  humanity: Record<SupportedChainId, HumanityQuery>;
  claimer: Address;
  homeChain: SupportedChain;
  pohId: Hash;
  lastTransfer: HumanityQuery["outTransfer"];
  lastTransferChain?: SupportedChain;
  winningStatus?: string;
}

export default withClientConnected<CrossChainProps>(function CrossChain({
  pohId,
  contractData,
  humanity,
  claimer,
  homeChain,
  lastTransfer,
  lastTransferChain,
  winningStatus
}) {

  const { address } = useAccount();
  const loading = useLoading();
  const web3Loaded = useWeb3Loaded();
  const chainId = useChainId() as SupportedChainId;

  const [prepareTransfer, doTransfer] = useCCPoHWrite(
    "transferHumanity",
    useMemo(
      () => ({
        onLoading() {
          loading.start();
        },
        onReady(fire) {
          fire();
        },
      }),
      [loading]
    )
  );

  const [prepareUpdate] = useCCPoHWrite(
    "updateHumanity",
    useMemo(
      () => ({
        onLoading() {
          loading.start();
        },
        onReady(fire) {
          fire();
        },
      }),
      [loading]
    )
  );

  const [prepareRelayWrite] = useRelayWrite(
    "executeSignatures",
    useMemo(
      () => ({
        onLoading() {
          loading.start();
        },
        onReady(fire) {
          fire();
        },
      }),
      [loading]
    )
  );

  type RelayUpdateParams = {
    sideChainId: 100|10200, 
    publicClientSide: any, 
    encodedData: `0x${string}`
  };

  const [pendingRelayUpdate, setPendingRelayUpdate] = useState({} as RelayUpdateParams);

  const publicClient = lastTransferChain && createPublicClient({
    chain: supportedChains[lastTransferChain.id],
    transport: http(getChainRpc(lastTransferChain.id)),
  });

  const pendingRelayUpdateEthereum = async () => {
    if (web3Loaded && 
      //(chainId === mainnet.id || chainId === sepolia.id) &&
      (winningStatus !== "transferring" && winningStatus !== "transferred")
    ) {
      const sideChain = idToChain(getForeignChain(chainId));
      const sideChainId = sideChain!.id as 100|10200;
      const publicClientSide = createPublicClient({
        chain: supportedChains[sideChainId],
        transport: http(getChainRpc(sideChainId)),
      });
      const address = Contract.CrossChainProofOfHumanity[sideChainId] as Address;
      const allTxs = await publicClientSide.getContractEvents({
        address: address,
        abi: crossChainProofOfHumanity,
        eventName: 'UpdateInitiated',
        fromBlock: CreationBlockNumber.CrossChainProofOfHumanity[sideChainId] as bigint,
        strict: true,
        args: {humanityId: pohId},
      });
      
      if (allTxs.length == 0) return ;

      const txHash = allTxs && allTxs[0].transactionHash;
      
      const tx = await publicClientSide.getTransactionReceipt({hash: txHash});
      const messageId = tx.logs.at(0)?.topics.at(1);

      // Looking for the received update with same messageId, if there is no such tx, then it is pending

      const publicClientEthereum = createPublicClient({
        chain: supportedChains[chainId],
        transport: http(getChainRpc(chainId)),
      });
      const addressEthereum = Contract.CrossChainProofOfHumanity[chainId] as Address;
      const allTxsEthereum = await publicClientEthereum.getContractEvents({
        address: addressEthereum,
        abi: crossChainProofOfHumanity,
        eventName: 'UpdateReceived',
        fromBlock: CreationBlockNumber.CrossChainProofOfHumanity[chainId] as bigint,
        strict: true,
        args: {humanityId: pohId},
      });
      
      var messageIdEthereum;
      if (allTxsEthereum.length > 0) {
        const txHashEthereum = allTxsEthereum[0].transactionHash;
        
        const txEthereum = await publicClientEthereum.getTransactionReceipt({hash: txHashEthereum});
        messageIdEthereum = txEthereum.logs.at(1)?.topics.at(3);
      }

      if (allTxsEthereum.length == 0 || messageId !== messageIdEthereum) {
        const data = (tx.logs.at(0)?.data);
      
        // Encoded data has a different length in Gnosis compared to Chiado
        const subEnd = sideChainId === gnosisChiado.id? 754 : 748;
        const encodedData = `0x${data?.substring(130, subEnd)}` as `0x${string}`;
        
        setPendingRelayUpdate({sideChainId: sideChainId, publicClientSide: publicClientSide, encodedData: encodedData});
        return ;
      }
      return ;
    }
    return ;
  }

  const showPendingUpdate = () => {
    return (
      <Modal
        trigger={
          <button className="m-4 p-2 border-2 border-blue-500 text-blue-500 font-bold">
            ⏳ Pending relay
          </button>
        }
        header="Last update"
      >
      <div className="paper p-4 flex flex-col">
        <span className="txt m-2">
          There is a pending state update that needs to be relayed on this chain. 
        </span>
        {(pendingRelayUpdate.sideChainId === 100 || pendingRelayUpdate.sideChainId === 10200)? (
          <button
              className="underline underline-offset-2 text-blue-500"
              onClick={async () => {
                await pendingRelayUpdate.publicClientSide.readContract({
                  address: Contract.GnosisAMBHelper[pendingRelayUpdate.sideChainId],
                  abi: gnosisAmbHelper,
                  functionName: 'getSignatures',
                  args: [pendingRelayUpdate.encodedData]
                })
                .then((signatures: `0x${string}`)=> {
                  prepareRelayWrite({
                    args: [pendingRelayUpdate.encodedData, signatures],
                  });
                })
                .catch((e: any) => {
                  toast.info("Confirmation takes around 10 minutes. Come back later");
                });     
              }}
          >
            Execute relay state update
          </button>
        ) : (
          <div className="p-4">
            <span className="txt m-2">
              Relaying a state update in this chain can take around 30 minutes
            </span>
          </div>
        )}
      </div>
      </Modal>
    )
  }
  
  useEffect(()=>{
    if (web3Loaded && 
      //(chainId === mainnet.id || chainId === sepolia.id) &&
      (winningStatus !== "transferring" && winningStatus !== "transferred")
    )
      pendingRelayUpdateEthereum()
  }, [web3Loaded, chainId]);

  return (
    <div className="w-full p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border-t">
      <div className="flex flex-col">
        <span className="text-slate-500">Home chain</span>
        <span className="flex items-center font-semibold">
          <ChainLogo chainId={homeChain.id} className="w-4 h-4 ml-1" />
          {homeChain.name}
        </span>
      </div>

      {web3Loaded &&
        address?.toLowerCase() === claimer &&
        homeChain.id === chainId && (winningStatus !== "transferring" && winningStatus !== "transferred") && (
          <Modal
            formal
            header="Transfer"
            trigger={<button className="text-sky-500" onClick={doTransfer}>Transfer</button>}
          >
            <div className="p-4">
              <span className="txt m-2">
                Transfer your humanity to another chain. If you use a contract
                wallet make sure it has the same address on both chains.
              </span>
              <button
                className="btn-main mt-4"
                onClick={() =>
                  prepareTransfer({
                    args: [contractData[homeChain.id].gateways[0].id],
                  })
                }
              >
                Transfer
              </button>
            </div>
          </Modal>
        )}

      {web3Loaded &&
        homeChain.id === chainId && 
        (winningStatus !== "transferring" && winningStatus !== "transferred") && 
        (!pendingRelayUpdate || !pendingRelayUpdate.encodedData) && (
      <Modal
        formal
        header="Update"
        trigger={<button className="text-sky-500">Update state</button>}
      >
        <div className="p-4">
          <span className="txt m-2">
            Update humanity state on another chain. If you use wallet contract
            make sure it has same address on both chains.
          </span>

          <div>
            {supportedChains.map((chain) => (
              <div
                key={chain.id}
                className="m-2 p-2 flex items-center justify-between border"
              >
                <div className="flex items-center">
                  <ChainLogo chainId={chain.id} className="w-4 h-4 mr-1" />
                  {chain.name}{" "}
                  {chain === homeChain ||
                  humanity[chain.id].crossChainRegistration ||
                  chain.id === homeChain.id
                    ? "✔"
                    : "❌"}
                </div>

                {chain.id === homeChain.id ? (
                  <div>Home chain</div>
                ) : (
                  <>
                    {humanity[chain.id].crossChainRegistration && (
                      <div>
                        Expiration time:{" "}
                        {timeAgo(
                          humanity[chain.id].crossChainRegistration
                            ?.expirationTime
                        )}
                      </div>
                    )}
                    <button
                      className="underline underline-offset-2 text-blue-500"
                      onClick={async () => {
                        const gatewayForChain = contractData[
                          homeChain.id
                        ].gateways.find(
                          (gateway) =>
                            gateway.foreignProxy ===
                            Contract.CrossChainProofOfHumanity[
                              chain.id
                            ]?.toLowerCase()
                        );

                        if (!gatewayForChain) return;

                        prepareUpdate({ args: [gatewayForChain.id, pohId] });
                      }}
                    >
                      Relay State Update
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </Modal>
      )}
      {web3Loaded &&
        //address?.toLowerCase() === claimer &&
        //homeChain?.id === chainId &&
        homeChain &&
        winningStatus === 'transferred' && publicClient && (
        <Modal
          trigger={
            <button className="m-4 p-2 border-2 border-blue-500 text-blue-500 font-bold">
              ⏳ Pending relay
            </button>
          }
          header="Last transfer"
        >
          <div className="paper p-4 flex flex-col">
            <span>
              {lastTransferChain?.name} ▶{" "}
              {homeChain?.name}
            </span>
            <TimeAgo time={parseInt(lastTransfer?.transferTimestamp)} />
            {homeChain?.id === chainId && 
              (chainId === mainnet.id || chainId === sepolia.id) ? (
            <button
              className="underline underline-offset-2 text-blue-500"
              onClick={async () => {
                const address = Contract.CrossChainProofOfHumanity[lastTransferChain.id] as Address;
                const allTxs = await publicClient.getContractEvents({
                  address: address,
                  abi: crossChainProofOfHumanity,
                  eventName: 'TransferInitiated',
                  fromBlock: CreationBlockNumber.CrossChainProofOfHumanity[lastTransferChain.id] as bigint,
                  strict: true,
                  args: {humanityId: pohId},
                });
                const txHash = allTxs.find(tx => tx.args.transferHash === lastTransfer?.transferHash)?.transactionHash;
                
                const tx = await publicClient.getTransactionReceipt({hash: txHash!});
                const data = (tx.logs.at(1)?.data);
                
                // Encoded data has a different length in Gnosis compared to Chiado
                const subEnd = lastTransferChain.id === gnosisChiado.id? 754 : 748;
                const encodedData = `0x${data?.substring(130, subEnd)}` as `0x${string}`;
                
                await publicClient.readContract({
                  address: Contract.GnosisAMBHelper[lastTransferChain.id],
                  abi: gnosisAmbHelper,
                  functionName: 'getSignatures',
                  args: [encodedData]
                })
                .then((signatures)=> {
                  prepareRelayWrite({
                    args: [encodedData, signatures],
                  });
                })
                .catch(e => {
                  toast.info("Confirmation takes around 10 minutes. Come back later");
                });
              }}
            >
              Relay Transferring Profile
            </button>
            ) : (homeChain.id === mainnet.id || homeChain.id === sepolia.id)? (
              <div className="p-4">
                <span className="txt m-2">
                  Connect to home chain for relaying the transferring profile
                </span>
              </div>
            ) : (
              <div className="p-4">
                <span className="txt m-2">
                  Relaying the transferring profile in this chain can take around 30 minutes
                </span>
              </div>
            )
            }
          </div>
        </Modal>
      )}
      {!!pendingRelayUpdate && pendingRelayUpdate.encodedData? 
        showPendingUpdate()
      : null
      }
    </div>
  );
});
