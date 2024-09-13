
import Image from "next/image";

export default function Loading() {
    return <Image
    alt="logo loading"
    className="mx-auto animate-flip my-40"
    src="/logo/poh-colored.svg"
    width={64}
    height={64}
  />;
}