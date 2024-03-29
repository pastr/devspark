import * as browser from "webextension-polyfill";

import { IMessage, IMessageOpenOptionsPage } from "@devspark/types/interfaces/IMessage";

browser.webRequest.onCompleted.addListener(
  async (req) => {
    const message: IMessage = {
      eventType: "WebRequestCompleted",
      eventDetails: {
        url: req.url
      }
    };

    browser.tabs.sendMessage(req.tabId, message);
  },
  { urls: ["https://github.com/*"] }
);

// TODO: The communication via message between the different parts of the extension should be improved
browser.runtime.onMessage.addListener(
  function(message: IMessageOpenOptionsPage) {
    if (message.eventType === "OpenOptionsPage") {
      const optionsUrl = browser.runtime.getURL("options.html");
      browser.tabs.create({ "url": `${optionsUrl}#${message.path}` });
    }
  }
);
