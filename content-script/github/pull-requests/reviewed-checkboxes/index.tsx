import { createSignal } from "solid-js";
import browser from "webextension-polyfill";
import { ColumnCheckbox } from "./ColumnCheckbox";
import { ColumnTitle } from "./ColumnTitle";

let forceReplaceCheckbox = true;
window.addEventListener("popstate", () => {
  forceReplaceCheckbox = true;
});

const observer = new MutationObserver(function(_mutations) {
  const colTitle = document.querySelector("[data-eqx-col-title]");
  const pathname = window.location.pathname;
  if (!colTitle && pathname.includes("/pulls") || forceReplaceCheckbox) {
    AddCheckboxesElements();
  }
});
observer.observe(document, { childList: true, subtree: true });


// TODO: Add types, and use organization name + repo name to store the issues id
// TODO: At some point remove the old PR from the storage
export const [reviewedPrs, setReviewedPrs] = createSignal<any>({});


// This is required because AddCheckboxesElements was running multiple times before the appendchild(ColumnTitleNode()) action was finished
let currentlyAddingColTitle = false;
export async function AddCheckboxesElements() {
  const colTitle = document.querySelector("[data-eqx-col-title]");
  const prLines = document.querySelectorAll("div[id^=issue_]");

  if (prLines.length > 0) {
    await initReviewedPullrequestStorage();
    forceReplaceCheckbox = false;
    if (!colTitle && !currentlyAddingColTitle) {
      currentlyAddingColTitle = true;
      const titleRowParent = document.querySelector(".table-list-filters");
      titleRowParent?.appendChild(<ColumnTitle /> as Node);
    }
  }


  prLines.forEach((prLine) => {
    const lastSectionOfPrLine = prLine.querySelector("div:nth-of-type(3)");
    const prCheckbox = prLine.querySelector("[data-eqx-checkbox]");
    if (prCheckbox) {
      // There is an edge case when the user navigate back to the page (back arrow) the checkbox are visible but not responsive
      // To fix this issue its possible to replace the checkbox by a new one with working reactivity
      prCheckbox.replaceWith(<ColumnCheckbox issue_id={prLine.id} /> as Node);
    } else {
      lastSectionOfPrLine?.appendChild(<ColumnCheckbox issue_id={prLine.id} /> as Node);
    }
  });
}

async function initReviewedPullrequestStorage() {
  const storageResponse = await browser.storage.local.get("reviewedPrs");
  if (storageResponse.reviewedPrs) {
    setReviewedPrs(storageResponse.reviewedPrs);
  } else {
    browser.storage.local.set({ reviewedPrs: {} });
  }
}

