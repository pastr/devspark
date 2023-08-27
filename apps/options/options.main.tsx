import "./src/styles/options.tailwind.css";
import "./src/styles/options.global.css";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Link, RouterProvider, createHashRouter } from "react-router-dom";

import Options from "./Options";
import OptionDevelopment from "./src/development/OptionDevelopment";
import OptionViewEnvironmentName from "./src/environment/OptionViewEnvironment";
import OptionViewGithub from "./src/github/OptionViewGithub";
import OptionViewJira from "./src/jira/OptionViewJira";


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

const router = createHashRouter([
  {
    path: "/",
    element: <Options />,
    children: [
      {
        path: "github",
        element: <OptionViewGithub />
      },
      {
        path: "jira",
        element: <OptionViewJira />
      },
      {
        path: "environmentName",
        element: <OptionViewEnvironmentName />
      },
      {
        path: "development",
        element: <OptionDevelopment />
      },
      {
        path: "*",
        element: <NoMatch />
      }
    ]
  }
]);


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
