import browser from "webextension-polyfill";
import { EGithubObservedURLs } from "../../_shared/enums/EGithubObservedURLs";
import { IMessage } from "../../_shared/types/IMessage";

browser.webRequest.onCompleted.addListener(
  async (req) => {
    if (req.url === EGithubObservedURLs.PullRequestReviewDecisions) {
      const message: IMessage = {
        eventType: "WebRequestCompleted",
        eventDetails: {
          url: EGithubObservedURLs.PullRequestReviewDecisions
        }
      };

      browser.tabs.sendMessage(req.tabId, message);
    }
  },
  { urls: ["https://github.com/*"] }
);
