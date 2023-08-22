import { useEffect, useState } from "react";
import browser from "webextension-polyfill";
import PopupSectionJira from "./src/jira/PopupSectionJira";
import { OptionsProvider } from "@devspark/context/options";

function Popup() {
  const [_msg, setMsg] = useState("");

  useEffect(() => {
    browser.runtime.onMessage.addListener((msg) => {
      console.log("message received from content script: ", msg);
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
