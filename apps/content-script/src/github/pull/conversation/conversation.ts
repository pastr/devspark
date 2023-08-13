import { addCopyFileNameButtonToConversationComments } from "./scripts/add-copy-filename-button";
import { addDevsparkSectionToConversationPage } from "./scripts/add-devspark-section";
import { addOpenAllCommentsButton } from "./scripts/open-all-comments";
import { addOpenAllCommentsAndLoadMoreButton } from "./scripts/open-all-comments-and-load-more";
import { convertPrTitleToJiraLink } from "../../_shared/pr-title-to-jira-link";
import { GithubPages, LocationService } from "@devspark/services/location";
import * as browser from "webextension-polyfill";
import { GITHUB_OBSERVED_URLS } from "@devspark/types/enums/GITHUB_OBSERVED_URLS";
import { IMessage } from "@devspark/types/interfaces/IMessage";

browser.runtime.onMessage.addListener(
  function(message: IMessage) {
    if (message.eventType === "WebRequestCompleted" && GITHUB_OBSERVED_URLS.ShowPartial.test(message.eventDetails.url)) {
      runScriptsForConversationPage();
    }
  }
);

export function runScriptsForConversationPage() {
  if (LocationService.isCorrectPage(GithubPages.PullConversation)) {
    addDevsparkSectionToConversationPage();
    addCopyFileNameButtonToConversationComments();
    convertPrTitleToJiraLink();
    addOpenAllCommentsButton();
    addOpenAllCommentsAndLoadMoreButton();
  }
}
