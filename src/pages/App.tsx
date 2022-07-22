import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "modules/Layout";
import Home from "./Home";
import Profile from "./Profile";
import Soul from "./Soul";
import Souls from "./Souls";
import Requests from "./Requests";

import "./style.pcss";
import Claim from "./Claim";

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="requests" element={<Requests />} />
      <Route path="profile/:address" element={<Profile />} />
      <Route path="claim" element={<Claim />} />
      <Route path="soul/:address" element={<Soul />} />
      <Route path="souls" element={<Souls />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Route>
  </Routes>
);

export default App;
