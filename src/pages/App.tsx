import React from "react";
import { Route, Routes } from "react-router-dom";
import useWeb3 from "hooks/useWeb3";
import Layout from "modules/layout";
import Claim from "./Claim";
import Home from "./Home";
import Humanities from "./Humanities";
import Humanity from "./Humanity";
import Request from "./Request";
import "./style.pcss";

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="request/:chain/:humanity/:index">
        <Route index element={<Request />} />
        <Route path=":old" element={<Request />} />
      </Route>
      <Route path="claim">
        <Route index element={<Claim />} />
        <Route path=":humanity" element={<Claim />} />
        {/* <Route path=":chain/:humanity" /> */}
      </Route>
      <Route path="humanities" element={<Humanities />} />
      <Route path="humanity/:humanity" element={<Humanity />} />
      <Route path="sig" element={<SigPage />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Route>
  </Routes>
);

export default App;

const SigPage: React.FC = () => {
  const { provider } = useWeb3();

  const run = () => {
    console.log("hello");
    if (!provider) return;
    provider.getSigner()._signTypedData(
      { name: "Proof of Humanity", chainId: 1, verifyingContract: "0x0" },
      {
        IsHumanVoucher: [
          { name: "vouchedHuman", type: "address" },
          { name: "humanityId", type: "uint160" },
          { name: "voucherExpirationTimestamp", type: "uint256" },
        ],
      },
      {
        vouchedHuman: "0xabc",
        humanityId: "123",
        voucherExpirationTimestamp: 0,
      }
    );
  };

  return (
    <button
      onClick={run}
      className="m-8 p-8 border-2 text-xl text-white bg-teal-800 font-bold"
    >
      CLICK :)
    </button>
  );
};
