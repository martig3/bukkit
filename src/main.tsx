import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { redirect } from "react-router-dom";

const { fetch: originalFetch } = window;
window.fetch = async (...args) => {
  if (!args[1]) {
    args[1] = {};
  }
  let [resource, config] = args;
  config.credentials = "include";

  let response = await originalFetch(resource, config);

  if (response.status === 401) {
    throw redirect("/login");
  }

  return response;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
