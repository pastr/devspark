import * as browser from "webextension-polyfill";

import { GITHUB_OBSERVED_URLS } from "@devspark/types/enums/GITHUB_OBSERVED_URLS";
import { IMessage } from "@devspark/types/interfaces/IMessage";

browser.webRequest.onCompleted.addListener(
  async (req) => {
    if (GITHUB_OBSERVED_URLS.PullRequestReviewDecisions.test(req.url) ||
        GITHUB_OBSERVED_URLS.ShowPartial.test(req.url) ||
        GITHUB_OBSERVED_URLS.SuggestedReviewers.test(req.url)) {

      const message: IMessage = {
        eventType: "WebRequestCompleted",
        eventDetails: {
          url: req.url
        }
      };

      browser.tabs.sendMessage(req.tabId, message);
    }
  },
  { urls: ["https://github.com/*"] }
);
