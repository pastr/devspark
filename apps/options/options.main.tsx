import "./src/styles/options.tailwind.css";
import "./src/styles/options.global.css";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Routes, Route, Link, HashRouter } from "react-router-dom";

import Options from "./Options";
import OptionDevelopment from "./src/development/OptionDevelopment";
import OptionViewEnvironmentName from "./src/environment/OptionViewEnvironment";
import OptionViewGithub from "./src/github/OptionViewGithub";
import OptionViewJira from "./src/jira/OptionViewJira";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Options />}>
        <Route path="github" element={<OptionViewGithub />} />
        <Route path="jira" element={<OptionViewJira />} />
        <Route path="environmentName" element={<OptionViewEnvironmentName />} />
        <Route path="development" element={<OptionDevelopment />} />

        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}


function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
