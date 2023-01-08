import browser from "webextension-polyfill";
import { IOptionsContextState } from "../../common/types/IOptionsState";

browser.tabs.onUpdated.addListener(async () => {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  const storage = await browser.storage.sync.get("options");

  if (tab.url?.includes("github.com")) {
    browser.scripting.executeScript({
      target: { tabId: tab.id! },
      func: highlightPr,
      args: [storage.options]
    });
  }
});

browser.webRequest.onCompleted.addListener(
  async (req) => {
    const storage = await browser.storage.sync.get("options");
    if (req.url === "https://github.com/pull_request_review_decisions") {
      browser.scripting.executeScript({
        target: { tabId: req.tabId },
        func: highlightPrStatusWithDelay,
        args: [storage.options]
      });
    }
  },
  { urls: ["https://github.com/*"] }
);

browser.tabs.onActivated.addListener(async () => {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  const storage = await browser.storage.sync.get("options");

  if (tab.url?.includes("github.com")) {
    browser.scripting.executeScript({
      target: { tabId: tab.id! },
      func: highlightPr,
      args: [storage.options]
    });
  }
});

function highlightPrStatusWithDelay() {
  setTimeout(() => {
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
  }, 1000);
}

function highlightPr({ options }: IOptionsContextState) {
  function highlightOwnPr() {
    const prsOpenedBy = document.querySelectorAll(".js-navigation-item .opened-by");
    const userLoginElement = document.querySelector<HTMLMetaElement>("[name=user-login]");
    const userLogin = userLoginElement!.content;
    prsOpenedBy.forEach((pr) => {
      if (pr.innerHTML.includes(userLogin)) {
        const ownerPr = pr.parentElement?.parentElement?.firstElementChild as HTMLElement;
        ownerPr.style.setProperty("color", "var(--color-accent-fg)", "important");
      }
    });
  }

  function highlightPrOwner() {
    const prsOwners = document.querySelectorAll<HTMLElement>(".js-navigation-item .opened-by a.Link--muted");
    prsOwners.forEach((prOwner) => {
      prOwner.style.setProperty("font-weight", "bold", "important");
      prOwner.style.setProperty("color", "var(--color-accent-emphasis)", "important");
    });

  }

  function highlightPrStatus() {
    const prsStatuses = document.querySelectorAll<HTMLElement>(".js-navigation-item .d-none a.Link--muted");
    const approved = "Approved";
    const draft = "Draft";
    const reviewRequired = "Review required";

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
    });
  }

  function deemphasizedUnwantedPr() {
    const prs = document.querySelectorAll<HTMLElement>("[id^=issue_] [id*=link]");
    const deemphasizePrs = options?.github?.deemphasizeTextList;

    if (!deemphasizePrs) return;

    prs.forEach((pr) => {
      const prTitle = pr.textContent;
      // bad..
      deemphasizePrs.forEach((savedText) => {
        if (prTitle?.includes(savedText)) {
          pr.style.setProperty("color", "var(--color-workflow-card-connector-inactive)", "important");
          pr.classList.remove("Link--primary");
        }
      });
    });
  }


  highlightOwnPr();
  highlightPrOwner();
  highlightPrStatus();
  deemphasizedUnwantedPr();
}
