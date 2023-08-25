import { useEffect, useState } from "react";
import * as browser from "webextension-polyfill";

import { OptionsProvider } from "@devspark/context/options";

import PopupSectionJira from "./src/jira/PopupSectionJira";

function Popup() {
  const [_msg, setMsg] = useState("");

  useEffect(() => {
    browser.runtime.onMessage.addListener((msg) => {
      setMsg(msg.action);
    });
  }, []);

  return (
    <OptionsProvider>
      <div className="w-64 p-4 pt-2 flex flex-col">
        <PopupSectionJira />
      </div>
    </OptionsProvider>
  );
}

export default Popup;
