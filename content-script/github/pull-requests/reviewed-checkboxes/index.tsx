import { createSignal } from "solid-js";
import browser from "webextension-polyfill";
import { ColumnCheckbox } from "./ColumnCheckbox";
import { ColumnTitle } from "./ColumnTitle";
import difference from "lodash.difference";

type TReviewedPrStorage = {
  [organization: string]: {
    [repository: string]: {
      [issueId: string]: boolean;
    }
  }
}

type TTurboLoadEventDetail = {
  url: string;
};

function onTurboLoad(event: CustomEvent<TTurboLoadEventDetail>) {
  const url = new URL(event.detail.url);
  if (url.pathname.includes("/pull")) {
    const prCheckbox = document.querySelector("[data-eqx-checkbox]");
    if (!prCheckbox) {
      AddCheckboxesElements(url);
    }
  }
}

// Custom Event dispatched by GitHub's code when the turbo frame is loaded
window.addEventListener("turbo:load", onTurboLoad);

// TODO: At some point remove the old PR from the storage
export const [reviewedPrs, setReviewedPrs] = createSignal<TReviewedPrStorage>({});

export async function AddCheckboxesElements(url: URL) {
  const [_ignore, organization, repository] = url.pathname.split("/");
  const search = url.search;
  const prLines = document.querySelectorAll("div[id^=issue_]");
  const colTitle = document.querySelector("[data-eqx-col-title]");

  if (prLines.length > 0) {
    const allIssuesIds = Array.from(prLines).map((prLine) => prLine.id);
    await initReviewedPullrequestStorage(organization, repository, allIssuesIds, search);
    if (!colTitle) {
      const titleRowParent = document.querySelector(".table-list-filters");
      titleRowParent?.appendChild(<ColumnTitle /> as Node);
    }

    prLines.forEach((prLine) => {
      const lastSectionOfPrLine = prLine.querySelector("div:nth-of-type(3)");
      const prCheckbox = prLine.querySelector("[data-eqx-checkbox]");
      if (!prCheckbox) {
        const shadowRootEl = document.createElement("div");
        shadowRootEl.classList.add("ml-4", "mt-1");
        shadowRootEl.attachShadow({ mode: "open" });
        shadowRootEl.shadowRoot?.appendChild(<ColumnCheckbox organization={organization} repository={repository} issueId={prLine.id} /> as Node);

        lastSectionOfPrLine?.appendChild(shadowRootEl);
      }
    });
  }
}

async function initReviewedPullrequestStorage(organization: string, repository: string, allIssuesIds: string[], search: string) {
  const storageResponse = await browser.storage.local.get("reviewedPrs");
  if (storageResponse.reviewedPrs) {
    setReviewedPrs(storageResponse.reviewedPrs);

    // Maybe instead of delete I could just create a new object everytime set the value for all the issues (using the one setter and set the others to false)
    // To update and try later on
    // if (!search && storageResponse.reviewedPrs[organization][repository]) {
    //   const allSavedIssuesIds = Object.keys(storageResponse.reviewedPrs[organization][repository]);
    //   allSavedIssuesIds.push("issue_1");
    //   const issuesToRemove = difference(allSavedIssuesIds, allIssuesIds);
    //   issuesToRemove.forEach((issue: string) => {
    //     delete storageResponse.reviewedPrs[organization][repository][issue];
    //   });
    // }
  } else {
    browser.storage.local.set({ reviewedPrs:{ [organization]: { [repository]: {} } } });
  }
}

