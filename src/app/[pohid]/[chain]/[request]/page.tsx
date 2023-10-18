import { EvidenceFile, RegistrationFile } from "types/docs";
import { ipfs, ipfsFetch } from "utils/ipfs";
import { paramToChain } from "config/chains";
import ActionBar from "./ActionBar";
import { Address } from "viem";
import Evidence from "./Evidence";
import { getRequestData, getRequestsToAdvance } from "data/request";
import { getContractData } from "data/contract";
import { getArbitrationCost } from "data/costs";
import { machinifyId, prettifyId } from "utils/identifier";
import { ActionType } from "utils/enums";
import ExternalLink from "components/ExternalLink";
import Identicon from "components/Identicon";
import { explorerLink } from "utils/address";
import Image from "next/image";
import Previewed from "components/Previewed";
import Label from "components/Label";
import TimeAgo from "components/TimeAgo";
import Link from "next/link";
import Attachment from "components/Attachment";
import ChainLogo from "components/ChainLogo";
import Modal from "components/Modal";

interface PageProps {
  params: { pohid: string; chain: string; request: string };
}

export default async function Request({ params }: PageProps) {
  const chain = paramToChain(params.chain);

  const pohId = machinifyId(params.pohid)!;

  const [request, contractData] = await Promise.all([
    getRequestData(chain.id, pohId, +params.request),
    getContractData(chain.id),
  ]);

  if (!request) return <span>Error occured</span>;

  const arbitrationCost = await getArbitrationCost(
    chain,
    contractData.contract!.latestArbitratorHistory!.arbitrator,
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

      <div className="mb-6 border shadow bg-white rounded">
        {request.revocation && revocationFile && (
          <div className="p-4 bg-shade-100">
            <div className="relative">
              <div className="flex justify-between">
                Revocation requested - {revocationFile.name}
                {revocationFile.fileURI && (
                  <Attachment uri="revocationFile.fileURI" />
                )}
              </div>
              <p className="text-slate-600">{revocationFile.description}</p>
            </div>
            <div className="flex font-normal text-sm">
              <span className="mr-2">Requested by</span>
              <Identicon diameter={16} address={request.requester} />
              <ExternalLink
                className="ml-1 text-blue-500 underline underline-offset-2"
                href={explorerLink(request.requester, chain)}
              >
                {request.requester}
              </ExternalLink>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row">
          <div className="relative pt-8 md:pb-48 px-8 md:w-2/5 flex flex-col background items-center border-r">
            {registrationFile && (
              <Previewed
                uri={ipfs(registrationFile.photo)}
                trigger={
                  <Image
                    className="w-32 h-32 bg-no-repeat bg-cover bg-center rounded-full cursor-pointer"
                    alt="image"
                    src={ipfs(registrationFile.photo)}
                    width={144}
                    height={144}
                  />
                }
              />
            )}

            <span className="mt-4 mb-12 text-2xl">{request.claimer.name}</span>

            <Label className="absolute p-8 left-0 right-0 bottom-0">
              Last update: <TimeAgo time={request.lastStatusChange} />
            </Label>
          </div>

          <div className="w-full p-8 flex flex-col">
            <div className="mb-4 flex justify-between">
              <div className="flex mb-4">
                <Identicon address={request.claimer.id} />
                <ExternalLink
                  className="ml-2 font-semibold underline underline-offset-2"
                  href={explorerLink(request.claimer.id, chain)}
                >
                  {request.claimer.id}
                </ExternalLink>
              </div>
              <span className="flex">
                <ChainLogo
                  chainId={chain.id}
                  className="w-4 h-4 m-1 fill-black"
                />
                {chain.name}
              </span>
            </div>

            <div className="mb-8 flex items-center font-medium text-theme">
              <Image
                alt="poh id"
                src="/logo/pohid.svg"
                className="mr-2"
                height={24}
                width={24}
              />
              <Link href={`/${prettifyId(pohId)}`}>{prettifyId(pohId)}</Link>
              <Modal
                formal
                className="p-8 flex flex-col"
                trigger={
                  <button className="w-6 h-6 ml-2 border-2 border-theme rounded-full font-bold text-sm">
                    i
                  </button>
                }
              >
                <Image
                  alt="poh id"
                  src="/logo/pohid.svg"
                  className="mx-auto mb-8"
                  height={128}
                  width={128}
                />
                <p>
                  The Proof of Humanity ID is a soulbound ID. It corresponds to
                  each unique human registered on Proof of Humanity.
                </p>
                <p>
                  This POH ID had{" "}
                  <strong>
                    {+request.humanity.nbRequests +
                      +request.humanity.nbRequests}{" "}
                    requests
                  </strong>{" "}
                  in total
                </p>
              </Modal>
            </div>

            {registrationFile && (
              <video
                className="w-full"
                src={ipfs(registrationFile.video)}
                controls
              />
            )}
          </div>
        </div>
      </div>

      <Evidence
        list={request.evidenceGroup.evidence}
        pohId={pohId}
        requestIndex={request.index}
        arbitrationInfo={request.arbitratorHistory}
      />
    </div>
  );
}
