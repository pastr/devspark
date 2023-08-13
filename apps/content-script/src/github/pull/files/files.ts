import { addCopyFileNameButtonToFilesComments } from "./scripts/add-copy-filename-button";
import { addResizePropertyToSidebar } from "./scripts/resize-sidebar";
import { loadAllDifss } from "./scripts/load-all-diffs";
import { addNoWrapForDiffButton } from "./scripts/diff-no-wrap";
import { convertPrTitleToJiraLink } from "../../_shared/pr-title-to-jira-link";
import { GithubPages, LocationService } from "@devspark/services/location";

export function runScriptsForFilesPage() {
  if (LocationService.isCorrectPage(GithubPages.PullFiles)) {
    addResizePropertyToSidebar();
    addCopyFileNameButtonToFilesComments();
    convertPrTitleToJiraLink();
    addNoWrapForDiffButton();
    loadAllDifss();
  }
}
