import * as browser from "webextension-polyfill";

import { GithubPages, LocationService } from "@devspark/services/location";
import { GITHUB_OBSERVED_URLS } from "@devspark/types/enums/GITHUB_OBSERVED_URLS";
import { IMessage } from "@devspark/types/interfaces/IMessage";
import { IOptionsContextState } from "@devspark/types/interfaces/IOptionsState";

import { conditionallyRunScript } from "../../../helpers/contionallyRunScript";
import { runScriptOnRequests } from "../../../helpers/run-script-on-request";
import { convertPrTitleToJiraLink } from "../../_shared/pr-title-to-jira-link";
import { OptionsService } from "../../services/options.service";
import { replaceMdImageSetup } from "../_shared/replace-md-image";

import { addCopyFileNameButtonToConversationComments } from "./scripts/add-copy-filename-button";
import { addDevsparkSectionToConversationPage } from "./scripts/add-devspark-section";
import { addReviewersButton } from "./scripts/add-reviewers";
import { addOpenAllCommentsButton } from "./scripts/open-all-comments";
import { addOpenAllCommentsAndLoadMoreButton } from "./scripts/open-all-comments-and-load-more";

browser.runtime.onMessage.addListener(
  function(message: IMessage) {
    runScriptOnRequests(message, runScriptsForConversationPage, [GITHUB_OBSERVED_URLS.ShowPartial, GITHUB_OBSERVED_URLS.SuggestedReviewers, GITHUB_OBSERVED_URLS.openWithMenu]);
  }
);

export async function runScriptsForConversationPage() {
  const options = await OptionsService.getSyncOptions();

  if (LocationService.isCorrectPage(GithubPages.PullConversation)) {
    addDevsparkSectionToConversationPage();
    addCopyFileNameButtonToConversationComments();
    convertPrTitleToJiraLink();
    addOpenAllCommentsButton();
    addOpenAllCommentsAndLoadMoreButton();
    addReviewersButton();

    conditionallyRunScript(options.github.generalOptions.mdImage, replaceMdImageSetup);
  }
}
