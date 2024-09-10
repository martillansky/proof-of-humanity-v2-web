"use client";

import { getMyData } from "data/user";
import Hamburger from "icons/Hamburger.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { useAccount, usePublicClient } from "wagmi";
import withClientConnected from "components/high-order/withClientConnected";
import useWeb3Loaded from "hooks/useWeb3Loaded";
import DesktopNavigation from "./DesktopNavigation";
import MobileMenu from "./MobileMenu";
import WalletSection from "./WalletSection";

interface IHeader extends JSX.IntrinsicAttributes {
  policy: string;
}

export default withClientConnected(function Header({ policy }: IHeader) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { isConnected, address } = useAccount();
  const { chain } = usePublicClient();
  const web3Loaded = useWeb3Loaded();
  const { data: me } = useSWR(address, getMyData);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="h-16 md:h-16 px-6 pt-2 md:px-8 pb-2 w-full flex justify-between items-center text-white text-lg gradient shadow-sm">
      <Link href="/" className="flex items-center w-[156px]">
        <Image
          alt="proof of humanity logo"
          src="/logo/poh-text-white.svg"
          height={48}
          width={156}
        />
      </Link>

      <button
        className="md:hidden block ml-auto text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Hamburger />
      </button>

      <DesktopNavigation
        {...{ address, me, policy, pathname, chain, web3Loaded }}
      />

      {menuOpen && (
        <MobileMenu
          ref={menuRef}
          {...{ isConnected, web3Loaded, address, pathname, me, policy }}
        />
      )}

      <div className="hidden md:block">
        <WalletSection {...{ chain, address, isConnected, web3Loaded }} />
      </div>
    </header>
  );
});
