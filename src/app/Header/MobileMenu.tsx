import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Ref, forwardRef } from "react";
import { prettifyId } from "utils/identifier";
import Options from "./Options";
import WalletSection from "./WalletSection";

interface MobileMenuProps {
  policy: string;
  me: any;
  pathname: string;
  address?: `0x${string}`;
  web3Loaded: boolean;
  isConnected: boolean;
}

const MobileMenu = forwardRef(
  (
    { policy, me, pathname, address, web3Loaded, isConnected }: MobileMenuProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const searchParams = useSearchParams();
    const currentUrl = searchParams.get("url");

    return (
      <div
        ref={ref}
        className="md:hidden absolute top-16 right-0 gradient w-64 p-4 rounded shadow-lg z-10"
      >
        <nav className="flex flex-col gap-y-4">
          <Link href="/" className={`${pathname === "/" ? "font-bold" : ""}`}>
            Profiles
          </Link>
          {me &&
            (me.pohId ? (
              <Link
                href={`/${prettifyId(me.pohId)}`}
                className={`text-lg ${
                  pathname === `/${prettifyId(me.pohId)}` ? "font-bold" : ""
                }`}
              >
                PoH ID
              </Link>
            ) : (
              <Link
                href={
                  me.currentRequest
                    ? `/${prettifyId(me.currentRequest.humanity.id)}/${
                        me.currentRequest.chain.name
                      }/${me.currentRequest.index}`
                    : `/${prettifyId(address!)}/claim`
                }
                className={`text-lg ${
                  pathname.includes("/claim") ? "font-bold" : ""
                }`}
              >
                Register
              </Link>
            ))}
          <Link
            href={`/attachment?url=${policy}`}
            className={`text-lg ${
              currentUrl?.includes(policy) ? "font-bold" : ""
            }`}
          >
            Policy
          </Link>
        </nav>

        <div className="mt-4">
          <WalletSection
            {...{
              chain: { id: 1, name: "Ethereum" },
              address,
              isConnected,
              web3Loaded,
            }}
          />
        </div>
        <Options />
      </div>
    );
  }
);

export default MobileMenu;
