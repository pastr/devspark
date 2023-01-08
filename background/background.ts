import browser from "webextension-polyfill";
import "./highlight-pr-in-list";

browser.runtime.onMessage.addListener((msg) => {
  console.log("message received from content script: ", msg);
});
