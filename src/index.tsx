import "dotenv/config";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import Web3Manager from "modules/Web3Manager";
import App from "pages/App";

injectStyle();

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <StrictMode>
    <Router>
      <Web3Manager>
        <App />
        <ToastContainer />
      </Web3Manager>
    </Router>
  </StrictMode>
);
