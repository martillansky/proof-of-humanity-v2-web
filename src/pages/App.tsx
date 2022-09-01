import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "modules/layout";
import Claim from "./Claim";
import Home from "./Home";
import Request from "./Request";
import Soul from "./Soul";
import Souls from "./Souls";
import "./style.pcss";

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="souls" element={<Souls />} />

      <Route path="request/:chain/:soul/:index" element={<Request />}>
        <Route path=":old" />
      </Route>

      <Route path="claim" element={<Claim />}>
        <Route path=":soul" />
      </Route>

      <Route path="soul/:address" element={<Soul />} />

      <Route path="*" element={<h1>Page not found</h1>} />
    </Route>
  </Routes>
);

export default App;
