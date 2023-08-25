import { Button, Col, Divider, Input, message, Row } from "antd";
import set from "lodash.set";
import { MutableRefObject, useEffect, useRef, useState } from "react";

import { useOptions } from "@devspark/context/options";
import { ESupportedApps } from "@devspark/types/enums/ESupportedApps";

import OptionView from "../_shared/components/OptionView";


export default function OptionCardJira() {
  const [messageApi, contextHolder] = message.useMessage();
  const [jiraOrganizationName, setJiraOrganizationName] = useState("");
  const organizationInputRef: MutableRefObject<any> = useRef(null);
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
    organizationInputRef.current.blur();

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
                       ref={organizationInputRef}
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
          <Button type="primary" size="large" onClick={saveJiraOrganizationName} disabled={jiraOrganizationName === options.jira?.organizationName}>
            Save
          </Button>
        </section>
      </div>
    </OptionView>
  );
}
