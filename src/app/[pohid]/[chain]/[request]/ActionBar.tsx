"use client";

import ExternalLink from "components/ExternalLink";
import { colorForStatus } from "config/misc";
import usePoHWrite from "contracts/hooks/usePoHWrite";
import { Address, Hash, encodeFunctionData, formatEther } from "viem";
import Vouch from "./Vouch";
import TimeAgo from "components/TimeAgo";
import { useAccount } from "wagmi";
import FundButton from "./Funding";
import Challenge from "./Challenge";
import { RequestQuery } from "generated/graphql";
import { useEffectOnce } from "@legendapp/state/react";
import { useEffect, useMemo } from "react";
import withClientConnected from "components/high-order/withClientConnected";
import { camelToTitle } from "utils/case";
import abis from "contracts/abis";
import useChainParam from "hooks/useChainParam";
import { Contract } from "contracts";
import useWagmiWrite from "contracts/hooks/useWagmiWrite";
import { useLoading } from "hooks/useLoading";
import { ActionType } from "utils/enums";
import { enableReactUse } from "@legendapp/state/config/enableReactUse";
import { ContractData } from "data/contract";
import useWeb3Loaded from "hooks/useWeb3Loaded";

enableReactUse();

const encodeClaimToAdvance = (claimer: Address, vouchers: Address[]) =>
  encodeFunctionData<typeof abis.ProofOfHumanity, "advanceState">({
    abi: abis.ProofOfHumanity,
    functionName: "advanceState",
    args: [claimer, vouchers, []],
  });

interface ActionBarProps extends JSX.IntrinsicAttributes {
  pohId: Hash;
  arbitrationCost: bigint;
  requester: Address;
  revocation: boolean;
  status: string;
  action: ActionType;
  funded: bigint;
  index: number;
  lastStatusChange: number;
  contractData: ContractData;
  currentChallenge?: ArrayElement<
    NonNullable<NonNullable<RequestQuery>["request"]>["challenges"]
  >;
  advanceRequestsOnChainVouches?: { claimer: Address; vouchers: Address[] }[];
}

export default withClientConnected<ActionBarProps>(function ActionBar({
  action,
  pohId,
  requester,
  index,
  revocation,
  status,
  funded,
  lastStatusChange,
  arbitrationCost,
  contractData,
  currentChallenge,
  advanceRequestsOnChainVouches,
}) {
  const chain = useChainParam()!;
  const { address } = useAccount();
  const loading = useLoading();
  const [pending] = loading.use();
  const web3Loaded = useWeb3Loaded();
  const [prepareAdvanceState, advanceState] = useWagmiWrite(
    "Multicall3",
    "aggregate",
    useMemo(
      () => ({
        onLoading() {
          loading.start();
        },
      }),
      [loading]
    )
  );
  const [prepareExecute, executeRequest] = usePoHWrite(
    "executeRequest",
    useMemo(
      () => ({
        onLoading() {
          loading.start();
        },
      }),
      [loading]
    )
  );
  const [prepareWithdrawRequest, withdrawRequest] = usePoHWrite(
    "withdrawRequest",
    useMemo(
      () => ({
        onLoading() {
          loading.start();
        },
      }),
      [loading]
    )
  );

  useEffectOnce(() => {
    if (action === ActionType.ADVANCE && !revocation)
      prepareAdvanceState({
        value: 0n,
        args: [
          [
            {
              target: Contract.ProofOfHumanity[chain.id],
              callData: encodeClaimToAdvance(requester, []),
            },
            ...advanceRequestsOnChainVouches!
              .map((vouch) => ({
                target: Contract.ProofOfHumanity[chain.id],
                callData: encodeClaimToAdvance(vouch.claimer, vouch.vouchers),
              }))
              .slice(0, 1),
          ],
        ],
      });

    if (action === ActionType.EXECUTE)
      prepareExecute({ args: [requester, BigInt(index)] });
  });

  useEffect(() => {
    if (
      !revocation &&
      requester === address &&
      (action === ActionType.VOUCH ||
        action === ActionType.FUND ||
        action === ActionType.ADVANCE)
    )
      prepareWithdrawRequest();
  }, [address, prepareWithdrawRequest, action, requester, revocation]);

  const totalCost = BigInt(contractData.baseDeposit) + arbitrationCost;
  const statusColor = colorForStatus(status, revocation);

  return (
    <div className="paper p-6 flex flex-col md:flex-row justify-between items-center gap-2 border-b">
      <div className="flex items-center">
        <span className="mr-4">Status</span>
        <span
          className={`px-3 py-1 rounded-full text-white bg-status-${statusColor}`}
        >
          {camelToTitle(status)}
        </span>
      </div>
      <div className="w-full ml-8 flex flex-col md:flex-row md:items-center justify-between gap-2 font-normal">
        {web3Loaded &&
          (action === ActionType.VOUCH || action === ActionType.FUND) && (
            <>
              <div className="flex gap-6">
                <span className="text-slate-400">
                  It needs{" "}
                  <strong className={`text-status-${statusColor}`}>
                    {contractData.requiredNumberOfVouches}
                  </strong>{" "}
                  {+contractData.requiredNumberOfVouches === 1
                    ? "vouch"
                    : "vouches"}{" "}
                  to proceed
                  {!!(totalCost - funded) && (
                    <>
                      {" + "}
                      <strong className={`text-status-${statusColor}`}>
                        {formatEther(totalCost - funded)}{" "}
                        {chain.nativeCurrency.symbol}
                      </strong>{" "}
                      to complete the initial deposit
                    </>
                  )}
                </span>
              </div>

              <div className="flex gap-4">
                {action === ActionType.FUND && (
                  <FundButton
                    pohId={pohId}
                    totalCost={
                      BigInt(contractData.baseDeposit) + arbitrationCost
                    }
                    index={index}
                    funded={funded}
                  />
                )}

                {requester === address?.toLowerCase() ? (
                  <button
                    disabled={pending}
                    className="btn-main mb-2"
                    onClick={withdrawRequest}
                  >
                    Withdraw
                  </button>
                ) : (
                  <Vouch pohId={pohId} claimer={requester} />
                )}
              </div>
            </>
          )}

        {web3Loaded && action === ActionType.ADVANCE && (
          <>
            <span className="text-slate-400">Ready to advance</span>

            <div className="flex gap-4">
              {requester === address?.toLowerCase() ? (
                <button
                  disabled={pending}
                  className="btn-sec mb-2"
                  onClick={withdrawRequest}
                >
                  Withdraw
                </button>
              ) : (
                <Vouch pohId={pohId} claimer={requester} />
              )}
              <button
                disabled={pending}
                className="btn-main mb-2"
                onClick={advanceState}
              >
                Advance
              </button>
            </div>
          </>
        )}

        {action === ActionType.EXECUTE && (
          <>
            <span className="text-slate-400">Ready to finalize.</span>

            <button
              disabled={pending}
              className="btn-main mb-2"
              onClick={executeRequest}
            >
              Execute
            </button>
          </>
        )}

        {action === ActionType.CHALLENGE && (
          <>
            <div className="text-slate-400">
              Challenge period end:{" "}
              <TimeAgo
                time={lastStatusChange + +contractData.challengePeriodDuration}
              />
            </div>

            <Challenge
              pohId={pohId}
              requestIndex={index}
              revocation={revocation}
              arbitrationCost={arbitrationCost}
              arbitrationInfo={contractData.arbitrationInfo!}
            />
          </>
        )}

        {action === ActionType.DISPUTED && currentChallenge && (
          <>
            <span className="text-slate-400">
              The request was challenged
              {!revocation && <> for {currentChallenge.reason}</>}.
            </span>

            <ExternalLink
              href={`https://resolve.kleros.io/cases/${currentChallenge.disputeId}`}
              className="btn-main px-4"
            >
              View case #{currentChallenge.disputeId}
            </ExternalLink>
          </>
        )}

        {index < 0 && (
          <span>
            Request was accepted
            <TimeAgo
              className={`ml-1 text-status-${statusColor}`}
              time={lastStatusChange}
            />
            . Check submission on
            <ExternalLink
              className={`ml-1 text-status-${statusColor}`}
              href={`https://app.proofofhumanity.id/profile/${pohId}`}
            >
              old interface
            </ExternalLink>
            .
          </span>
        )}
      </div>
    </div>
  );
});
