import { createSignal } from "solid-js";
import browser from "webextension-polyfill";
import { ColumnCheckbox } from "./ColumnCheckbox";
import { ColumnTitle } from "./ColumnTitle";
import { LocationService } from "../../../../../_shared/services/location.service";

type TReviewedPrStorage = {
  [organization: string]: {
    [repository: string]: {
      [issueId: string]: boolean;
    }
  }
}


// TODO: At some point remove the old PR from the storage
export const [reviewedPrs, setReviewedPrs] = createSignal<TReviewedPrStorage>({});

export async function AddCheckboxesElements() {
  const url = LocationService.getCurrentURL();
  const [_ignore, organization, repository] = url.pathname.split("/");
  const prLines = document.querySelectorAll("div[id^=issue_]");
  const colTitle = document.querySelector("[data-eqx-col-title]");

  if (prLines.length > 0) {
    await initReviewedPullrequestStorage(organization, repository);
    if (!colTitle) {
      const titleRowParent = document.querySelector(".table-list-filters");
      titleRowParent?.appendChild(<ColumnTitle /> as Node);
    }

    prLines.forEach((prLine) => {
      const lastSectionOfPrLine = prLine.querySelector("div:nth-of-type(3)");
      const shadowRootEl = document.createElement("div");
      shadowRootEl.classList.add("ml-4", "mt-1");
      shadowRootEl.attachShadow({ mode: "open" });
      shadowRootEl.shadowRoot?.appendChild(<ColumnCheckbox organization={organization} repository={repository} issueId={prLine.id} /> as Node);

      lastSectionOfPrLine?.appendChild(shadowRootEl);
    });
  }
}

async function initReviewedPullrequestStorage(organization: string, repository: string) {
  const storageResponse = await browser.storage.local.get("reviewedPrs");
  if (storageResponse.reviewedPrs) {
    setReviewedPrs(storageResponse.reviewedPrs);
  } else {
    browser.storage.local.set({ reviewedPrs: { [organization]: { [repository]: {} } } });
  }
}

