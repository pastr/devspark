import browser from "webextension-polyfill";
import { IOptionsContextState } from "../../../_shared/types/IOptionsState";

export async function convertPrTitleToJiraLink() {
  const storage = await browser.storage.sync.get("options");
  if (storage.options) {
    const options = storage.options as IOptionsContextState;
    const jiraTicketRegex = /[A-Z]{2,}-\d+/g;

    if (options.jira?.organizationName) {
      const jiraUrl = `https://${options.jira.organizationName}.atlassian.net/browse/`;

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
  }
}
