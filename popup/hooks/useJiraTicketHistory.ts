import browser from "webextension-polyfill";
import { useState, useEffect } from "react";

export function useJira() {
  const [jiraTicketHistory, setJiraTicketHistory] = useState<string[]>([]);

  useEffect(() => {
    browser.storage.sync.get("jiraTicketHistory").then(({ jiraTicketHistory }) => {
      if (jiraTicketHistory) {
        setJiraTicketHistory(jiraTicketHistory);
      }
    });
  }, []);

  function updateTicketHistory(url: string) {
    if (jiraTicketHistory?.length >= 5) {
      jiraTicketHistory.pop();
    }
    jiraTicketHistory.unshift(url);

    browser.storage.sync.set({ jiraTicketHistory });
  }

  return [jiraTicketHistory, updateTicketHistory];

}