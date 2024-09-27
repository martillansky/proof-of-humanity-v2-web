"use client";

import Accordion from "components/Accordion";
import Identicon from "components/Identicon";
import Progress from "components/Progress";
import { eth2Wei, formatEth } from "utils/misc";
import usePoHWrite from "contracts/hooks/usePoHWrite";
import { Address, createPublicClient, http } from "viem";
import { useMemo, useRef, useState } from "react";
import Field from "components/Field";
import Modal from "components/Modal";
import klerosLiquid from "contracts/abis/kleros-liquid";
import { SupportedChainId, getChainRpc, supportedChains } from "config/chains";
import { toast } from "react-toastify";
import { useEffectOnce } from "@legendapp/state/react";
import TimeAgo from "components/TimeAgo";
import { Contract } from "contracts";
import abis from "contracts/abis";
import { useLoading } from "hooks/useLoading";
import Error from "next/error";


enum SideEnum {
  shared,
  claimer,
  challenger
}

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

enum DisputeStatusEnum {
  Waiting, 
  Appealable, 
  Solved
};

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
  
  const hardcodedTest = false; // ------------------------------------------------- LOOK AFTER!!!!!!!!

  const [totalClaimerCost, setTotalClaimerCost] = useState(0n);
  const [totalChallengerCost, setTotalChallengerCost] = useState(0n);
  const [formatedCurrentRuling, setFormatedCurrentRuling] = useState("");
  const defaultPeriod = hardcodedTest? [1726999079n,1827290679n] : [0n,0n];
  const [period, setPeriod] = useState(defaultPeriod);
  const [disputeStatus, setDisputeStatus] = useState(DisputeStatusEnum.Appealable);
  const [error, setError] = useState(false);
  const errorRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const [arbitrator, setArbitrator] = useState(null);
  const [claimerFunds, setClaimerFunds] = useState(0n);
  const [challengerFunds, setChallengerFunds] = useState(0n);
  const challengeIdRef = useRef(null);
  const lastRoundIdRef = useRef(null);

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
      const publicClient = createPublicClient({
        chain: supportedChains[chainId],
        transport: http(getChainRpc(chainId)),
      });

      try{
        const [arbitrator, extraData] = await publicClient.readContract({
          address: Contract.ProofOfHumanity[chainId] as Address,
          abi: abis.ProofOfHumanity as any,
          functionName: 'getRequestInfo',
          args: [pohId, requestIndex]
        })
        .then(async data => {
          return await publicClient.readContract({
            address: Contract.ProofOfHumanity[chainId] as Address,
            abi: abis.ProofOfHumanity as any,
            functionName: 'arbitratorDataHistory',
            args: [data[2]]
          })
          .then(data => {
            setArbitrator(data[1]);
            return [data[1], data[2]];
          })
        })
        .catch(e => {
          !errorRef.current && toast.info("Unexpected error while reading arbitration info. Come back later");
          setError(true);
          errorRef.current = true;
          throw new Error({statusCode: 520, title: "Error while reading ProofOfHumanity"});
        });


        await publicClient.readContract({
          address: Contract.ProofOfHumanity[chainId] as Address,
          abi: abis.ProofOfHumanity as any,
          functionName: 'disputeIdToData',
          args: [arbitrator, disputeId]
        })
        .then(async data => {
          challengeIdRef.current = data[1];
          await publicClient.readContract({
            address: Contract.ProofOfHumanity[chainId] as Address,
            abi: abis.ProofOfHumanity as any,
            functionName: 'getChallengeInfo',
            args: [pohId, requestIndex, challengeIdRef.current]
          })
          .then(async data => {
            lastRoundIdRef.current = data[0];
            await publicClient.readContract({
              address: Contract.ProofOfHumanity[chainId] as Address,
              abi: abis.ProofOfHumanity as any,
              functionName: 'getRoundInfo',
              args: [pohId, requestIndex, challengeIdRef.current, lastRoundIdRef.current]
            })
            .then(data => {
              setClaimerFunds(data[1]);
              setChallengerFunds(data[2]);
            })
          })
        })
        .catch(e => {
          !errorRef.current && toast.info("Unexpected error while reading appelate round info. Come back later");
          setError(true);
          errorRef.current = true;
          throw new Error({statusCode: 520, title: "Error while reading ProofOfHumanity"});
        });

        
        const getStakeMultiplier = async (func: string) => {
          return await publicClient.readContract({
            address: Contract.ProofOfHumanity[chainId] as Address,
            abi: abis.ProofOfHumanity as any,
            functionName: func,
            args: []
          })
          .catch(e => {
            !errorRef.current && toast.info("Unexpected error while reading appeal info. Come back later");
            setError(true);
            errorRef.current = true;
            throw new Error({statusCode: 520, title: "Error while reading ProofOfHumanity"});
          });
        }

        const getArbitratorsData = async (func: string, args: Array<any>) => {
          return await publicClient.readContract({
            address: arbitrator,
            abi: klerosLiquid as any,
            functionName: func,
            args: args
          })
          .catch(e => {
            !errorRef.current && toast.info("Unexpected error while reading appeal info. Come back later");
            setError(true);
            errorRef.current = true;
            throw new Error({statusCode: 521, title: "Error while reading Arbitrator"});
          });
        }

      
        const status = await Promise.resolve(
          getArbitratorsData('disputeStatus', [disputeId])
        );

        const [winnerMult, loserMult, sharedMult, cost, period, currentRuling] = await Promise.all([
          getStakeMultiplier('winnerStakeMultiplier'),
          getStakeMultiplier('loserStakeMultiplier'),
          getStakeMultiplier('sharedStakeMultiplier'),
          getArbitratorsData('appealCost', [disputeId, extraData]),
          getArbitratorsData('appealPeriod', [disputeId]),
          getArbitratorsData('currentRuling', [disputeId]),
        ]);
      
        if (hardcodedTest) {
          formatCurrentRuling(2 as SideEnum);
          calculateTotalCost(cost as any, 2 as SideEnum, Number(winnerMult), Number(loserMult), Number(sharedMult));
        } else {
          setPeriod(period as any);
          setDisputeStatus(Number(status) as DisputeStatusEnum);
          //setDisputeStatus(1 as DisputeStatusEnum);
          formatCurrentRuling(Number(currentRuling) as SideEnum);
          calculateTotalCost(cost as any, Number(currentRuling) as SideEnum, Number(winnerMult), Number(loserMult), Number(sharedMult));  
        }
        /* 
        setPeriod(period as any);
        setDisputeStatus(Number(status) as DisputeStatusEnum);
        formatCurrentRuling(Number(currentRuling) as SideEnum);
        calculateTotalCost(cost as any, Number(currentRuling) as SideEnum, Number(winnerMult), Number(loserMult), Number(sharedMult));
        */

        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    getAppealData();  
  });
  
  return (
    disputeStatus === DisputeStatusEnum.Appealable && !error && !loading?
    <Modal
      // formal
      header={`Appeal case #${disputeId}`}
      trigger={
        <button className="btn-sec mb-2">
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