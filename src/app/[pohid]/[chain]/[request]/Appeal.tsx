"use client";

import Accordion from "components/Accordion";
import Identicon from "components/Identicon";
import Progress from "components/Progress";
import { eth2Wei, formatEth } from "utils/misc";
import usePoHWrite from "contracts/hooks/usePoHWrite";
import { Address } from "viem";
import { useMemo, useRef, useState } from "react";
import Field from "components/Field";
import Modal from "components/Modal";
import { SupportedChainId } from "config/chains";
import { toast } from "react-toastify";
import { useEffectOnce } from "@legendapp/state/react";
import TimeAgo from "components/TimeAgo";
import { useLoading } from "hooks/useLoading";
import { APIPoH, ArbitratorFromRequest, CurrentRoundSideFunds, StakeMultipliers } from "contracts/apis/APIPoH";
import { APIArbitrator, ArbitratorsData, DisputeStatusEnum, SideEnum } from "contracts/apis/APIArbitrator";


interface SideFundingProps {
  side: SideEnum;
  arbitrator: Address;
  disputeId: bigint;
  contributor: Address;
  requester: Address;
  requesterFunds: bigint;
  appealCost: bigint;
}

const SideFunding: React.FC<SideFundingProps> = ({
  side,
  disputeId,
  arbitrator,
  contributor,
  requester,
  requesterFunds,
  appealCost,
}) => {

  const title = side === SideEnum.claimer? 'Claimer' : 'Challenger';
  const [requesterInput, setRequesterInput] = useState(0n);
  const loading = useLoading();
  const errorRef = useRef(false);

  const value = formatEth(requesterFunds)*100/formatEth(appealCost);
  const valueProgress = value > 100? 100 : value;
  
  const [prepareFundAppeal] = usePoHWrite(
    "fundAppeal",
    useMemo(
      () => ({
        onLoading() {
          loading.start();
        },
        onReady(fire) {
          fire();
        },
        onFail() {
          !errorRef.current && toast.info("Transaction is not possible! Do you have enough funds?");
          errorRef.current = true;
        }
      }),
      [loading]
    )
  );
  
  return (
    <Accordion className="mb-4" title={title}>
      <div className="w-full p-4 border">
        <div className="mb-2 flex gap-2">
          <Identicon diameter={32} address={requester} />
          <div className="flex flex-col">
            <span className="text-sm">{requester}</span>
            <span className="text-xs">{title}</span>
          </div>
        </div>
        <div className="flex gap-1">
          <Field
            type="number"
            onChange={(v) => setRequesterInput(eth2Wei(+v.target.value))}
          />
          <button
            className={`px-4 gradient rounded text-white ${!contributor || errorRef.current? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!contributor || errorRef.current}
            onClick={async () => {
              prepareFundAppeal({
                args: [
                  arbitrator as Address,
                  BigInt(disputeId),
                  side,
                ],
                value: requesterInput,
              })
            }}
          >
            Fund
          </button>
        </div>
        <Progress
          value={valueProgress}
          label={`${formatEth(requesterFunds)} ETH of ${formatEth(appealCost)} ETH`}
        />
      </div>
    </Accordion>
  )
}

interface AppealProps {
  pohId: Address;
  requestIndex: number;
  /* arbitrator: Address;
  extraData: any, */
  contributor: Address;
  claimer: Address;
  challenger: Address;
  disputeId: bigint;
  /* challengerFunds: bigint;
  claimerFunds: bigint; */
  chainId: SupportedChainId;
}

const Appeal: React.FC<AppealProps> = ({
  pohId,
  requestIndex,
  disputeId,
  /* arbitrator,
  extraData, */
  contributor,
  chainId,
  claimer,
  challenger,
  /* claimerFunds,
  challengerFunds, */
}) => {
  const [totalClaimerCost, setTotalClaimerCost] = useState(0n);
  const [totalChallengerCost, setTotalChallengerCost] = useState(0n);
  const [formatedCurrentRuling, setFormatedCurrentRuling] = useState("");
  const defaultPeriod = [0n,0n];
  const [period, setPeriod] = useState(defaultPeriod);
  const [disputeStatus, setDisputeStatus] = useState(DisputeStatusEnum.Appealable);
  const [error, setError] = useState(false);
  const errorRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const [arbitrator, setArbitrator] = useState(null);
  const [claimerFunds, setClaimerFunds] = useState(0n);
  const [challengerFunds, setChallengerFunds] = useState(0n);
  
  useEffectOnce(() => {
    const formatCurrentRuling = (currentRuling: SideEnum) => {
      var text = "Undecided";
      switch (currentRuling) {
        case SideEnum.claimer:
          text = "Claimer wins";
          break;
        case SideEnum.challenger:
          text = "Challenger wins";
          break;
        case SideEnum.shared:
          text = "Shared";
      }
      setFormatedCurrentRuling(text);
    }

    const calculateTotalCost = (appealCost: bigint, currentRuling: SideEnum, winnerMult: number, loserMult: number, sharedMult: number) => {
      const getSideTotalCost = (sideMultiplier: number) => {
        return Number(appealCost) + ((Number(appealCost) * sideMultiplier) / MULTIPLIER_DIVISOR);
      }
      const MULTIPLIER_DIVISOR = 10000;
      
      const claimerMultiplier = currentRuling === SideEnum.shared?sharedMult: currentRuling === SideEnum.claimer? winnerMult : loserMult;
      const totalClaimerCost = getSideTotalCost(Number(claimerMultiplier));
      setTotalClaimerCost(BigInt(totalClaimerCost));
  
      const challengerMultiplier = currentRuling === SideEnum.shared?sharedMult: currentRuling === SideEnum.claimer? loserMult : winnerMult;
      const totalChallengerCost = getSideTotalCost(Number(challengerMultiplier));
      setTotalChallengerCost(BigInt(totalChallengerCost));
    }

    const getAppealData = async () => {
      try{
        const arbitratorFromRequest: ArbitratorFromRequest = await APIPoH.getArbitratorFromRequest(chainId, pohId, requestIndex);
        const arbitrator = arbitratorFromRequest.arbitrator!;
        const extraData = arbitratorFromRequest.extraData!;
        setArbitrator(arbitrator as any);

        const currentRoundSideFunds: CurrentRoundSideFunds = await APIPoH.getCurrentRoundSideFunds(chainId, pohId, requestIndex, arbitrator, disputeId);
        setClaimerFunds(currentRoundSideFunds.claimerFunds!);
        setChallengerFunds(currentRoundSideFunds.challengerFunds!);

        const stakeMultipliers: StakeMultipliers = await APIPoH.getStakeMultipliers(chainId);
        const winnerMult = stakeMultipliers.winnerStakeMultiplier;
        const loserMult = stakeMultipliers.looserStakeMultiplier;
        const sharedMult = stakeMultipliers.sharedStakeMultiplier; 

        const arbitratorsData: ArbitratorsData = await APIArbitrator.getArbitratorsData(chainId, arbitrator, disputeId, extraData);
        const status = arbitratorsData.status;
        const cost = arbitratorsData.cost;
        const period = arbitratorsData.period;
        const currentRuling = arbitratorsData.currentRuling;
      
        
        setPeriod(period as any);
        setDisputeStatus(Number(status) as DisputeStatusEnum);
        //setDisputeStatus(1 as DisputeStatusEnum); // -------------------------------- JUST FOR TESTING
        formatCurrentRuling(Number(currentRuling) as SideEnum);
        calculateTotalCost(cost as any, Number(currentRuling) as SideEnum, Number(winnerMult), Number(loserMult), Number(sharedMult));  
        
        setLoading(false);
      } catch (e) {
        !errorRef.current && toast.info("Unexpected error while reading appelate round info. Come back later");
        setError(true);
        errorRef.current = true;
        console.log(e);
      }
    }
    getAppealData();  
  });
  
  return (
    disputeStatus === DisputeStatusEnum.Appealable && !error && !loading?
    <Modal
      header={`Appeal case #${disputeId}`}
      trigger={
        <button className="btn-sec px-[24px] h-[48px] rounded">
          Fund Appeal (ends&nbsp;<TimeAgo time={parseInt(String(period[1]))}/>)
        </button>}
    >
      <div className="paper w-full px-16 py-8">
        <h1 className="mb-4 text-xl">Appeal the decision: {formatedCurrentRuling}</h1>
        <p className="txt">
          In order to appeal the decision, you need to fully fund the
          crowdfunding deposit. The dispute will be sent to the jurors when the
          full deposit is reached. Note that if the previous round loser funds
          its side, the previous round winner should also fully fund its side,
          in order not to lose the case.
        </p>
        <br/>
        <SideFunding
          side={SideEnum.claimer}
          disputeId={disputeId}
          arbitrator={arbitrator!}
          contributor={contributor}
          
          requester={claimer}
          requesterFunds={claimerFunds}
          appealCost={totalClaimerCost}
        />
        <br/>
        <SideFunding
          side={SideEnum.challenger}
          disputeId={disputeId}
          arbitrator={arbitrator!}
          contributor={contributor}

          requester={challenger}
          requesterFunds={challengerFunds}
          appealCost={totalChallengerCost}
        />
      </div>
    </Modal>
    : null
  );
};

export default Appeal;
