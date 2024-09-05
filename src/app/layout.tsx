import { Inter } from "next/font/google";
import Header from "./Header";
import cn from "classnames";
import Footer from "./Footer";
import { getContractData } from "data/contract";
import { defaultChain } from "config/chains";
import { ipfs } from "utils/ipfs";
import { Metadata } from "next";
import Toastify from "./Toastify";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import PreHeader from "./PreHeader";

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

    console.log("ENTRA>>>> ", defaultChain.id);
  return (
    <html lang="en">
      <body
        className={cn(
          "relative min-h-screen pb-16 flex-col bg-shade-50 scrollbar",
          inter.className
        )}
      >
        <PreHeader policy={ipfs(policy)}/>
        {/* <Header policy={ipfs(policy)}/> */}
        <main>{children}</main>
        <Footer />
        <Toastify />
      </body>
    </html>
  );
}
