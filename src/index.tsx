import "dotenv/config";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App";
import { BrowserRouter as Router } from "react-router-dom";
import Web3Manager from "modules/Web3Manager";
import { ToastContainer } from "react-toastify";
// import { injectStyle } from "react-toastify/dist/inject-style";

// injectStyle();

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Router>
      <Web3Manager>
        <App />
        <ToastContainer />
      </Web3Manager>
    </Router>
  </React.StrictMode>
);
