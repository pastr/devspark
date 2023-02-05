import browser from "webextension-polyfill";
import { IOptionsContextState } from "../../_shared/types/IOptionsState";

browser.tabs.onUpdated.addListener(async () => {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  const storage = await browser.storage.sync.get("options");

  if (tab.url?.includes("github.com") && storage?.options?.options?.jira?.organizationName) {
    browser.scripting.executeScript({
      target: { tabId: tab.id! },
      func: selectAllLinks,
      args: [storage.options]
    });
  }
});

browser.tabs.onActivated.addListener(async () => {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  const storage = await browser.storage.sync.get("options");
  console.log("🚀 ~ browser.tabs.onActivated.addListener ~ storage", storage);

  if (tab.url?.includes("github.com") && storage?.options?.options?.jira?.organizationName) {
    browser.scripting.executeScript({
      target: { tabId: tab.id! },
      func: selectAllLinks,
      args: [storage.options]
    });
  }
});


function selectAllLinks({ options }: IOptionsContextState) {
  const jiraTicketRegex = /[A-Z]{2,}-\d+/g;
  const jiraUrl = `https://${options?.jira?.organizationName}.atlassian.net/browse/`;

  const links = document.querySelectorAll<HTMLElement>("h1.gh-header-title .js-issue-title");

  for (const link of links) {
    const ticketNbArray = link.innerText.match(jiraTicketRegex);
    if (ticketNbArray) {
      const ticketNb = ticketNbArray[0];
      const ticketLinkElement = document.createElement("a");
      ticketLinkElement.href = jiraUrl + ticketNb;
      ticketLinkElement.innerText = link.innerText;
      link.replaceWith(ticketLinkElement);
    }
  }
}
