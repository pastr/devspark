import { addCopyFileNameButtonToFilesComments } from "./scripts/copy-filename/add-copy-filename-button";
import { addResizePropertyToSidebar } from "./scripts/resize-sidebar/resize-sidebar";
import { GithubPages, LocationService } from "../../../../_shared/services/location.service";

export function runScriptsForFilesPage() {
  console.log("on all pages");
  if (LocationService.isCorrectPage(GithubPages.PullFiles)) {
    console.log("on page files");

    addResizePropertyToSidebar();
    addCopyFileNameButtonToFilesComments();
  }
}
