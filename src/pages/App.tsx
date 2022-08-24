import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "modules/Layout";
import Home from "./Home";
import Profile from "./Profile";
import Soul from "./Soul";
import Souls from "./Souls";
import Request from "./Request";
import Claim from "./Claim";

import "./style.pcss";

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="requests" element={<Home />} />
      <Route path="souls" element={<Souls />} />
      <Route path="request/:soul/:index/:chain" element={<Request />} />
      <Route path="profile/:address" element={<Profile />} />
      <Route path="claim" element={<Claim />} />
      <Route path="soul/:address" element={<Soul />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Route>
  </Routes>
);

export default App;
