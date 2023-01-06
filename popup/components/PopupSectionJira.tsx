import { useEffect, useState } from "react";
import { ESupportedApps } from "../../common/enums/ESupportedApps";
import browser from "webextension-polyfill";
import PopupSection from "./PopupSection";

export default function SectionJira() {
  const [jiraTicketPrefix, setJiraTicketPrefix] = useState('');
  const [jiraTicketNumber, setJiraTicketNumber] = useState('');

  useEffect(() => {
    browser.storage.sync.get('jiraTicketPrefix').then(({ jiraTicketPrefix }) => {
      setJiraTicketPrefix(jiraTicketPrefix)
    })
  }, [])

  useEffect(() => {
    browser.storage.sync.set({ jiraTicketPrefix });
  }, [jiraTicketPrefix])


  function openJiraTicket() {
    const jiraUrl = "https://edgelab.atlassian.net/browse/";
    const fullTicket = `${jiraTicketPrefix}-${jiraTicketNumber}`;
    const url = `${jiraUrl}${fullTicket}`;
    window.open(url, '_blank');
  }

  function onEnter(key: string) {
    if (key === "Enter") {
      openJiraTicket();
    }
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
      </div>
    </PopupSection>
  )
}