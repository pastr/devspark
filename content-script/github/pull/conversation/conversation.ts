import { GithubPages, LocationService } from "../../../../_shared/services/location.service";
import { addCopyFileNameButtonToConversationComments } from "./scripts/add-copy-filename-button";
import { addDevsparkSectionToConversationPage } from "./scripts/add-devspark-section";


export function runScriptsForConversationPage() {
  if (LocationService.isCorrectPage(GithubPages.PullConversation)) {
    addCopyFileNameButtonToConversationComments();
    addDevsparkSectionToConversationPage();
  }
}
