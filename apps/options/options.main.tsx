import "./src/styles/options.tailwind.css";
import "./src/styles/options.global.css";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";

import Options from "./Options";
import OptionDevelopment from "./src/development/OptionDevelopment";
import OptionViewEnvironmentName from "./src/environment/OptionViewEnvironment";
import OptionViewGithub from "./src/github/OptionViewGithub";
import GhGeneralOptions from "./src/github/pages/GhGeneralOption/GhGeneralOptions";
import GhPrColors from "./src/github/pages/GhPrColors";
import GhReviewersGroup from "./src/github/pages/GhReviewersGroup";
import OptionViewJira from "./src/jira/OptionViewJira";

const IS_DEVELOPMENT = import.meta.env.MODE === "development";

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
        element: <OptionViewGithub />,
        children: [
          {
            path: "general-options",
            element: <GhGeneralOptions />
          },
          {
            path: "pr-colors",
            element: <GhPrColors />
          },
          {
            path: "reviewers-group",
            element: <GhReviewersGroup />
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
        element: IS_DEVELOPMENT ? <OptionDevelopment /> : <NoMatch />
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
