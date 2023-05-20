import { GithubPages, LocationService } from "../../../_shared/services/location.service";
import { AddCheckboxesElements } from "./scripts/reviewed-checkboxes/reviewed-checkboxes";

export function runScriptsForPullsPage() {
  if (LocationService.isCorrectPage(GithubPages.Pulls)) {
    AddCheckboxesElements();
  }
}
