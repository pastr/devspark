import browser from "webextension-polyfill";
import { GithubPages, LocationService } from "../../../../_shared/services/location.service";
import { convertPrTitleToJiraLink } from "../../_shared/pr-title-to-jira-link";
import { addCopyFileNameButtonToConversationComments } from "./scripts/add-copy-filename-button";
import { addDevsparkSectionToConversationPage } from "./scripts/add-devspark-section";
import { addOpenAllCommentsButton } from "./scripts/open-all-comments";
import { addOpenAllCommentsAndLoadMoreButton } from "./scripts/open-all-comments-and-load-more";
import { GITHUB_OBSERVED_URLS } from "../../../../_shared/enums/GITHUB_OBSERVED_URLS";
import { IMessage } from "../../../../_shared/types/IMessage";

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
