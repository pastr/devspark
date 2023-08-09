import browser from "webextension-polyfill";
import { runScriptsForConversationPage } from "./pull/conversation/conversation";
import { runScriptsForFilesPage } from "./pull/files/files";
import { runScriptsForPullsPage } from "./pulls/pulls";



function onTurboLoad() {
  runScriptsForPullsPage();
  runScriptsForConversationPage();
  runScriptsForFilesPage();
}

// Custom Event dispatched by GitHub's code when the turbo frame is loaded
window.addEventListener("turbo:load", onTurboLoad);

async function getOptions() {
  const storage = await browser.storage.sync.get();
  console.log("🚀 ~ file: github.ts:17 ~ storage:", storage);
}


getOptions();
