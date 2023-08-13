import * as browser from "webextension-polyfill";

import { IMessage } from "@devspark/types/interfaces/IMessage";

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
