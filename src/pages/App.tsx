import React from "react";
import { Route, Routes } from "react-router-dom";
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
      <Route path="*" element={<h1>Page not found</h1>} />
    </Route>
  </Routes>
);

export default App;
