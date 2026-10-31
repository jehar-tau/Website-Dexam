import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles.css";

const tree = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
const root = document.getElementById("root");
const path = window.location.pathname.replace(/\/$/, "") || "/";
if (root.hasChildNodes() && root.dataset.prerenderPath === path)
  ReactDOM.hydrateRoot(root, tree);
else ReactDOM.createRoot(root).render(tree);
