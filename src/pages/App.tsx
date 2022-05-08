import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "modules/Layout";
import Home from "./Home";
import Profile from "./Profile";

import "./style.pcss";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Route>
    </Routes>
  );
};

export default App;
