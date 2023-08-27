import * as browser from "webextension-polyfill";

import { GITHUB_OBSERVED_URLS } from "@devspark/types/enums/GITHUB_OBSERVED_URLS";
import { IMessage } from "@devspark/types/interfaces/IMessage";
import { IOptionsContextState } from "@devspark/types/interfaces/IOptionsState";

import { runScriptOnRequests } from "../../../helpers/run-script-on-request";


browser.runtime.onMessage.addListener((message: IMessage) =>
  runScriptOnRequests(message, highlightPrStatusWithDelay, [GITHUB_OBSERVED_URLS.PullRequestReviewDecisions])
);

const STATUS_COLORS = new Map<string, string>([
  ["Approved", "var(--color-checks-donut-success)"],
  ["Draft", "var(--color-checks-step-warning-text)"],
  ["Review required", "var(--color-checks-donut-error)"],
  ["Changes requested", "var(--color-checks-donut-error)"]
]);

export function highlightPrStatusWithDelay() {
  setTimeout(() => {
    const prsStatuses = document.querySelectorAll<HTMLElement>(".js-navigation-item .d-none a.Link--muted");
    prsStatuses.forEach((prStatus) => {
      prStatus.style.setProperty("font-weight", "bold", "important");

      for (const [status, color] of STATUS_COLORS.entries()) {
        if (prStatus.innerHTML.includes(status)) {
          prStatus.style.setProperty("color", color, "important");
          break;
        }
      }
    });
  }, 300);
}

export async function highlightPr() {
  const storage = await browser.storage.sync.get("options");
  const options = storage.options as IOptionsContextState;
  if (!options.github?.prColors) return;

  const ownPrs = options.github.prColors.filter((pr) => pr.type === "ownPr");
  const titlePrs = options.github.prColors.filter((pr) => pr.type === "titlePr");
  const userPrs = options.github.prColors.filter((pr) => pr.type === "userPr");


  function highlightOwnPr() {
    if (!ownPrs.length) return;

    const prsOpenedBy = document.querySelectorAll<HTMLElement>(".js-navigation-item .opened-by a");
    const currentUsernameElement = document.querySelector<HTMLMetaElement>("[name=user-login]");
    const currentUsername = currentUsernameElement!.content;
    const colorOwnPr = ownPrs[ownPrs.length - 1].color;

    prsOpenedBy.forEach((prOpenedBy) => {
      const prTitle = prOpenedBy.parentElement?.parentElement?.parentElement?.firstElementChild as HTMLElement;
      if (prOpenedBy.title.includes(currentUsername)) {
        prTitle.dataset.dvsOwnPr = "true";
        prTitle.style.setProperty("color", colorOwnPr, "important");
      }
    });
  }

  function highlightPrsOwner() {
    const prsOwners = document.querySelectorAll<HTMLElement>(".js-navigation-item .opened-by a.Link--muted");
    prsOwners.forEach((prOwner) => {
      prOwner.style.setProperty("font-weight", "bold", "important");
      prOwner.style.setProperty("color", "var(--color-accent-emphasis)", "important");
    });
  }

  function colorizePrDependingOfOwner() {
    if (!userPrs.length) return;

    const prsOpenedBy = document.querySelectorAll<HTMLElement>(".js-navigation-item .opened-by a");
    prsOpenedBy.forEach((prOpenedby) => {
      const prTitle = prOpenedby.parentElement?.parentElement?.parentElement?.firstElementChild as HTMLElement;

      userPrs.forEach((userPr) => {
        const regexUsername = new RegExp(userPr.regexString, "gi");
        if (regexUsername.test(prOpenedby.title)) {
          prTitle.dataset.dvsUserPr = "true";
          prTitle.style.setProperty("color", userPr.color, "important");
          prOpenedby.style.setProperty("color", userPr.color, "important");
        }
      });
    });
  }

  function colorPrFromTitle() {
    if (!titlePrs.length) return;

    const prs = document.querySelectorAll<HTMLElement>("[id^=issue_] [id*=link]");

    prs.forEach((pr) => {
      const prTitle = pr.textContent;
      if (!prTitle) return;
      if (pr.dataset.dvsOwnPr === "true") return;

      titlePrs.forEach((titlePr) => {
        const regex = new RegExp(titlePr.regexString, "gi");
        if (regex.test(prTitle)) {
          pr.dataset.dvsPrTitle = "true";
          pr.style.setProperty("color", titlePr.color, "important");
        }
      });
    });
  }


  highlightOwnPr();
  highlightPrsOwner();
  colorPrFromTitle();
  colorizePrDependingOfOwner();
}
