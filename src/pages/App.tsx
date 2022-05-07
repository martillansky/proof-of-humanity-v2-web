import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "src/modules/Layout";
import Home from "./Home";
import Profile from "./Profile";

import "../styles/main.pcss";

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="profile" element={<Profile />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Route>
  </Routes>
);

export default App;
