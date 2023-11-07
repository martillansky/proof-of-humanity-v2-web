import { EvidenceFile, RegistrationFile } from "types/docs";
import { ipfs, ipfsFetch } from "utils/ipfs";
import { paramToChain } from "config/chains";
import ActionBar from "./ActionBar";
import Evidence from "./Evidence";
import { getRequestData } from "data/request";
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
import Info from "./Info";

interface PageProps {
  params: { pohid: string; chain: string; request: string };
}

export default async function Request({ params }: PageProps) {
  const chain = paramToChain(params.chain);

  if (!chain) throw new Error("unsupported chain");

  const pohId = machinifyId(params.pohid)!;

  const [request, contractData] = await Promise.all([
    getRequestData(chain.id, pohId, +params.request),
    getContractData(chain.id),
  ]);

  if (!request) return <span>Error occured</span>;

  const arbitrationCost = await getArbitrationCost(
    chain,
    contractData.arbitrationInfo.arbitrator,
    contractData.arbitrationInfo.extraData
  );

  let action = ActionType.NONE;
  if (request.status.id === "resolved" || request.status.id === "withdrawn")
    action = ActionType.NONE;
  else if (request.index < 0) action = ActionType.OLD_ACTIVE;
  else if (request.status.id === "disputed") action = ActionType.DISPUTED;
  else if (request.status.id === "vouching") {
    if (
      BigInt(request.challenges[0].rounds[0].requesterFund.amount) <
      arbitrationCost + BigInt(contractData.baseDeposit)
    )
      action = ActionType.FUND;
    else if (
      request.claimer.vouchesReceived.length >=
      contractData.requiredNumberOfVouches
    )
      action = ActionType.ADVANCE;
    else action = ActionType.VOUCH;
  } else if (request.status.id == "resolving")
    action =
      +request.lastStatusChange + +contractData.challengePeriodDuration <
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

  // let advanceRequests: {
  //   offChain: { claimer: Address; vouchers: Address[] }[];
  //   onChain: { claimer: Address; vouchers: Address[] }[];
  // } = { onChain: [], offChain: [] };
  // if (action === ActionType.ADVANCE) {
  //   advanceRequests.onChain = (await getRequestsToAdvance(chain.id))
  //     .map((req) => {
  //       if (
  //         BigInt(req.challenges[0].rounds[0].requesterFund.amount) !==
  //         BigInt(contractData.baseDeposit) + arbitrationCost
  //       )
  //         return null;

  //       const onChainVouches = req.claimer.vouchesReceived
  //         .filter(
  //           (vouch) =>
  //             vouch.humanity.id === req.humanity.id && !vouch.humanity.usedVouch
  //         )
  //         .map((vouch) => vouch.from.id);

  //       return onChainVouches.length
  //         ? { claimer: req.claimer.id, vouchers: onChainVouches }
  //         : null;
  //     })
  //     .filter((vouch) => vouch) as { claimer: Address; vouchers: Address[] }[];

  // advanceRequests.offChain =
  // }

  return (
    <div className="content mx-auto flex flex-col justify-center font-semibold">
      <ActionBar
        action={action}
        arbitrationCost={arbitrationCost}
        index={request.index}
        status={request.status.id}
        requester={request.requester}
        contractData={contractData}
        pohId={pohId}
        lastStatusChange={+request.lastStatusChange}
        revocation={request.revocation}
        funded={
          request.index >= 0
            ? BigInt(request.challenges[0].rounds[0].requesterFund.amount)
            : 0n
        }
        onChainVouches={request.claimer.vouchesReceived
          .filter((v) => v.from.registration)
          .map((v) => v.from.id)}
        offChainVouches={
          []
          // request.status.id === "vouching"
          // ? await getOffChainVouches(chain.id, request.claimer.id, pohId)
          // :
        }
      />

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
          <div className="pt-8 px-8 w-2/5 hidden md:flex flex-col items-stretch justify-between background border-r">
            <div className="flex flex-col items-center">
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

              <span className="mt-4 mb-12 text-2xl">
                {request.claimer.name}
              </span>
            </div>

            <Label className="mb-8">
              Last update: <TimeAgo time={request.lastStatusChange} />
            </Label>
          </div>

          <div className="w-full p-8 flex flex-col">
            <div className="mb-8 flex flex-col-reverse md:flex-row justify-between">
              <div className="flex items-center">
                <Identicon diameter={28} address={request.claimer.id} />
                <ExternalLink
                  className="ml-2 font-semibold underline underline-offset-2"
                  href={explorerLink(request.claimer.id, chain)}
                >
                  {request.claimer.id.slice(0, 20)}
                  <wbr />
                  {request.claimer.id.slice(20)}
                </ExternalLink>
              </div>
              <span className="flex items-center">
                <ChainLogo
                  chainId={chain.id}
                  className="w-4 h-4 m-1 fill-black"
                />
                {chain.name}
              </span>
            </div>

            <div className="mb-8 flex font-medium text-theme">
              <Image
                alt="poh id"
                src="/logo/pohid.svg"
                className="mr-2"
                height={24}
                width={24}
              />
              <Link href={`/${prettifyId(pohId)}`}>
                {prettifyId(pohId).slice(0, 20)}
                <wbr />
                {prettifyId(pohId).slice(20)}
              </Link>

              <Info
                nbRequests={
                  +request.humanity.nbRequests +
                  +request.humanity.nbLegacyRequests
                }
              />
            </div>

            <div className="flex md:hidden flex-col items-center">
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

              <span className="mt-4 mb-12 text-2xl">
                {request.claimer.name}
              </span>
            </div>

            {registrationFile && (
              <video
                className="w-full"
                src={ipfs(registrationFile.video)}
                controls
              />
            )}

            <Label className="md:hidden mb-8">
              Last update: <TimeAgo time={request.lastStatusChange} />
            </Label>
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
