import { GITHUB_OBSERVED_URLS } from "./../../../../_shared/enums/GITHUB_OBSERVED_URLS";
import { IMessage } from "./../../../../_shared/types/IMessage";
import { IOptionsContextState } from "../../../../_shared/types/IOptionsState";

import browser from "webextension-polyfill";

browser.runtime.onMessage.addListener(
  function(message: IMessage) {
    if (message.eventType === "WebRequestCompleted" && GITHUB_OBSERVED_URLS.PullRequestReviewDecisions.test(message.eventDetails.url)) {
      highlightPrStatusWithDelay();
    }
  }
);


export function highlightPrStatusWithDelay() {
  setTimeout(() => {
    // It has to be slifghtly delayed because it takes a few milisecond for github to add the response into the DOM
    // If we don't add the delay prsStatuses will be empty
    const prsStatuses = document.querySelectorAll<HTMLElement>(".js-navigation-item .d-none a.Link--muted");
    const approved = "Approved";
    const draft = "Draft";
    const reviewRequired = "Review required";
    const changesRequested = "Changes requested";

    prsStatuses.forEach((prStatus) => {
      prStatus.style.setProperty("font-weight", "bold", "important");
      if (prStatus.innerHTML.includes(approved)) {
        prStatus.style.setProperty("color", "var(--color-checks-donut-success)", "important");
      }
      if (prStatus.innerHTML.includes(draft)) {
        prStatus.style.setProperty("color", "var(--color-checks-step-warning-text)", "important");
      }
      if (prStatus.innerHTML.includes(reviewRequired)) {
        prStatus.style.setProperty("color", "var(--color-checks-donut-error)", "important");
      }
      if (prStatus.innerHTML.includes(changesRequested)) {
        prStatus.style.setProperty("color", "var(--color-checks-donut-error)", "important");
      }
    });
  }, 300);
}

export function highlightPr() {
  function highlightOwnPr() {
    const prsOpenedBy = document.querySelectorAll<HTMLElement>(".js-navigation-item .opened-by");
    const userLoginElement = document.querySelector<HTMLMetaElement>("[name=user-login]");
    const userLogin = userLoginElement!.content;
    prsOpenedBy.forEach((pr) => {
      if (pr.innerHTML.includes(userLogin)) {
        const ownerPr = pr.parentElement?.parentElement?.firstElementChild as HTMLElement;
        ownerPr.dataset.eqxOwnPr = "true";
        ownerPr.style.setProperty("color", "var(--color-accent-fg)", "important");
      }
    });
  }

  function highlightPrOwner() {
    // TODO: Generate custom colors depending of github username
    const prsOwners = document.querySelectorAll<HTMLElement>(".js-navigation-item .opened-by a.Link--muted");
    prsOwners.forEach((prOwner) => {
      prOwner.style.setProperty("font-weight", "bold", "important");
      prOwner.style.setProperty("color", "var(--color-accent-emphasis)", "important");
    });
  }

  async function deemphasizedUnwantedPr() {
    const storage = await browser.storage.sync.get("options");
    const options = storage.options as IOptionsContextState;
    const prs = document.querySelectorAll<HTMLElement>("[id^=issue_] [id*=link]");
    const deemphasizePrs = options?.options?.github?.deemphasizeTextList;

    if (!deemphasizePrs) return;

    prs.forEach((pr) => {
      const prTitle = pr.textContent;
      // bad..
      deemphasizePrs.forEach((savedText) => {
        if (prTitle?.includes(savedText)) {
          pr.dataset.eqxDeemphasizedPr = "true";
          pr.style.setProperty("color", "var(--color-workflow-card-connector-inactive)", "important");
          // pr.classList.remove("Link--primary");
        }
      });
    });
  }


  highlightOwnPr();
  highlightPrOwner();
  deemphasizedUnwantedPr();
}
