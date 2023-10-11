import { getRequestsInitData } from "data/request";
import dynamic from "next/dynamic";
import Image from "next/image";

const Grid = dynamic(() => import("components/request/Grid"), {
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

export default async function Home() {
  const requestsInitData = await getRequestsInitData();

  return (
    <div className="content-wide flex flex-col justify-center">
      <Grid initialChainStacks={requestsInitData} />
    </div>
  );
}
