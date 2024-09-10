import Link from "next/link";
import { sepolia } from "viem/chains";
import ExternalLink from "components/ExternalLink";
import { prettifyId } from "utils/identifier";

interface DesktopNavigationProps {
  web3Loaded: boolean;
  chain: { id: number; name: string };
  pathname: string;
  policy: string;
  me: any;
  address?: `0x${string}`;
}

const DesktopNavigation = ({
  web3Loaded,
  chain,
  pathname,
  policy,
  me,
  address,
}: DesktopNavigationProps) => {
  return (
    <div className="hidden md:flex my-2 sm:place-self-end gap-x-8 sm:gap-x-12 whitespace-nowrap">
      {web3Loaded && chain.id === sepolia.id && (
        <ExternalLink href="https://docs.scroll.io/en/user-guide/faucet/">
          Faucet
        </ExternalLink>
      )}
      {pathname !== "/" && <Link href="/">Profiles</Link>}
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
      <ExternalLink href={policy}>Policy</ExternalLink>
    </div>
  );
};

export default DesktopNavigation;
