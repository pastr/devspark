import browser from "webextension-polyfill";
import { IMessage } from "../../_shared/types/IMessage";
import { GITHUB_OBSERVED_URLS } from "../../_shared/enums/GITHUB_OBSERVED_URLS";

browser.webRequest.onCompleted.addListener(
  async (req) => {
    if (GITHUB_OBSERVED_URLS.PullRequestReviewDecisions.test(req.url)) {
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
