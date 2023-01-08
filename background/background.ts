import browser from "webextension-polyfill";
import "./github/highlightPrs";
import "./github/ticketToLinks";

browser.runtime.onMessage.addListener((msg) => {
  console.log("message received from content script: ", msg);
});
