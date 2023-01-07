import { useEffect, useState } from "react";
import browser from "webextension-polyfill";
import PopupSectionGithub from "./components/PopupSectionGithub";
import PopupSectionJira from "./components/PopupSectionJira";
import { OptionsProvider } from "../common/context/options.context";

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
        <PopupSectionGithub />
      </div>
    </OptionsProvider>
  );
}

export default Popup;
