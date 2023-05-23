import { GithubPages, LocationService } from "../../../../_shared/services/location.service";
import { convertPrTitleToJiraLink } from "../../_shared/pr-title-to-jira-link";
import { addCopyFileNameButtonToConversationComments } from "./scripts/add-copy-filename-button";
import { addDevsparkSectionToConversationPage } from "./scripts/add-devspark-section";
import { addOpenAllCommentsButton } from "./scripts/open-all-comments";
import { addOpenAllCommentsAndLoadMoreButton } from "./scripts/open-all-comments-and-load-more";

export function runScriptsForConversationPage() {
  if (LocationService.isCorrectPage(GithubPages.PullConversation)) {
    addDevsparkSectionToConversationPage();
    addCopyFileNameButtonToConversationComments();
    convertPrTitleToJiraLink();
    addOpenAllCommentsButton();
    addOpenAllCommentsAndLoadMoreButton();
  }
}
