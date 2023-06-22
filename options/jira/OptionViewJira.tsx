import { useEffect, useState } from "react";
import { ESupportedApps } from "../../_shared/enums/ESupportedApps";
import { useOptions } from "../../_shared/context/options.context";
import set from "lodash.set";
import OptionView from "../_shared/components/OptionView";
import { Button, Col, Divider, Input, message, Row } from "antd";

export default function OptionCardJira() {
  const [messageApi, contextHolder] = message.useMessage();
  const [jiraOrganizationName, setJiraOrganizationName] = useState("");
  const [options, setOptions] = useOptions();

  useEffect(() => {
    if (options.jira?.organizationName) {
      setJiraOrganizationName(options.jira.organizationName);
    }
  }, [options]);


  function saveJiraOrganizationName() {
    const newOptions: typeof options = { ...options };

    if (newOptions.jira?.organizationName) {
      newOptions.jira.organizationName = jiraOrganizationName;
    } else {
      set(newOptions, "jira.organizationName", jiraOrganizationName);
    }

    setOptions(newOptions);
    messageApi.open({
      type: "success",
      content: "Organization name saved!"
    });
  }

  return (
    <OptionView title={"Jira"} icon={ESupportedApps.Jira}>
      <div className="">
        {contextHolder}
        <Row gutter={[32, 16]}>
          <Col span={8}>
            <Row className="flex-col">
              <h1 className="text-lg font-semibold">Set your Jira organization name</h1>
              <p className="text-gray-600 text-md">The organization name can be found in the atlassian url. </p>
              <p className="text-gray-600 text-md">e.g. https://<b>devsparks</b>.atlassian.net </p>
            </Row>
          </Col>

          <Col span={16}>
            <Row>
              <div>
                <label className="text-xs font-bold text-gray-500" htmlFor="jira_organization_name">
                  Organization name
                </label>
                <Input value={jiraOrganizationName}
                       defaultValue={options.jira?.organizationName}
                       onChange={(e) => setJiraOrganizationName(e.target.value)}
                       onKeyDown={(e) => e.key === "Enter" ? saveJiraOrganizationName() : null} // TODO: Remove this because the save button is for the whole page now
                       type="text"
                       placeholder="e.g. devspark"
                       id="jira_organization_name"/>
              </div>
            </Row>
          </Col>
        </Row>
        <section>
          <Divider />
          <Button type="primary" size="large" onClick={saveJiraOrganizationName}>
            Save
          </Button>
        </section>
      </div>
    </OptionView>
  );
}
