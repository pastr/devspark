import { useEffect, useState } from "react";
import { ESupportedApps } from "../../common/enums/ESupportedApps";
import browser from "webextension-polyfill";
import PopupSection from "./PopupSection";
import { useOptions } from "../../common/context/options.context";
import { useFocus } from "../../common/hooks/useFocus";
import { useStateStorageSynced } from "../../common/hooks/useStateStorageSynced";

const TICKET_HISTORY_LENGTH = 5;

export default function SectionJira() {
  const [jiraTicketNumber, setJiraTicketNumber] = useState("");
  const [jiraTicketPrefix, setJiraTicketPrefix] = useStateStorageSynced("jiraTicketPrefix", "");
  const [jiraTicketHistory, setJiraTicketHistory] = useStateStorageSynced<string[]>("jiraTicketHistory", []);
  const [organizationNameMissing, setOrganizationNameMissing] = useState(true);
  const [prefixInputRef, setPrefixInputFocus] = useFocus();
  const [ticketNumberInputRef, setTicketNumberInputFocus] = useFocus();
  const [{ options }] = useOptions();

  useEffect(() => {
    if (options?.jira?.organizationName) {
      setOrganizationNameMissing(false);
    }
  }, [options?.jira?.organizationName]);


  function openJiraTicket() {
    const jiraOrganizationName = options?.jira?.organizationName;

    const fullTicket = `${jiraTicketPrefix}-${jiraTicketNumber}`;
    const url = `https://${jiraOrganizationName}.atlassian.net/browse/${fullTicket}`;
    const copyJiraTicketHistory = [...jiraTicketHistory];

    if (copyJiraTicketHistory.length >= TICKET_HISTORY_LENGTH) {
      copyJiraTicketHistory.pop();
    }
    copyJiraTicketHistory.unshift(url);
    setJiraTicketHistory(copyJiraTicketHistory);

    browser.storage.sync.set({ jiraTicketHistory: copyJiraTicketHistory });

    browser.tabs.create({ url });
    window.close();
  }

  function onPrefixInputEnter() {
    setTicketNumberInputFocus();
  }
  function onTicketNumberInputEnter() {
    isButtonDisabled() ? setPrefixInputFocus() : openJiraTicket();
  }

  function isButtonDisabled(): boolean {
    console.log("organizationNameMissing", organizationNameMissing);
    return jiraTicketNumber === "" || jiraTicketPrefix === "" || organizationNameMissing;
  }

  function showErrors() {
    function openOptionsPage() {
      browser.runtime.openOptionsPage();
    }

    if (organizationNameMissing) {
      return (
        <div >
          <div className="text-red-400">Please set the organization name in the options first.</div>
          <div className="text-red-400">You can access the options by clicking <button className="text-blue-600 underline" onClick={openOptionsPage}>here</button></div>
        </div>
      );
    }
  }

  return (
    <PopupSection title='Jira' icon={ESupportedApps.Jira}>
      <div className="flex flex-col gap-2">
        <input className="input"
               placeholder="ticket prefix"
               value={jiraTicketPrefix}
               ref={prefixInputRef}
               onKeyDown={(e) => e.key === "Enter" ? onPrefixInputEnter(): null}
               onChange={(e) => setJiraTicketPrefix(e.target.value)}/>
        <input className="input"
               autoFocus
               ref={ticketNumberInputRef}
               onKeyDown={(e) => e.key === "Enter" ? onTicketNumberInputEnter() : null}
               type="number"
               min="1"
               placeholder="ticket number"
               value={jiraTicketNumber}
               onChange={(e) => setJiraTicketNumber(e.target.value)}/>
        <button className="btn-primary"
                disabled={isButtonDisabled()}
                onClick={openJiraTicket}>
          Open ticket
        </button>
        {showErrors()}
        <section className="flex flex-col gap-1">
          <JiraTicketHistory jiraTickets={jiraTicketHistory}/>
        </section>
      </div>
    </PopupSection>
  );
}

function JiraTicketHistory({ jiraTickets }: {jiraTickets: string[]}) {
  function showTickets() {
    return jiraTickets.map((ticketUrl, index) => {
      const ticketNumber = ticketUrl.split("/")[4];
      return (
        <a key={`${index}-${ticketUrl}`}
           className="underline text-blue-600 hover:text-blue-700"
           href={ticketUrl}
           target="_blank"
           rel="noreferrer">
          {ticketNumber.toUpperCase()}
        </a>
      );
    });
  }
  return (
    <>
      {jiraTickets.length ? `Last ${TICKET_HISTORY_LENGTH} tickets` : null}
      {showTickets()}
    </>
  );

}
