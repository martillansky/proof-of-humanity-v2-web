import { useEffect } from "react";
import Modal from "components/Modal";
import TimeAgo from "components/TimeAgo";
import withClientConnected from "components/high-order/withClientConnected";
import {
  SupportedChain,
  SupportedChainId,
  chainLogo,
  supportedChains,
} from "config/chains";
import { Contract } from "contracts";
import useCCPoHWrite from "contracts/hooks/useCCPoHWrite";
import { ContractQuery, HumanityQuery } from "generated/graphql";
import Image from "next/image";
import { timeAgo } from "utils/time";
import { Address, Hash, zeroAddress } from "viem";
import { useAccount } from "wagmi";
import { useObservable } from "@legendapp/state/react";

interface CrossChainProps extends JSX.IntrinsicAttributes {
  contractData: Record<SupportedChainId, ContractQuery>;
  humanity: Record<SupportedChainId, HumanityQuery>;
  claimer: Address;
  homeChain: SupportedChain;
  pohId: Hash;
  lastTransfer: HumanityQuery["outTransfer"] & { chain: SupportedChain };
}

export default withClientConnected<CrossChainProps>(function CrossChain({
  pohId,
  contractData,
  humanity,
  claimer,
  homeChain,
  lastTransfer,
}) {
  const { address } = useAccount();

  const [transferHumanity] = useCCPoHWrite(
    "transferHumanity",
    ({ args }) => args[0] !== zeroAddress && claimer === address
  );
  const [updateHumanity] = useCCPoHWrite(
    "updateHumanity",
    ({ args }) => args[0] !== zeroAddress
  );

  const transfer$ = useObservable({
    transferHash: lastTransfer.transferHash,
    foreignProxy: lastTransfer.foreignProxy,
    transferTimestamp: lastTransfer.transferTimestamp,
    senderChain: lastTransfer.chain,
    receivingChain: supportedChains.find(
      (chain) =>
        Contract.CrossChainProofOfHumanity[chain.id].toLowerCase() ===
        lastTransfer.foreignProxy
    )!,
    received: !!supportedChains.find(
      (c) =>
        Contract.CrossChainProofOfHumanity[c.id] === lastTransfer.foreignProxy
    ),
  });
  const transferState = transfer$.use();

  useEffect(() => {
    if (updateHumanity.fire) updateHumanity.fire();
  }, [updateHumanity]);

  return (
    <div className="w-full p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border-t">
      <div className="flex">
        <span className="text-slate-500">Home chain</span>
        <span className="flex font-semibold">
          <Image
            alt="chain"
            src={chainLogo(homeChain.id)}
            className="mx-1"
            height={16}
            width={16}
          />
          {homeChain.name}
        </span>
      </div>

      <Modal
        formal
        header="Transfer"
        trigger={<button className="text-sky-500">Transfer</button>}
      >
        <div className="p-4">
          <span className="txt m-2">
            Transfer your humanity to another chain. If you use a contract
            wallet make sure it has the same address on both chains.
          </span>
          <button className="btn-main mt-4" onClick={transferHumanity.fire}>
            Transfer
          </button>
        </div>
      </Modal>

      <Modal
        formal
        header="Update"
        trigger={<button className="text-sky-500">Update</button>}
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
                  <Image
                    alt="chain"
                    src={chainLogo(chain.id)}
                    className="mr-2"
                    width={16}
                    height={16}
                  />{" "}
                  {chain.name}{" "}
                  {chain === homeChain ||
                  humanity[chain.id].crossChainRegistration
                    ? "✔"
                    : "❌"}
                </div>

                {chain === homeChain ? (
                  <div>Home chain</div>
                ) : (
                  <>
                    {humanity[chain.id].crossChainRegistration && (
                      <div>
                        Expiration time:{" "}
                        {timeAgo(
                          humanity[chain.id].crossChainRegistration!
                            .expirationTime
                        )}
                      </div>
                    )}
                    <button
                      className="underline underline-offset-2 text-blue-500"
                      onClick={async () => {
                        const gatewayForChain = contractData[
                          homeChain.id
                        ].crossChainGateways.find(
                          (gateway) =>
                            gateway.foreignProxy ===
                            Contract.ProofOfHumanity[chain.id].toLowerCase()
                        );

                        if (!gatewayForChain) return;

                        updateHumanity.config$.args.set([
                          gatewayForChain.id,
                          pohId,
                        ]);
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

      {humanity[homeChain.id].humanity?.registration && (
        <div className="font-bold">
          <span className="mr-2 font-normal text-slate-500">Expiration:</span>
          <TimeAgo
            time={humanity[homeChain.id].humanity!.registration!.expirationTime}
          />
        </div>
      )}

      <Modal
        trigger={
          <button className="m-4 p-2 border-2 border-blue-500 text-blue-500 font-bold">
            ⏳ Pending transfer
          </button>
        }
        header="Last transfer"
      >
        <div className="paper p-4 flex flex-col">
          <span>
            {transferState.senderChain.name} ▶{" "}
            {transferState.receivingChain.name}
          </span>
          <TimeAgo time={parseInt(transferState.transferTimestamp)} />
          <span>Received: {String(transferState.received)}</span>
          <span>
            Transfer hash: {transferState.transferHash.substring(0, 12)}...
          </span>
        </div>
      </Modal>
    </div>
  );
});
