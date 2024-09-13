"use client";

import { enableReactUse } from "@legendapp/state/config/enableReactUse";
import { useEffectOnce } from "@legendapp/state/react";
import { colorForStatus } from "config/misc";
import usePoHWrite from "contracts/hooks/usePoHWrite";
import { ContractData } from "data/contract";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Address, Hash, formatEther, hexToSignature } from "viem";
import { useAccount, useChainId } from "wagmi";
import ExternalLink from "components/ExternalLink";
import withClientConnected from "components/HighOrder/withClientConnected";
import TimeAgo from "components/TimeAgo";
import { RequestQuery } from "generated/graphql";
import useChainParam from "hooks/useChainParam";
import { useLoading } from "hooks/useLoading";
import useWeb3Loaded from "hooks/useWeb3Loaded";
import { camelToTitle } from "utils/case";
import { ActionType } from "utils/enums";
import Challenge from "./Challenge";
import FundButton from "./Funding";
import RemoveVouch from "./RemoveVouch";
import Vouch from "./Vouch";


enableReactUse();

// const encodeClaimToAdvance = (claimer: Address, vouchers: Address[]) =>
//   encodeFunctionData<typeof abis.ProofOfHumanity, "advanceState">({
//     abi: abis.ProofOfHumanity,
//     functionName: "advanceState",
//     args: [claimer, vouchers, []],
//   });

interface ActionBarProps extends JSX.IntrinsicAttributes {
  pohId: Hash;
  arbitrationCost: bigint;
  requester: Address;
  revocation: boolean;
  status: string;
  funded: bigint;
  index: number;
  lastStatusChange: number;
  contractData: ContractData;
  currentChallenge?: ArrayElement<
    NonNullable<NonNullable<RequestQuery>["request"]>["challenges"]
  >;
  advanceRequestsOnChainVouches?: { claimer: Address; vouchers: Address[] }[];
  onChainVouches: Address[];
  offChainVouches: { voucher: Address; expiration: number; signature: Hash }[];
  expired: boolean;
}

export default withClientConnected<ActionBarProps>(function ActionBar({
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
  onChainVouches,
  offChainVouches,
  // advanceRequestsOnChainVouches,
  expired,
}) {
  const chain = useChainParam()!;
  const { address } = useAccount();
  const loading = useLoading();
  const [pending] = loading.use();
  const web3Loaded = useWeb3Loaded();
  const userChainId = useChainId();
  // const [prepareMulticallAdvance, multicallAdvanceFire] = useWagmiWrite(
  //   "Multicall3",
  //   "aggregate",
  //   useMemo(
  //     () => ({
  //       onLoading() {
  //         loading.start();
  //       },
  //     }),
  //     [loading]
  //   )
  // );

  const [action, setAction] = useState(ActionType.NONE);

  useEffectOnce(() => {
    const checkVouchStatus = async () => {
      if (status === "resolved" || status === "withdrawn")
        setAction(ActionType.NONE);
      else if (index < 0 && index > -100) setAction(ActionType.OLD_ACTIVE);
      else if (status === "disputed") setAction(ActionType.DISPUTED);
      else if (status === "vouching") {
        if (funded < arbitrationCost + BigInt(contractData.baseDeposit))
          setAction(ActionType.FUND);
        else if (
          onChainVouches.length + offChainVouches.length >=
          contractData.requiredNumberOfVouches
        )
          setAction(ActionType.ADVANCE);
        else if (onChainVouches.length + offChainVouches.length >= 0)
          setAction(ActionType.REMOVE_VOUCH);
        else setAction(ActionType.VOUCH);
      } else if (status == "resolving")
        setAction(
          +lastStatusChange + +contractData.challengePeriodDuration <
            Date.now() / 1000
            ? ActionType.EXECUTE
            : ActionType.CHALLENGE
        );
    };
    checkVouchStatus();
  });

  const [prepareExecute, execute] = usePoHWrite(
    "executeRequest",
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
          toast.success("Requested executed successfully");
        },
      }),
      [loading]
    )
  );
  const [prepareAdvance, advanceFire] = usePoHWrite(
    "advanceState",
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
          toast.success("Request advanced to resolving state");
        },
        onFail() {
          toast.error("No vouch is valid. Advance is not possible");
          setAction(ActionType.VOUCH);
        },
      }),
      [loading]
    )
  );
  const [prepareWithdraw, withdraw, withdrawState] = usePoHWrite(
    "withdrawRequest",
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
          toast.success("Request withdrawn successfully");
        },
      }),
      [loading]
    )
  );
  const advance = useCallback(
    () => advanceFire(),
    // || multicallAdvanceFire
    [
      advanceFire,
      //  multicallAdvanceFire
    ]
  );

  const [isVouchGranted, setIsVouchGranted] = useState({
    didIVouchFor: false,
    isVouchOnchain: false,
  });

  useEffect(() => {
    const didIVouchFor = () => {
      return (
        onChainVouches.length + offChainVouches.length >= 0 &&
        (onChainVouches.some((voucherAddress) => {
          if (voucherAddress === address?.toLocaleLowerCase()) {
            setIsVouchGranted((prevState) => ({
              ...prevState,
              isVouchOnchain: true,
            }));
            return true;
          }
          return false;
        }) ||
          offChainVouches.some(
            (voucher) => voucher.voucher === address?.toLocaleLowerCase()
          ))
      );
    };

    if (didIVouchFor())
      setIsVouchGranted((prevState) => ({ ...prevState, didIVouchFor: true }));
  }, [address, action, requester, revocation, chain, userChainId]);

  useEffect(() => {
    //useEffectOnce(() => {
    if (action === ActionType.ADVANCE && !revocation) {
      // if (advanceRequestsOnChainVouches) {
      //   prepareMulticallAdvance({
      //     args: [
      //       [
      //         {
      //           target: Contract.ProofOfHumanity[chain.id],
      //           callData: encodeClaimToAdvance(requester, []),
      //         },
      //         ...advanceRequestsOnChainVouches!
      //           .map((vouch) => ({
      //             target: Contract.ProofOfHumanity[chain.id],
      //             callData: encodeClaimToAdvance(vouch.claimer, vouch.vouchers),
      //           }))
      //           .slice(0, 1),
      //       ],
      //     ],
      //   });
      // } else {
      // }

      prepareAdvance({
        args: [
          requester,
          onChainVouches,
          offChainVouches.map((v) => {
            const sig = hexToSignature(v.signature);
            return {
              expirationTime: v.expiration,
              v: Number(sig.v),
              r: sig.r,
              s: sig.s,
            };
          }),
        ],
      });
    }

    if (action === ActionType.EXECUTE)
      prepareExecute({ args: [pohId, BigInt(index)] });
  }, [action]);

  useEffect(() => {
    if (
      !revocation &&
      chain.id === userChainId &&
      requester === address?.toLowerCase() &&
      (action === ActionType.VOUCH ||
        action === ActionType.FUND ||
        action === ActionType.ADVANCE)
    )
      prepareWithdraw();
  }, [address, prepareWithdraw, action, requester, revocation, chain, userChainId]);

  const totalCost = BigInt(contractData.baseDeposit) + arbitrationCost;
  const statusColor = colorForStatus(status, revocation, expired);

  return (
    <div className="paper py-[24px] px-[24px] flex flex-col md:flex-row justify-between items-center gap-[12px] lg:gap-[20px] border-b">
      <div className="flex items-center">
        <span className="mr-4">Status</span>
        <span
          className={`px-3 py-1 rounded-full text-white bg-status-${statusColor}`}
        >
          {camelToTitle(status, revocation, expired)}
        </span>
      </div>
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-[12px] font-normal">
        {web3Loaded &&
          (action === ActionType.REMOVE_VOUCH ||
            action === ActionType.VOUCH ||
            action === ActionType.FUND) && (
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
                    disabled={pending || withdrawState.prepare !== "success"}
                    className="btn-main mb-2"
                    onClick={withdraw}
                  >
                    Withdraw
                  </button>
                ) : !isVouchGranted.didIVouchFor ? (
                  <Vouch pohId={pohId} claimer={requester} />
                ) : isVouchGranted.isVouchOnchain ? (
                  <RemoveVouch requester={requester} pohId={pohId} />
                ) : null}
              </div>
            </>
          )}

        {web3Loaded && action === ActionType.ADVANCE && (
          <>
            <span className="text-slate-400">Ready to advance</span>

            <div className="flex gap-4">
              {requester === address?.toLowerCase() ? (
                <button
                  disabled={pending || withdrawState.prepare !== "success"}
                  className="btn-sec mb-2"
                  onClick={withdraw}
                >
                  Withdraw
                </button>
              ) : !isVouchGranted.didIVouchFor ? (
                <Vouch pohId={pohId} claimer={requester} />
              ) : isVouchGranted.isVouchOnchain ? (
                <RemoveVouch requester={requester} pohId={pohId} />
              ) : null}
              <button
                disabled={pending}
                className="btn-main mb-2"
                onClick={advance}
              >
                Advance
              </button>
            </div>
          </>
        )}
        {action === ActionType.EXECUTE && (
          <>
            <span className="text-slate-400">Ready to finalize.</span>
            <div className="flex flex-col md:flex-row md:items-center justify-between font-normal gap-4">
              <button
                disabled={pending}
                className="btn-main mb-2"
                onClick={execute}
              >
                Execute
              </button>
            </div>
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

        {action === ActionType.DISPUTED && !!currentChallenge && (
          <>
            <span className="text-slate-400">
              The request was challenged
              {!revocation && (
                <>
                  {" "}
                  for{" "}
                  <strong className="text-status-challenged">
                    {camelToTitle(
                      currentChallenge.reason.id,
                      revocation,
                      expired
                    )}
                  </strong>
                </>
              )}
              .
            </span>

            <ExternalLink
              href={`https://resolve.kleros.io/cases/${currentChallenge.disputeId}`}
              className="btn-main px-[24px]"
            >
              View case #{currentChallenge.disputeId}
            </ExternalLink>
          </>
        )}

        {status === "resolved" && (
          <>
            <span>
              Request was accepted
              <TimeAgo
                className={`ml-1 text-status-${statusColor}`}
                time={lastStatusChange}
              />
              .
            </span>
          </>
        )}

        {index < 0 && index > -100 && (
          <span>
            Check submission on
            <ExternalLink
              className={`ml-1 text-status-${statusColor} ml-2 underline underline-offset-2`}
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
