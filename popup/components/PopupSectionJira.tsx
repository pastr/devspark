import { useEffect, useState } from "react";
import { ESupportedApps } from "../../common/enums/ESupportedApps";
import browser from "webextension-polyfill";
import PopupSection from "./PopupSection";

export default function SectionJira() {
  const [jiraTicketPrefix, setJiraTicketPrefix] = useState("");
  const [jiraTicketNumber, setJiraTicketNumber] = useState("");
  const [jiraTicketHistory, setJiraTicketHistory] = useState<string[]>([])

  useEffect(() => {
    browser.storage.sync.get("jiraTicketPrefix").then(({ jiraTicketPrefix }) => {
      setJiraTicketPrefix(jiraTicketPrefix ?? "")
    })

    browser.storage.sync.get("jiraTicketHistory").then(({ jiraTicketHistory }) => {
      setJiraTicketHistory(jiraTicketHistory ?? [])
    })
  }, [])

  useEffect(() => {
    browser.storage.sync.set({ jiraTicketPrefix });
  }, [jiraTicketPrefix])


  function openJiraTicket() {
    const jiraUrl = "https://edgelab.atlassian.net/browse/";
    const fullTicket = `${jiraTicketPrefix}-${jiraTicketNumber}`;
    const url = `${jiraUrl}${fullTicket}`;

    if (jiraTicketHistory?.length >= 5) {
      jiraTicketHistory.pop();
    }
    jiraTicketHistory.unshift(url);

    browser.storage.sync.set({ jiraTicketHistory });

    window.open(url, "_blank");
  }

  function onEnter(key: string) {
    if (key === "Enter") {
      openJiraTicket();
    }
  }

  function showTicketHistory() {
    return jiraTicketHistory.map((ticketUrl) => {
      const ticketNumber = ticketUrl.split("/")[4];
      return (
        <a key={ticketUrl}
           className="underline text-blue-600 hover:text-blue-700"
           href={ticketUrl}
           target="_blank"
           rel="noreferrer">
          {ticketNumber}
        </a>
      )
    })

  }

  return (
    <PopupSection title='Jira' icon={ESupportedApps.Jira}>
      <div className="flex flex-col gap-2">
        <input className="input"
               placeholder="ticket prefix"
               value={jiraTicketPrefix}
               onChange={(e) => setJiraTicketPrefix(e.target.value)}/>
        <input className="input"
               autoFocus
               onKeyDown={(e) => onEnter(e.key)}
               type="number"
               min="1"
               placeholder="ticket number"
               value={jiraTicketNumber}
               onChange={(e) => setJiraTicketNumber(e.target.value)}/>
        <button className="btn-primary"
                onClick={openJiraTicket}>
          Open ticket
        </button>
        {showTicketHistory()}
      </div>
    </PopupSection>
  )
}