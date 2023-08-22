import { MutableRefObject, useEffect, useRef, useState } from "react";
import { ESupportedApps } from "@devspark/types/enums/ESupportedApps";
import { useOptions } from "@devspark/context/options";
import { useFocus } from "@devspark/hooks/useFocus";
import set from "lodash.set";
import OptionView from "../_shared/components/OptionView";
import browser from "webextension-polyfill"
import { Button, Col, Divider, Input, message, Row } from "antd";

export default function OptionDevelopment() {
  const [messageApi, contextHolder] = message.useMessage();
  const [jiraOrganizationName, setJiraOrganizationName] = useState("");
  const organizationInputRef: MutableRefObject<any> = useRef(null);
  const [options, setOptions] = useOptions();

  function clearStorage() {
    browser.storage.sync.clear();
    window.location.reload();
  }

  return (
    <OptionView title={"Development"}>
      <div className="">
      <Button onClick={clearStorage}>Clear storage</Button>
      </div>
    </OptionView>
  );
}
