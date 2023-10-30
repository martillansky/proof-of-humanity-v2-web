import { machinifyId } from "utils/identifier";
import { Hash } from "viem";
import { supportedChains } from "config/chains";
import { redirect } from "next/navigation";
import { RedirectType } from "next/dist/client/components/redirect";
import Image from "next/image";
import dynamic from "next/dynamic";
import { getContractDataAllChains } from "data/contract";
import { getRegistrationData } from "data/registration";
import { getTotalCosts } from "data/costs";

const Form = dynamic(() => import("./Form"), {
  ssr: false,
  loading: () => (
    <Image
      alt="logo loading"
      className="mx-auto animate-flip my-40"
      src="/logo/poh-colored.svg"
      width={256}
      height={256}
    />
  ),
});

interface PageProps {
  params: { pohid: string };
}

export default async function Claim({ params: { pohid } }: PageProps) {
  if (!machinifyId(pohid))
    return (
      <div className="m-auto flex flex-col text-center">
        <span className="font-semibold">Invalid Proof of Humanity ID:</span>
        <span className="text-6xl font-light text-theme">{pohid}</span>
      </div>
    );

  const [contractData, registrationData] = await Promise.all([
    getContractDataAllChains(),
    getRegistrationData(pohid as Hash),
  ]);

  const registrationChain = supportedChains.find(
    (chain) => registrationData[chain.id]
  );
  const isRenewal =
    registrationChain &&
    +registrationData[registrationChain.id]!.expirationTime -
      Date.now() / 1000 <
      +contractData[registrationChain.id].renewalPeriodDuration;

  if (registrationChain && !isRenewal)
    redirect(`/${pohid}`, RedirectType.replace);

  const totalCosts = await getTotalCosts(contractData);

  return (
    <div
      className="content paper px-4 py-4
                 sm:px-8 sm:py-6
                 lg:px-10 lg:py-6
                 flex flex-col"
    >
      <Form
        contractData={contractData}
        totalCosts={totalCosts}
        renewal={
          registrationChain && {
            ...registrationData[registrationChain.id]!,
            chain: registrationChain,
          }
        }
      />
    </div>
  );
}
