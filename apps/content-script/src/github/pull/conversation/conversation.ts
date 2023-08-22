import * as browser from "webextension-polyfill";

import { GithubPages, LocationService } from "@devspark/services/location";
import { GITHUB_OBSERVED_URLS } from "@devspark/types/enums/GITHUB_OBSERVED_URLS";
import { IMessage } from "@devspark/types/interfaces/IMessage";

import { runScriptOnRequests } from "../../../helpers/run-script-on-request";
import { convertPrTitleToJiraLink } from "../../_shared/pr-title-to-jira-link";

import { addCopyFileNameButtonToConversationComments } from "./scripts/add-copy-filename-button";
import { addDevsparkSectionToConversationPage } from "./scripts/add-devspark-section";
import { addOpenAllCommentsButton } from "./scripts/open-all-comments";
import { addOpenAllCommentsAndLoadMoreButton } from "./scripts/open-all-comments-and-load-more";

browser.runtime.onMessage.addListener(
  function(message: IMessage) {
    runScriptOnRequests(message, runScriptsForConversationPage, [GITHUB_OBSERVED_URLS.ShowPartial, GITHUB_OBSERVED_URLS.SuggestedReviewers, GITHUB_OBSERVED_URLS.openWithMenu]);
  }
);

export function runScriptsForConversationPage(): void {
  if (LocationService.isCorrectPage(GithubPages.PullConversation)) {
    addDevsparkSectionToConversationPage();
    addCopyFileNameButtonToConversationComments();
    convertPrTitleToJiraLink();
    addOpenAllCommentsButton();
    addOpenAllCommentsAndLoadMoreButton();
  }
}
