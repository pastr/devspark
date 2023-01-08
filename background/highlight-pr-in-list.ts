import browser from "webextension-polyfill";

chrome.tabs.onUpdated.addListener(async () => {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

  if (tab.url?.includes("github.com")) {
    browser.scripting.executeScript({
      target: { tabId: tab.id! },
      func: highlightPr
    });
  }
});

browser.webRequest.onCompleted.addListener(
  (req) => {
    if (req.url === "https://github.com/pull_request_review_decisions") {
      browser.scripting.executeScript({
        target: { tabId: req.tabId },
        func: highlightPrStatusWithDelay
      });
    }
  },
  { urls: ["https://github.com/*"] }
);

browser.tabs.onActivated.addListener(async () => {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

  if (tab.url?.includes("github.com")) {
    browser.scripting.executeScript({
      target: { tabId: tab.id! },
      func: highlightPr
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

function highlightPr() {
  function highlightOwnPr() {
    const prsOpenedBy = document.querySelectorAll(".js-navigation-item .opened-by");
    const userLoginElement = document.querySelector<HTMLMetaElement>("[name=user-login]");
    const userLogin = userLoginElement!.content;
    prsOpenedBy.forEach((pr) => {
      if (pr.innerHTML.includes(userLogin)) {
        pr.parentElement?.parentElement?.firstElementChild?.style.setProperty("color", "var(--color-accent-fg)", "important");
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


  highlightOwnPr();
  highlightPrOwner();
  highlightPrStatus();
}
