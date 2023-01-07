import { useEffect, useState } from "react";
import { ESupportedApps } from "../../common/enums/ESupportedApps";
import OptionCard from "./OptionCard";
import { useOptions } from "../../common/context/options.context";

export default function OptionCardJira() {
  const [jiraOrganizationName, setJiraOrganizationName] = useState("");
  const [options, setOptions] = useOptions();

  useEffect(() => {
    if (options.options.jira.organizationName) {
      setJiraOrganizationName(options.options.jira.organizationName);
    }
  }, [options.options.jira.organizationName]);


  function saveJiraOrganizationName() {
    const newOptions: typeof options = { ...options };
    newOptions.options.jira.organizationName = jiraOrganizationName;
    setOptions(newOptions);
  }

  return (
    <OptionCard title="Jira" icon={ESupportedApps.Jira}>
      <div className="">
        <label htmlFor="jira_domain">
          Jira organization name
        </label>
        <div className="mb-2">
          <input className="input w-44"
                 value={jiraOrganizationName}
                 onChange={(e) => setJiraOrganizationName(e.target.value)}
                 type="text"
                 id="jira_domain"/>
        </div>
        <button className="btn-primary w-16 h-6"
                onClick={saveJiraOrganizationName}>
          Set
        </button>
      </div>
    </OptionCard>
  );
}