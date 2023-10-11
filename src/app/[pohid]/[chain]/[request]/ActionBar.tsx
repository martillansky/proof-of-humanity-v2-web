"use client";

import ExternalLink from "components/ExternalLink";
import { colorForStatus } from "config/misc";
import usePoHWrite from "contracts/hooks/usePoHWrite";
import { Address, Hash, encodeFunctionData, formatEther } from "viem";
import Vouch from "./Vouch";
import TimeAgo from "components/TimeAgo";
import { useAccount } from "wagmi";
import FundButton from "./Funding";
import { Action } from "./page";
import Challenge from "./Challenge";
import { ContractQuery, RequestQuery } from "generated/graphql";
import { useEffectOnce } from "@legendapp/state/react";
import { useEffect, useMemo } from "react";
import withClientConnected from "components/high-order/withClientConnected";
import { camelToTitle } from "utils/case";
import abis from "contracts/abis";
import useChainParam from "hooks/useChainParam";
import { Contract } from "contracts";
import useWagmiWrite from "contracts/hooks/useWagmiWrite";
import { useLoading } from "hooks/useLoading";

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
  action: Action;
  funded: bigint;
  index: number;
  lastStatusChange: number;
  contractData: NonNullable<ContractQuery["contract"]>;
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
    if (action === Action.ADVANCE && !revocation)
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

    if (action === Action.EXECUTE)
      prepareExecute({ args: [requester, BigInt(index)] });
  });

  useEffect(() => {
    if (
      !revocation &&
      requester === address &&
      (action === Action.VOUCH ||
        action === Action.FUND ||
        action === Action.ADVANCE)
    )
      prepareWithdrawRequest();
  }, [address, prepareWithdrawRequest, action, requester, revocation]);

  const statusColor = colorForStatus(status, revocation);

  return (
    <div className="paper p-6 flex justify-between items-center border-b">
      <div className="flex items-center">
        <span className="mr-4">Status</span>
        <span
          className={`px-3 py-1 rounded-full text-white bg-status-${statusColor}`}
        >
          {camelToTitle(status)}
        </span>
      </div>
      <div className="w-full ml-8 flex items-center justify-between font-normal">
        {(action === Action.VOUCH ||
          action === Action.FUND ||
          action === Action.ADVANCE) && (
          <>
            <span className="text-slate-400">
              Vouches:{" "}
              <strong>
                {advanceRequestsOnChainVouches!.length} /{" "}
                {contractData.requiredNumberOfVouches}
              </strong>
            </span>

            {requester === address ? (
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

            {action === Action.FUND && (
              <>
                <span className="text-slate-400">
                  Funded: {formatEther(funded)} /{" "}
                  {formatEther(
                    BigInt(contractData.baseDeposit) + arbitrationCost
                  )}{" "}
                  ETH
                </span>

                <FundButton
                  pohId={pohId}
                  totalCost={BigInt(contractData.baseDeposit) + arbitrationCost}
                  index={index}
                  funded={funded}
                />
              </>
            )}

            {action === Action.ADVANCE && (
              <>
                <span className="text-slate-400">Ready to advance</span>

                <button
                  disabled={pending}
                  className="btn-main mb-2"
                  onClick={advanceState}
                >
                  Advance
                </button>
              </>
            )}
          </>
        )}

        {action === Action.EXECUTE && (
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

        {action === Action.CHALLENGE && (
          <>
            <span className="text-slate-400">
              Challenge period end:{" "}
              <TimeAgo
                time={lastStatusChange + +contractData.challengePeriodDuration}
              />
            </span>

            <Challenge
              pohId={pohId}
              requestIndex={index}
              revocation={revocation}
              arbitrationCost={arbitrationCost}
              arbitrationInfo={contractData.latestArbitratorHistory!}
            />
          </>
        )}

        {action === Action.DISPUTED && currentChallenge && (
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
          <ExternalLink
            href={`https://app.proofofhumanity.id/profile/${pohId}`}
          >
            Check submission on old interface
          </ExternalLink>
        )}
      </div>
    </div>
  );
});
