import { EvidenceFile, RegistrationFile } from "types/docs";
import { ipfs, ipfsFetch } from "utils/ipfs";
import { SupportedChainId, paramToChain, supportedChains } from "config/chains";
import ActionBar from "./ActionBar";
import Evidence from "./Evidence";
import { getOffChainVouches, getRequestData } from "data/request";
import { getContractData } from "data/contract";
import { getArbitrationCost } from "data/costs";
import { machinifyId, prettifyId } from "utils/identifier";
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
import { Address } from "viem";
import { Hash } from "@wagmi/core";
import { getClaimerData } from "data/claimer";
import { ClaimerQuery, Request, Vouch as VouchQuery } from "generated/graphql";
import Vouch from "components/Vouch";
import { ValidVouch, isValidOnChainVouch, isValidVouch } from "data/vouch";

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

  const onChainVouches = 
    request.claimer.vouchesReceived
    .map((v) => v.from.id as Address);
  
  
  // This are vouches to be read directly from supabase, ie, vouches still not processed 
  // (only necessary before advance state in vouching status)
  const offChainVouches: { 
    voucher: Address;
    expiration: number;
    signature: Hash;
  }[] = [];
  
  if (request.status.id === "vouching") {
    offChainVouches.push(
      ...(await getOffChainVouches(chain.id, request.claimer.id, pohId))
    );
  }


  const hasExpired = () => {
    if (request.status.id === "resolved") {
      if (
        !request.revocation &&
        request.humanity.winnerClaim.length>0) {
          if (request.humanity.winnerClaim[0].index === request.index) {
            if (!!contractData.humanityLifespan) {
              return (
                Number(request.humanity.winnerClaim[0].resolutionTime) + Number(contractData.humanityLifespan) < Date.now() / 1000 || 
                !request.humanity.registration
              )
            }
          } else return true;
        }
    } else if (request.status.id === "transferring") {
      return (Number(request.creationTime) + Number(contractData.humanityLifespan) < Date.now() / 1000)
    }
    return true;
  }

  const expired = hasExpired();

  /* let action = ActionType.NONE;
  const setAction = (actionIn: ActionType) => {
    action = actionIn;
  } */
  /* //const [action, setAction] = useState(ActionType.NONE);


  if (request.status.id === "resolved" || request.status.id === "withdrawn")
    setAction(ActionType.NONE);
  else if (request.index < 0 && request.index > -100) setAction(ActionType.OLD_ACTIVE);
  else if (request.status.id === "disputed") setAction(ActionType.DISPUTED);
  else if (request.status.id === "vouching") {
    offChainVouches.push(
      ...(await getOffChainVouches(chain.id, request.claimer.id, pohId))
    );
    if (
      BigInt(request.challenges[0].rounds[0].requesterFund.amount) <
      arbitrationCost + BigInt(contractData.baseDeposit)
    )
      setAction(ActionType.FUND);
    else if (
      onChainVouches.length + offChainVouches.length >=
      contractData.requiredNumberOfVouches
    )
      setAction(ActionType.ADVANCE);
    else if (onChainVouches.length + offChainVouches.length >= 0)
      setAction(ActionType.REMOVE_VOUCH);
    else setAction(ActionType.VOUCH);
  } else if (request.status.id == "resolving")
    setAction(
      +request.lastStatusChange + +contractData.challengePeriodDuration <
      Date.now() / 1000
        ? ActionType.EXECUTE
        : ActionType.CHALLENGE
    );
 */
  let registrationFile: RegistrationFile | null;
  let revocationFile: EvidenceFile | null = null;

  if (request.revocation) {
    const [registrationEvidence, revocationEvidence] = await Promise.all([
      (request.humanity.winnerClaim.length>0 && request.humanity.winnerClaim.at(0)!.evidenceGroup.evidence.length>0)?
      ipfsFetch<EvidenceFile>(
        request.humanity.winnerClaim.at(0)!.evidenceGroup.evidence.at(-1)!.uri
      ): null,
      ipfsFetch<EvidenceFile>(request.evidenceGroup.evidence.at(-1)!.uri),
    ]);

    revocationFile = revocationEvidence;
    registrationFile = registrationEvidence && registrationEvidence.fileURI
      ? await ipfsFetch<RegistrationFile>(registrationEvidence.fileURI)
      : null;
  } else {
    const registrationEvidence = 
      request.evidenceGroup.evidence.length>0?
      await ipfsFetch<EvidenceFile>(
        request.evidenceGroup.evidence.at(-1)!.uri
      ) : null;

    registrationFile = registrationEvidence && registrationEvidence.fileURI
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

  /* interface VouchStatus {
    isValid: boolean; 
    reason: string | undefined;
  } */

  interface VouchData {
    voucher: Address | undefined,
    name: string | null | undefined,
    pohId: Address | undefined,
    photo: string | undefined,
    vouchStatus: ValidVouch | undefined,//VouchStatus | undefined,
    isOnChain: boolean,
  }

  const prepareVouchData = (rawVouches: Record<SupportedChainId,ClaimerQuery>[], isOnChain: boolean, skipStatusCheck: boolean): Promise<VouchData>[] => {
    return rawVouches
    .map(async (rawVoucher) => {
      const out: VouchData = {
        'voucher': undefined,
        'name': undefined,
        'pohId': undefined,
        'photo': undefined,
        'vouchStatus': undefined,
        'isOnChain': isOnChain,
      };
      try {
        const voucherEvidenceChain = supportedChains.find(
          (chain) =>
          rawVoucher[chain.id].claimer && rawVoucher[chain.id].claimer?.registration?.humanity.winnerClaim
        );
        const relevantChain = !!voucherEvidenceChain? voucherEvidenceChain : chain;
        //const relevantChain = chain;
        
        out.name = rawVoucher[relevantChain.id].claimer?.name;
        out.voucher = rawVoucher[relevantChain.id].claimer?.id;
        out.pohId = rawVoucher[relevantChain.id].claimer?.registration?.humanity.id;
        if (!out.pohId) out.pohId = out.voucher;
        const uri = rawVoucher[relevantChain.id]
          .claimer?.registration?.humanity.winnerClaim.at(0)
          ?.evidenceGroup.evidence.at(0)?.uri;

        if (!skipStatusCheck && !isOnChain) {
          out.vouchStatus = await isValidVouch(
            chain.id, 
            out.voucher!, 
            offChainVouches.find(vouch => vouch.voucher === rawVoucher[relevantChain.id].claimer?.id)?.expiration
          );
        } else if (!skipStatusCheck && isOnChain) {
          out.vouchStatus = isValidOnChainVouch(
            request.claimer.vouchesReceived.find(v => v.from.id === out.voucher!)! as VouchQuery
          );
        }

        if (!uri) return out;

        const evFile = await Promise.resolve(ipfsFetch<EvidenceFile>(uri));
        if (!evFile?.fileURI) return out;

        out.photo = (await Promise.resolve(ipfsFetch<RegistrationFile>(evFile.fileURI))).photo;
        return out;
      } catch {
        return out;
      }
    })
  }

  const vourchesForData = prepareVouchData(
    await Promise.all([
      ...request.claimer.vouches.map(vouch => getClaimerData(vouch.for.id))
    ]), true, true
  );
  
  const vouchersData = prepareVouchData(
    await Promise.all([
      ...offChainVouches
      .map((vouch) => getClaimerData(vouch.voucher))
    ]), false, false
  ).concat(prepareVouchData(
    await Promise.all([
      ...onChainVouches.map((voucher) => getClaimerData(voucher)),
    ]), true, false
  ));


  const policyLink = contractData.arbitrationInfo!.policy;
  const policyUpdate = contractData.arbitrationInfo!.updateTime;

  return (
    <div className="content mx-auto flex flex-col justify-center font-semibold">
      <ActionBar
        arbitrationCost={arbitrationCost}
        index={request.index}
        status={request.status.id}
        expired={expired}
        requester={request.requester}
        contractData={contractData}
        pohId={pohId}
        lastStatusChange={+request.lastStatusChange}
        revocation={request.revocation}
        currentChallenge={
          request.challenges.length ? request.challenges.at(-1) : undefined
        }
        funded={
          request.index >= 0
            ? BigInt(request.challenges[0].rounds[0].requesterFund.amount)
            : 0n
        }
        onChainVouches={onChainVouches}
        offChainVouches={offChainVouches}
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
                {/* {request.claimer.name} */}
                {registrationFile? registrationFile.name: ''}
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
                      className="w-32 h-32 rounded-full cursor-pointer"
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

            <div className="w-full md:flex-row md:items-center justify-between">
              {policyLink && (
                <div className="w-full flex flex-col md:flex-row md:items-end font-normal grid justify-items-end">
                  <Link 
                    className="ml-2 underline underline-offset-2" 
                    href={ipfs(policyLink)}
                  >
                    Policy in force (Updated on {new Date(policyUpdate * 1000).toDateString()})
                  </Link>
                </div>
              )}
              {vourchesForData.find((v) => v) && (
                <div className="mt-8 flex flex-col">
                  Vouched for
                  <div className="flex gap-2">
                  {vourchesForData.map(async (vouch, idx) => { 
                    const vouchLocal = await Promise.resolve(vouch);
                    return (
                      <Vouch 
                        isActive = {true} 
                        reason = {undefined}
                        name = {vouchLocal.name}
                        photo = {vouchLocal.photo}
                        idx = {idx} 
                        href = {`/${prettifyId(vouchLocal.pohId!)}`}
                        pohId = {vouchLocal.pohId}
                        address = {vouchLocal.pohId}
                        isOnChain = {vouchLocal.isOnChain}
                        reducedTooltip = {true}
                      />
                    )
                  })}
                  </div>
                </div>
              )}
            </div>
            <div className="w-full md:flex-row md:items-center justify-between">
            {vouchersData.find((v) => v) && (
                <div className="mt-8 flex flex-col">
                  Vouched by
                  <div className="flex gap-2">
                    {vouchersData.map(async (vouch, idx) => {
                      const vouchLocal = await Promise.resolve(vouch);
                      return (
                        <Vouch 
                          isActive = {vouchLocal.vouchStatus?.isValid} 
                          reason = {vouchLocal.vouchStatus?.reason}
                          name = {vouchLocal.name}
                          photo = {vouchLocal.photo}
                          idx = {idx} 
                          href = {`/${prettifyId(vouchLocal.pohId!)}`}
                          pohId = {vouchLocal.pohId}
                          address = {vouchLocal.voucher}
                          isOnChain = {vouchLocal.isOnChain}
                          reducedTooltip = {false}
                        />
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
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
