import { addCopyFileNameButtonToFilesComments } from "./scripts/add-copy-filename-button";
import { addResizePropertyToSidebar } from "./scripts/resize-sidebar";
import { GithubPages, LocationService } from "../../../../_shared/services/location.service";
import { convertPrTitleToJiraLink } from "../../_shared/pr-title-to-jira-link";
import { loadAllDifss } from "./scripts/load-all-diffs";

export function runScriptsForFilesPage() {
  if (LocationService.isCorrectPage(GithubPages.PullFiles)) {
    addResizePropertyToSidebar();
    addCopyFileNameButtonToFilesComments();
    convertPrTitleToJiraLink();
    loadAllDifss();
  }
}
