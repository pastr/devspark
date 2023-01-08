import { useState } from "react";
import { ESupportedApps } from "../../common/enums/ESupportedApps";
import OptionCard from "./OptionCard";
import { useOptions } from "../../common/context/options.context";
import set from "lodash.set";

export default function OptionCardJira() {
  const [jiraOrganizationName, setJiraOrganizationName] = useState("");
  const [options, setOptions] = useOptions();

  function saveJiraOrganizationName() {
    const newOptions: typeof options = { ...options };
    console.log("🚀 ~ saveJiraOrganizationName ~ newOptions", newOptions);

    if (newOptions?.options?.jira?.organizationName) {
      newOptions.options.jira.organizationName = jiraOrganizationName;
    } else {
      set(newOptions, "options.jira.organizationName", jiraOrganizationName);
    }

    setOptions(newOptions);
    setJiraOrganizationName("");
  }

  function showCurrentOrganizationName() {
    if (options.options?.jira?.organizationName) {
      return (
        <div>Currrent organization name: <span className="font-extrabold">{options.options.jira.organizationName}</span></div>
      );
    }

  }

  return (
    <OptionCard title="Jira" icon={ESupportedApps.Jira}>
      <div>
        <h1 className="mb-4 text-lg font-semibold">Set your Jira organization name</h1>
        <label className="text-sm" htmlFor="jira_organization_name">
          organization name:
        </label>
        <div className="flex gap-2">
          <input className="input w-44 flex-[4]"
                 value={jiraOrganizationName}
                 onChange={(e) => setJiraOrganizationName(e.target.value)}
                 onKeyDown={(e) => e.key === "Enter" ? saveJiraOrganizationName() : null}
                 type="text"
                 placeholder="e.g. devsparktoolbox"
                 id="jira_organization_name"/>
          <button className="btn-primary"
                  disabled={jiraOrganizationName === ""}
                  onClick={saveJiraOrganizationName}>
            Set
          </button>
        </div>

        <div>
          <div className="mt-4 text-sm">
            {showCurrentOrganizationName()}
          </div>
        </div>
      </div>
    </OptionCard>
  );
}