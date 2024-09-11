import Link from "next/link";
import { Ref, forwardRef } from "react";
import { prettifyId } from "utils/identifier";
import WalletSection from "./WalletSection"
import Options from "./Options"

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

    return (
      <div
        ref={ref}
        className="md:hidden absolute top-16 right-0 gradient w-64 p-4 rounded shadow-lg z-10"
      >
        <nav className="flex flex-col gap-y-4">
          <Link href="/" className="text-lg font-semibold">
            Profiles
          </Link>
          {me &&
            (me.pohId ? (
              <Link href={`/${prettifyId(me.pohId)}`}>PoH ID</Link>
            ) : (
              !pathname.endsWith("/claim") && (
                <Link
                  href={
                    me.currentRequest
                      ? `/${prettifyId(me.currentRequest.humanity.id)}/${
                          me.currentRequest.chain.name
                        }/${me.currentRequest.index}`
                      : `/${prettifyId(address!)}/claim`
                  }
                >
                  Register
                </Link>
              )
            ))}
          <Link href={policy} className="text-lg">
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
