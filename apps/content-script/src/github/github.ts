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

