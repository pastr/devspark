import set from "lodash.set";
import * as browser from "webextension-polyfill";

import { GithubResourcesService } from "../../../services/github-resources.service";
let isListenersAdded = false;

async function setCurrentPrToReviewed() {
  // browser.storage.local.clear();
  const { reviewedPrs } = await browser.storage.local.get("reviewedPrs");
  console.log("🚀 ~ file: on-submit-review.ts:10 ~ setCurrentPrToReviewed ~ reviewedPrs:", reviewedPrs);
  const repository = GithubResourcesService.getRepository();
  const organization = GithubResourcesService.getOrganization();
  const issueId = GithubResourcesService.getIssueId();
  GithubResourcesService.getOrganization();

  set(reviewedPrs, [organization, repository, `issue_${issueId}`], true);
  await browser.storage.local.set({ reviewedPrs: reviewedPrs });
}

function onSubmitReview(event: Event) {
  const formEl = event.target as HTMLFormElement;
  // get the form values
  const formData = new FormData(formEl);
  const formGithubEvent = formData.get("pull_request_review[event]") as "comment" | "approve" | "reject";

  if (formGithubEvent === "approve") {
    setCurrentPrToReviewed();
  }
}

export function submitReview() {
  const submitForm = document.querySelector<HTMLFormElement>("#pull_requests_submit_review");
  if (!submitForm) return;

  if (isListenersAdded) {
    submitForm.removeEventListener("submit", onSubmitReview);
  }

  isListenersAdded = true;
  submitForm.addEventListener("submit", onSubmitReview);
}
