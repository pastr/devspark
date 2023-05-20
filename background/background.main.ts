import browser from "webextension-polyfill";
import "./github/highlightPrs";
import "./github/ticketToLinks";
import "./github/loadAllDiffs";
import "./github/openAllComments";
import "./github/openAllCommentsAndLoadmore";

browser.runtime.onMessage.addListener((msg) => {
  console.log("message received from content script: ", msg);
});
