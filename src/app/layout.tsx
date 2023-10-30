import { Inter } from "next/font/google";
import Header from "./Header";
import cn from "classnames";
import Footer from "./Footer";
import { getContractData } from "data/contract";
import { defaultChain } from "config/chains";
import { ipfs, ipfsFetch } from "utils/ipfs";
import { Metadata } from "next";
import Toastify from "./Toastify";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Proof of Humanity V2",
};

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const policy = (await getContractData(defaultChain.id)).arbitrationInfo
    .policy;

  return (
    <html lang="en">
      <body
        className={cn(
          "relative min-h-screen pb-16 flex-col bg-shade-50 scrollbar",
          inter.className
        )}
      >
        <Header policy={ipfs(policy)} />
        <main>{children}</main>
        <Footer />
        <Toastify />
      </body>
    </html>
  );
}
