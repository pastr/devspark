import { GithubPages, LocationService } from "@devspark/services/location";

import { conditionallyRunScript } from "../../../helpers/contionallyRunScript";
import { convertPrTitleToJiraLink } from "../../_shared/pr-title-to-jira-link";
import { OptionsService } from "../../services/options.service";
import { replaceMdImageSetup } from "../_shared/replace-md-image";

import { addCopyFileNameButtonToFilesComments } from "./scripts/add-copy-filename-button";
import { addNoWrapForDiffButton } from "./scripts/diff-no-wrap";
import { loadAllDifss } from "./scripts/load-all-diffs";
import { submitReview } from "./scripts/on-submit-review";
import { addResizePropertyToSidebar } from "./scripts/resize-sidebar";

export async function runScriptsForFilesPage() {
  const options = await OptionsService.getSyncOptions();

  if (LocationService.isCorrectPage(GithubPages.PullFiles)) {
    addResizePropertyToSidebar();
    addCopyFileNameButtonToFilesComments();
    convertPrTitleToJiraLink();
    addNoWrapForDiffButton();
    loadAllDifss();
    submitReview();

    conditionallyRunScript(options.github.generalOptions.mdImage, replaceMdImageSetup);
  }
}


