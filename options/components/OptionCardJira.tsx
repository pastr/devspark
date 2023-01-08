import { useState } from "react";
import { ESupportedApps } from "../../common/enums/ESupportedApps";
import OptionCard from "./OptionCard";
import { useOptions } from "../../common/context/options.context";

export default function OptionCardJira() {
  const [jiraOrganizationName, setJiraOrganizationName] = useState("");
  const [options, setOptions] = useOptions();

  function saveJiraOrganizationName() {
    const newOptions: typeof options = { ...options };
    newOptions.options.jira.organizationName = jiraOrganizationName;
    setOptions(newOptions);
    setJiraOrganizationName("");
  }

  return (
    <OptionCard title="Jira" icon={ESupportedApps.Jira}>
      <div>
        <label htmlFor="jira_domain">
          Jira organization name:
        </label>
        <div className="mb-2">
          <input className="input w-44"
                 value={jiraOrganizationName}
                 onChange={(e) => setJiraOrganizationName(e.target.value)}
                 onKeyDown={(e) => e.key === "Enter" ? saveJiraOrganizationName() : null}
                 type="text"
                 id="jira_domain"/>
        </div>
        <button className="btn-primary w-16 h-6"
                disabled={jiraOrganizationName === ""}
                onClick={saveJiraOrganizationName}>
          Set
        </button>

        <div>
          <div className="mt-4 text-sm">
            Currrent organization name: <span className="font-extrabold">{options.options.jira.organizationName}</span>
          </div>
        </div>
      </div>
    </OptionCard>
  );
}