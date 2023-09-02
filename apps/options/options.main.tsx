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
    <div className="flex justify-center items-center h-full">
      <h1 className="font-bold text-xl">Nothing to see here!</h1>
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
        children: [
          {
            path: "pr-colors",
            element: <OptionViewGithub />
          }
        ]
      },
      {
        path: "jira",
        children: [
          {
            path: "organization",
            element: <OptionViewJira />
          }
        ]
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
