import { addCopyFileNameButtonToFilesComments } from "./scripts/add-copy-filename-button";
import { addResizePropertyToSidebar } from "./scripts/resize-sidebar";
import { GithubPages, LocationService } from "../../../../_shared/services/location.service";

export function runScriptsForFilesPage() {
  if (LocationService.isCorrectPage(GithubPages.PullFiles)) {
    addResizePropertyToSidebar();
    addCopyFileNameButtonToFilesComments();
  }
}
