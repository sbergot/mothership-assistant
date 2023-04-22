import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Layout } from "./UI/Layout";
import { Root } from "Root/Root";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Layout>
      <Root />
    </Layout>
  </React.StrictMode>
);
