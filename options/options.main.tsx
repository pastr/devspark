import React from "react";
import ReactDOM from "react-dom/client";
import Options from "./Options";
import "./styles/options.tailwind.css";
import "./styles/options.global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
);
