import { EvidenceFile, RegistrationFile } from "types/docs";
import { ipfsFetch } from "utils/ipfs";
import { paramToChain } from "config/chains";
import ActionBar from "./ActionBar";
import { Address, Hash } from "viem";
import Evidence from "./Evidence";
import Preview from "./Preview";
import { getRequestData, getRequestsToAdvance } from "data/request";
import { getContractData } from "data/contract";
import { getArbitrationCost } from "data/costs";
import { machinifyId } from "utils/identifier";

export enum ActionType {
  NONE,
  OLD_ACTIVE,
  VOUCH,
  FUND,
  ADVANCE,
  CHALLENGE,
  DISPUTED,
  EXECUTE,
}

interface PageProps {
  params: { pohid: string; chain: string; request: string };
}

export default async function Request({ params }: PageProps) {
  const chain = paramToChain(params.chain);

  const pohId = machinifyId(params.pohid) as Hash;

  const [request, contractData] = await Promise.all([
    getRequestData(chain.id, pohId, +params.request),
    getContractData(chain.id),
  ]);

  if (!request) return <span>Error occured</span>;

  const arbitrationCost = await getArbitrationCost(
    chain,
    contractData.contract!.latestArbitratorHistory!.extraData
  );

  let action = ActionType.NONE;
  if (request.status.id === "resolved" || request.status.id === "withdrawn")
    action = ActionType.NONE;
  else if (request.index < 0) action = ActionType.OLD_ACTIVE;
  else if (request.status.id === "disputed") action = ActionType.DISPUTED;
  else if (request.status.id === "vouching") {
    if (
      BigInt(request.challenges[0].rounds[0].requesterFund.amount) <
      arbitrationCost + BigInt(contractData.contract!.baseDeposit)
    )
      action = ActionType.FUND;
    else if (
      request.claimer.vouchesReceived.length >=
      contractData.contract!.requiredNumberOfVouches
    )
      action = ActionType.ADVANCE;
    else action = ActionType.VOUCH;
  } else if (request.status.id == "resolving")
    action =
      +request.lastStatusChange +
        +contractData.contract!.challengePeriodDuration <
      Date.now() / 1000
        ? ActionType.EXECUTE
        : ActionType.CHALLENGE;

  let registrationFile: RegistrationFile | null;
  let revocationFile: EvidenceFile | null = null;

  if (request.revocation) {
    const [registrationEvidence, revocationEvidence] = await Promise.all([
      ipfsFetch<EvidenceFile>(
        request.humanity.winnerClaim.at(0)!.evidenceGroup.evidence.at(-1)!.uri
      ),
      ipfsFetch<EvidenceFile>(request.evidenceGroup.evidence.at(-1)!.uri),
    ]);

    revocationFile = revocationEvidence;
    registrationFile = registrationEvidence.fileURI
      ? await ipfsFetch<RegistrationFile>(registrationEvidence.fileURI)
      : null;
  } else {
    const registrationEvidence = await ipfsFetch<EvidenceFile>(
      request.evidenceGroup.evidence.at(-1)!.uri
    );

    registrationFile = registrationEvidence.fileURI
      ? await ipfsFetch<RegistrationFile>(registrationEvidence.fileURI)
      : null;
  }

  let advanceRequestsOnChainVouches: {
    claimer: Address;
    vouchers: Address[];
  }[] = [];
  if (action === ActionType.ADVANCE)
    advanceRequestsOnChainVouches = (await getRequestsToAdvance(chain.id))
      .map((req) => {
        if (
          BigInt(req.challenges[0].rounds[0].requesterFund.amount) !==
          BigInt(contractData.contract!.baseDeposit) + arbitrationCost
        )
          return null;

        const onChainVouches = req.claimer.vouchesReceived
          .filter(
            (vouch) =>
              vouch.humanity.id === req.humanity.id && !vouch.humanity.usedVouch
          )
          .map((vouch) => vouch.from.id);

        return onChainVouches.length
          ? { claimer: req.claimer.id, vouchers: onChainVouches }
          : null;
      })
      .filter((vouch) => vouch) as { claimer: Address; vouchers: Address[] }[];

  return (
    <div className="content mx-auto flex flex-col justify-center font-semibold">
      <ActionBar
        action={action}
        arbitrationCost={arbitrationCost}
        index={request.index}
        status={request.status.id}
        requester={request.requester}
        contractData={contractData.contract!}
        pohId={pohId}
        lastStatusChange={+request.lastStatusChange}
        revocation={request.revocation}
        funded={
          request.index >= 0
            ? BigInt(request.challenges[0].rounds[0].requesterFund.amount)
            : 0n
        }
        advanceRequestsOnChainVouches={advanceRequestsOnChainVouches}
      />

      {/* <Appeal /> */}

      <Preview
        claimer={{ id: request.claimer.id, name: request.claimer.name! }}
        lastStatusChange={request.lastStatusChange}
        pohId={pohId}
        requester={request.requester}
        revocation={request.revocation}
        registrationEvidence={registrationFile}
        revocationEvidence={revocationFile}
      />

      <Evidence
        list={request.evidenceGroup.evidence}
        pohId={pohId}
        requestIndex={request.index}
        arbitrationInfo={request.arbitratorHistory}
      />
    </div>
  );
}
