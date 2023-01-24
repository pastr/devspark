import { createSignal } from "solid-js";
import browser from "webextension-polyfill";
import { ColumnCheckboxNode } from "./ColumnCheckbox";
import { ColumnTitleNode } from "./ColumnTitle";

const observer = new MutationObserver(function(_mutations) {
  const colTitle = document.querySelector("[data-eqx-col-title]");
  const pathname = window.location.pathname;
  if (!colTitle && pathname === "/evooq/benzene/pulls") {
    AddCheckboxesElements();
  }
});
observer.observe(document, { childList: true, subtree: true });


// TODO: Add types, and use organization name + repo name to store the issues id
export const [reviewedPrs, setReviewedPrs] = createSignal<any>({});


export async function AddCheckboxesElements() {
  const titleRowParent = document.querySelector(".table-list-filters");
  titleRowParent?.appendChild(ColumnTitleNode());

  await initReviewdPullrequestStorage();

  const prLines = document.querySelectorAll("div[id^=issue_]");
  prLines.forEach((prLine) => {
    const lastSectionOfPrLine = prLine.querySelector("div:nth-of-type(3)");
    const prCheckbox = prLine.querySelector("[data-eqx-checkbox]");
    if (prCheckbox) {
      // There is an edge case when the user navigate back to the page (back arrow) the checkbox are visible but not responsive
      // To fix this issue its possible to replace the checkbox by a new one with working reactivity
      prCheckbox.replaceWith(ColumnCheckboxNode(prLine.id));
    } else {
      lastSectionOfPrLine?.appendChild(ColumnCheckboxNode(prLine.id));
    }
  });
}

async function initReviewdPullrequestStorage() {
  const storageResponse = await browser.storage.local.get("reviewedPrs");
  if (storageResponse.reviewedPrs) {
    setReviewedPrs(storageResponse.reviewedPrs);
  } else {
    browser.storage.local.set({ reviewedPrs: {} });
  }
}

