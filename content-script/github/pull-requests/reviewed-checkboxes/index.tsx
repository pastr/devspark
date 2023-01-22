import { createSignal } from "solid-js";
import browser from "webextension-polyfill";
import { ColumnCheckboxNode } from "./ColumnCheckbox";
import { ColumnTitleNode } from "./ColumnTitle";

// TODO: Fix issue when using back/forward button
const tabContent = document.querySelector("#repo-content-turbo-frame");
if (tabContent) {
  AddCheckboxesElements();

  const observer = new MutationObserver(function(_mutations) {
    console.log("HERE FIRST");
    // console.log("🚀 ~ observer ~ _mutations", _mutations);
    const colTitle = document.querySelector("#eqx-col-title");
    if (!colTitle) {
      AddCheckboxesElements();
    }
  });
  observer.observe(tabContent, { childList: true });
}


// TODO: Add types, and use organization name + repo name to store the issues id
export const [reviewedPrs, setReviewedPrs] = createSignal<any>({});


export async function AddCheckboxesElements() {
  const titleRowParent = document.querySelector(".table-list-filters");
  titleRowParent?.appendChild(ColumnTitleNode());

  await initReviewdPullrequestStorage();

  const prLines = document.querySelectorAll("div[id^=issue_]");
  prLines.forEach((prLine) => {
    const lastSectionOfPrLine = prLine.querySelector("div:nth-of-type(3)");
    lastSectionOfPrLine?.appendChild(ColumnCheckboxNode(prLine.id));
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

