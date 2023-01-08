import { useEffect, useState } from "react";
import { ESupportedApps } from "../../common/enums/ESupportedApps";
import browser from "webextension-polyfill";
import PopupSection from "./PopupSection";
import { useOptions } from "../../common/context/options.context";
import { useFocus } from "../../common/hooks/useFocus";

const TICKET_HISTORY_LENGTH = 5;

export default function SectionJira() {
  const [jiraTicketPrefix, setJiraTicketPrefix] = useState("");
  const [jiraTicketNumber, setJiraTicketNumber] = useState("");
  const [jiraTicketHistory, setJiraTicketHistory] = useState<string[]>([]);
  const [prefixInputRef, setPrefixInputFocus] = useFocus();
  const [ticketNumberInputRef, setTicketNumberInputFocus] = useFocus();
  const [{ options }] = useOptions();

  useEffect(() => {
    browser.storage.sync.get("jiraTicketPrefix").then(({ jiraTicketPrefix }) => {
      setJiraTicketPrefix(jiraTicketPrefix ?? "");
    });

    browser.storage.sync.get("jiraTicketHistory").then(({ jiraTicketHistory }) => {
      setJiraTicketHistory(jiraTicketHistory ?? []);
    });
  }, []);

  useEffect(() => {
    browser.storage.sync.set({ jiraTicketPrefix });
  }, [jiraTicketPrefix]);

  function openJiraTicket() {
    if (isButtonDisabled()) return;

    const jiraOrganizationName = options.jira.organizationName;
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

  function onPrefixInputEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      setTicketNumberInputFocus();
    }
  }
  function onTicketNumberInputEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      isButtonDisabled() ? setPrefixInputFocus() : openJiraTicket();
    }
  }

  function isButtonDisabled(): boolean {
    if (jiraTicketNumber === "" || jiraTicketPrefix === "") {
      return true;
    }
    return false;
  }

  return (
    <PopupSection title='Jira' icon={ESupportedApps.Jira}>
      <div className="flex flex-col gap-2">
        <input className="input"
               placeholder="ticket prefix"
               value={jiraTicketPrefix}
               ref={prefixInputRef}
               onKeyDown={(e) => onPrefixInputEnter(e)}
               onChange={(e) => setJiraTicketPrefix(e.target.value)}/>
        <input className="input"
               autoFocus
               ref={ticketNumberInputRef}
               onKeyDown={(e) => onTicketNumberInputEnter(e)}
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
          {ticketNumber}
        </a>
      );
    });
  }
  return (
    <>
      {jiraTickets ? `Last ${TICKET_HISTORY_LENGTH} tickets` : null}:
      {showTickets()}
    </>
  );

}
