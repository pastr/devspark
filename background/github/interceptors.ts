import browser from "webextension-polyfill";

browser.webRequest.onCompleted.addListener(
  async (req) => {
    if (req.url === "https://github.com/pull_request_review_decisions") {
      browser.tabs.sendMessage(req.tabId, { url: req.url });
    }
  },
  { urls: ["https://github.com/*"] }
);
