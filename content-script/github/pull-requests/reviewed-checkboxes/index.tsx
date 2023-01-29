import { createSignal } from "solid-js";
import browser from "webextension-polyfill";
import { ColumnCheckbox } from "./ColumnCheckbox";
import { ColumnTitle } from "./ColumnTitle";

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
  if (event.detail.url.includes("/pull")) {
    const prCheckbox = document.querySelector("[data-eqx-checkbox]");
    if (!prCheckbox) {
      AddCheckboxesElements();
    }
  }
}

// Custom Event dispatched by GitHub's code when the turbo frame is loaded
window.addEventListener("turbo:load", onTurboLoad);

// TODO: Add types, and use organization name + repo name to store the issues id
// TODO: At some point remove the old PR from the storage
export const [reviewedPrs, setReviewedPrs] = createSignal<any>({});


export async function AddCheckboxesElements() {
  const colTitle = document.querySelector("[data-eqx-col-title]");
  const prLines = document.querySelectorAll("div[id^=issue_]");

  if (prLines.length > 0) {
    await initReviewedPullrequestStorage();
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
        shadowRootEl.shadowRoot?.appendChild(<ColumnCheckbox issue_id={prLine.id} /> as Node);

        lastSectionOfPrLine?.appendChild(shadowRootEl);
      }
    });
  }
}

async function initReviewedPullrequestStorage() {
  const storageResponse = await browser.storage.local.get("reviewedPrs");
  if (storageResponse.reviewedPrs) {
    setReviewedPrs(storageResponse.reviewedPrs);
  } else {
    browser.storage.local.set({ reviewedPrs: {} });
  }
}

